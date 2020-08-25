import axios from '@/api/axios'

// 公司列表
export const getCompanyList = params => {

  return axios.get('company/list_company', {
    ...params,
  })
}

// 公司列表
export const addCompany = params => {

  return axios.get('company/list_company', {
    ...params,
  })
}

export const editCompany = params => {

  return axios.get('company/list_company', {
    ...params,
  })
}