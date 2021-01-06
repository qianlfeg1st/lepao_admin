import axios from '@/api/axios'

// 企业列表
export const getCompanyList = () => {

  return axios.get('company_bill/list_company')
}

// 账单列表
export const getBillList = params => {

  return axios.get('company_bill/list_bill', {
    params: {
      ...params,
    },
  })
}

// 账单详情
export const getBillDetail = params => {

  return axios.get('company_bill/detail_settlement_bill', {
    params: {
      ...params,
    },
  })
}
