import { message } from 'antd'
import axios from 'axios'
import requestError from  './requestError'

axios.defaults.timeout = 20000
axios.defaults.headers.post['Set-Cookie'] = 'HttpOnly;Secure;SameSite=None'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true

const baseURL = {
  // dev: 'https://api.03os.com/admin/',
  dev: 'https://app.happyrun.cn/master/hc2/',
  // dev: 'http://127.0.0.1:7001/admin/',
  // dev: 'https://api.03os.com/admin/',
  test: 'https://api.03os.com/admin/',
  prod: 'https://api.03os.com/admin/',
}

console.warn('ENV', process.env.REACT_APP_ENV)

axios.defaults.baseURL = baseURL[process.env.REACT_APP_ENV]

// 请求拦截
axios.interceptors.request.use(config => {

  config.headers.Accept = 'application/json;charset=UTF-8'
  config.headers.base_access_token = 'eyJhbGciOiJIUzI1NiJ9.CAIQpdmywcsu.aNNSxai6OO7_mAv9h6rtgTkY-iJrSz7VF0B0ZBFBHyw'

  return config
}, error => {

  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {

  // if (!response.data.status && response.data.message) return message.error(`${response.status}: ${response.data.message}`)

  if (response.status === 203) {

    sessionStorage.clear()
    window.location.reload()
  }

  return response
}, error => {

  if (error?.response?.status in requestError) {

    message.error(`${error?.response?.status}: ${requestError[error?.response?.status]}`, 4)
  } else {

    message.error('服务器暂时失联，请稍后再试', 4)
  }

  console.log('error request', error)

  return Promise.reject(error)
})

export default axios