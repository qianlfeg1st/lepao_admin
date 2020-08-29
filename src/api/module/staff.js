import axios from '@/api/axios'

// 公司列表
export const getCompanyList = params => {

  return axios.get('company_emp/list_company')
}

// 员工列表
export const getStaffList = params => {

  return axios.get('company_emp/list_companyemp', {
    params: {
      ...params,
    },
  })
}

// 员工详情
export const getStaffDetail = params => {

  return axios.get('company_emp/prep_edit_companyemp', {
    params: {
      ...params,
    },
  })
}

// 编辑员工信息
export const editStaffDetail = params => {

  return axios.post('company_emp/edit_companyemp', {
    ...params,
  })
}