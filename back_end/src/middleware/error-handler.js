export function errorHandler(error, _req, res, _next) {
  if (error.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation failed',
      fields: error.flatten ? error.flatten() : undefined
    })
  }

  const status = error.status || 500

  res.status(status).json({
    error: error.message || 'Internal server error'
  })
}
