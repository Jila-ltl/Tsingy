const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

function getHeaders(customHeaders = {}) {
  const token = localStorage.getItem('tsingy-token')

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  }
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: getHeaders(options.headers),
  })

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const payload = isJson ? await response.json() : null

  if (!response.ok) {
    const error = new Error(payload?.error || 'Request failed')
    error.status = response.status
    error.payload = payload
    throw error
  }

  return payload
}

export { API_BASE_URL }
