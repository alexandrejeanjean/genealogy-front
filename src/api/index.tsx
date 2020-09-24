import axios from 'axios'

export function setAuthorization(Authorization: any) {
  apiClient.defaults.headers.common.Authorization = Authorization
}

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
