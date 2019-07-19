import axios from 'axios'
import router from './router'
// const url = '/mx/admin/1/' // 接口地址（生产）
const url = 'http://www.stemtherapy.cn/mx/admin/1/' // 接口地址（开发）

axios.defaults.timeout = 8 * 1000
axios.defaults.baseURL = url
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem('token')
  if(token) {
   config.headers.common['Authorization'] = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default axios
