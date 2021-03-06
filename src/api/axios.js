import { message } from 'antd'
import axios from 'axios'
import requestError from  './requestError'
import { baseURL } from '@/config'
const createHistory = require('history').createHashHistory

axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true
axios.defaults.baseURL = baseURL

// 请求拦截
axios.interceptors.request.use(config => {

  const accessToken = sessionStorage.getItem('accessToken')
  if (accessToken) config.headers.base_access_token = sessionStorage.getItem('accessToken')

  // config.headers.base_access_token = 'eyJhbGciOiJIUzI1NiJ9.CBQQ_7_Un4Iv.NvODVT2GJt0rk6vGZG7nfMjwLMm5kdFBHIMe-YSL9ZQ'

  return config
}, error => {

  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {

  if ('base_access_token_update' in response.headers) sessionStorage.setItem('accessToken', response.headers.base_access_token_update)

  if (response.status === 201) {

    sessionStorage.clear()

    createHistory().push('/login')
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