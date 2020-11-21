import axios from '@/api/axios'

// 登录
export const login = params => {

  return axios.post('user_author/login', {
    ...params,
  })
}

// 登出
export const logout = params => {

  return axios.post('logout', {
    ...params,
  })
}

// 获取安全码
export const getSecure = () => {

  return axios.get('company_login/login_mgr_get_secure')
}

// 获取二维码
export const getQrCode = params => {

  return axios.get('company_login/login_mgr_get_qr', {
    params: {
      ...params,
    },
  })
}

// 检查登录状态
export const checkLogin = params => {

  return axios.get('company_login/check_qr_login', {
    params: {
      ...params,
    },
  })
}

// 上传图片
export const uploadImage = params => {

  return axios.post('aliyun/uploadWithFormType', {
    ...params,
  })
}

// 管理企业
export const switchCompany = params => {

  return axios.get('company/switch_to_company', {
    params: {
      ...params,
    },
  })
}