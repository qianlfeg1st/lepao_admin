import axios from '@/api/axios'

// 登录
export const login = params => {

  return axios.post('user_author/login', {
    ...params
  })
}

// 登出
export const logout = params => {

  return axios.post('logout', {
    ...params
  })
}