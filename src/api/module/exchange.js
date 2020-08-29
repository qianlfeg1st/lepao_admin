import axios from '@/api/axios'

// 企业列表
export const getCompanyList = params => {

  return axios.get('company_order/list_company')
}

// 兑换奖品列表
export const getExchangeList = ({ companyId, ...params }) => {

  return axios.post(`company_order/list_companyorder?companyId=${companyId}`, {
    ...params.query,
  })
}

// 兑换奖品审核
export const verifyExchange = params => {

  return axios.get('company_order/setting_companyorder', {
    params: {
      ...params,
    },
  })
}