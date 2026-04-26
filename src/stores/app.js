import { defineStore } from 'pinia'
import { apiRequest } from '@/lib/api'

export const useAppStore = defineStore('app', {
  state: () => ({
    bureauDashboard: null,
    directory: [],
    error: '',
    initialized: false,
    loading: false,
    memberDashboard: null,
    token: localStorage.getItem('tsingy-token') || '',
    user: null,
  }),
  getters: {
    isAuthenticated: state => Boolean(state.token),
    isBureau: state => ['ADMIN', 'BUREAU'].includes(state.user?.role),
  },
  actions: {
    async initAuth () {
      if (this.initialized) {
        return
      }

      this.initialized = true

      if (!this.token) {
        return
      }

      try {
        const { user } = await apiRequest('/auth/me')
        this.user = user
      } catch {
        this.clearSession()
      }
    },
    setSession ({ token, user }) {
      this.token = token
      this.user = user
      localStorage.setItem('tsingy-token', token)
    },
    clearSession () {
      this.token = ''
      this.user = null
      this.memberDashboard = null
      this.bureauDashboard = null
      this.directory = []
      localStorage.removeItem('tsingy-token')
    },
    async login (credentials) {
      this.loading = true
      this.error = ''

      try {
        const payload = await apiRequest('/auth/login', {
          body: JSON.stringify(credentials),
          method: 'POST',
        })
        this.setSession(payload)
        return payload.user
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async register (payload) {
      this.loading = true
      this.error = ''

      try {
        const result = await apiRequest('/auth/register', {
          body: JSON.stringify(payload),
          method: 'POST',
        })
        this.setSession(result)
        return result.user
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    logout () {
      this.clearSession()
    },
    async fetchMemberDashboard () {
      const dashboard = await apiRequest('/members/dashboard')
      this.memberDashboard = dashboard
      if (this.user) {
        this.user = { ...this.user, profile: dashboard.profile }
      }
      return dashboard
    },
    async submitProcuration (payload) {
      const result = await apiRequest('/members/procurations', {
        body: JSON.stringify(payload),
        method: 'POST',
      })
      await this.fetchMemberDashboard()
      return result
    },
    async submitReclamation (payload) {
      const result = await apiRequest('/members/reclamations', {
        body: JSON.stringify(payload),
        method: 'POST',
      })
      await this.fetchMemberDashboard()
      return result
    },
    async submitCertificate (payload) {
      const result = await apiRequest('/members/certificates', {
        body: JSON.stringify(payload),
        method: 'POST',
      })
      await this.fetchMemberDashboard()
      return result
    },
    async updateProfile (payload) {
      const profile = await apiRequest('/members/me/profile', {
        body: JSON.stringify(payload),
        method: 'PATCH',
      })
      this.user = {
        ...this.user,
        profile,
      }
      await this.fetchMemberDashboard()
      return profile
    },
    async fetchBureauDashboard () {
      const dashboard = await apiRequest('/bureau/dashboard')
      this.bureauDashboard = dashboard
      return dashboard
    },
    async fetchDirectory () {
      const directory = await apiRequest('/bureau/directory')
      this.directory = directory
      return directory
    },
    async reviewMember (id, approved) {
      const result = await apiRequest(`/bureau/members/${id}/review`, {
        body: JSON.stringify({ approved }),
        method: 'PATCH',
      })
      await Promise.all([this.fetchBureauDashboard(), this.fetchDirectory()])
      return result
    },
    async createAnnouncement (payload) {
      const result = await apiRequest('/bureau/announcements', {
        body: JSON.stringify(payload),
        method: 'POST',
      })
      await this.fetchBureauDashboard()
      return result
    },
    async createEvent (payload) {
      const result = await apiRequest('/bureau/events', {
        body: JSON.stringify(payload),
        method: 'POST',
      })
      await this.fetchBureauDashboard()
      return result
    },
  },
})
