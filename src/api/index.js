import axios from 'axios'

const API_BASE = '/api'

export default {
  login (data) {
    return axios.post(`${API_BASE}/sessions`, data)
  },
  register(data) {
    return axios.post(`${API_BASE}/users`, data)
  }
}
