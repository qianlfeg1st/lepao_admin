import axios from '@/api/axios'

// 公司列表
export const getCompanyList = params => {

  return axios.post('company_emp/list_company', {
    ...params,
  })
}
