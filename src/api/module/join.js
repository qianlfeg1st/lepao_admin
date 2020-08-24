import axios from '@/api/axios'

// 公司列表
export const getCompanyList = params => {

  return axios.get('company/list_company', {
    ...params,
  })
}
