import axios from '@/api/axios'

// 企业列表
export const getCompanyList = params => {

  return axios.get('company/list_company')
}

// 企业详情
export const getCompanyDetail = params => {

  return axios.get('company/prep_save_company', {
    params: {
      ...params,
    },
  })
}

// 新增或编辑企业
export const addOrEditCompany = params => {

  return axios.post('company/save_company', {
    ...params,
  })
}
