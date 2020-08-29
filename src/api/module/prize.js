import axios from '@/api/axios'

// 公司列表
export const getCompanyList = params => {

  return axios.get('company_goods/list_company')
}

// 公司奖品列表
export const getCompanyPrizeList = params => {

  return axios.get('company_goods/list_companygoods', {
    params: {
      ...params,
    },
  })
}
