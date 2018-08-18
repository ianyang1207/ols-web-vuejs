import axios from 'axios'

const API_BASE = '/api'

export default {
  login (data) {
    return axios.post(`${API_BASE}/login`, data)
  },
  register(data) {
    return axios.post(`${API_BASE}/register`, data)
  }
}
