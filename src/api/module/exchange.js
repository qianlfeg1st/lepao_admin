import axios from '@/api/axios'

// 企业列表
export const getCompanyList = () => {

  return axios.get('company_order/list_company')
}

// 兑换奖品列表
export const getExchangeList = ({ ...params }) => {

  return axios.post('company_order/list_companyorder', {
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

// 发货详情
export const getOrderDetail = params => {

  return axios.get('company_order/prep_send', {
    params: {
      ...params,
    },
  })
}

// 发货
export const sendOrder = ({ ...params }) => {

  return axios.post('company_order/send', {
    ...params,
  })
}