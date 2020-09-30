import axios from '@/api/axios'

// 公司列表
export const getCompanyList = () => {

  return axios.get('company_goods/list_company')
}

// 公司奖品列表
export const getCompanyPrizeList = params => {

  return axios.post('company_goods/list_companygoods', {
    ...params,
  })
}

// 编辑奖品
export const editPrizeDetail = params => {

  return axios.post('company_goods/edit_companygoods', {
    ...params,
  })
}

// 奖品列表
export const getPrizeList = params => {

  return axios.post('company_goods/list_sel_goods', {
    ...params,
  })
}

// 分类列表
export const getShelfList = () => {

  return axios.get('goods/list_shelf')
}