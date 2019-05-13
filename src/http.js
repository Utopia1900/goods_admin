import axios from 'axios'
import router from './router'
const url = ''
const testUrl = ''

axios.defaults.timeout = 8 * 1000
axios.defaults.baseURL = url
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
  let token = window.sessionStorage.getItem('token')
  if(token) {
   config.headers.common['Authorization'] = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default axios
