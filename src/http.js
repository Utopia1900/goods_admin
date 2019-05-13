import axios from 'axios'
import router from './router'
const url = '/admin/v1/' // 接口地址（生产）
const testUrl = 'https://www.baidu.com/admin/v1/' // 接口地址（测试）

axios.defaults.timeout = 8 * 1000
axios.defaults.baseURL = testUrl
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
