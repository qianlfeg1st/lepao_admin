import { message } from 'antd'
import axios from 'axios'
import requestError from  './requestError'

axios.defaults.timeout = 20000
axios.defaults.headers.post['Set-Cookie'] = 'HttpOnly;Secure;SameSite=None'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true

const baseURL = {
  // dev: 'https://api.03os.com/admin/',
  dev: 'http://47.99.193.34/master/hc2/',
  // dev: 'http://127.0.0.1:7001/admin/',
  // dev: 'https://api.03os.com/admin/',
  test: 'https://api.03os.com/admin/',
  prod: 'https://api.03os.com/admin/',
}

console.warn('ENV', process.env.REACT_APP_ENV)

axios.defaults.baseURL = baseURL[process.env.REACT_APP_ENV]

// 请求拦截
axios.interceptors.request.use(config => {

  // config.headers['base_access_token'] = sessionStorage.getItem('accessToken')
  config.headers['base_access_token'] = 'eyJhbGciOiJIUzI1NiJ9.CAIQ68HBkswu.UnXtXck1zBIbn5crth-kdcTC1ZCb85z0fc0KI-Pv9gY'

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

  if (response.status === 207) message.error(response.data.value || '服务器暂时失联，请稍后再试')

  response.state = response.status === 200

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