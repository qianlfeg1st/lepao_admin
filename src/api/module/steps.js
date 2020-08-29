import axios from '@/api/axios'

// 公司列表
export const getCompanyList = params => {

  return axios.get('company_emp/list_company')
}

// 员工列表
export const getStaffList = params => {

  console.log('~~~~', params)

  return axios.get('company_emp/list_companyemp', {
    params: {
      ...params,
    },
  })
}
