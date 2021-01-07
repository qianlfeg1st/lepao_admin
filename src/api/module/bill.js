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


// 准备结算
export const getBillPrep = params => {

  return axios.get('company_bill/prep_settlement_bill', {
    params: {
      ...params,
    },
  })
}

// 结算
export const postBill = params => {

  return axios.post('company_bill/settlement_bill', {
    ...params,
  })
}

// 结算
export const updateBill = params => {

  return axios.post('company_bill/modify_settlement_bill', {
    ...params,
  })
}
