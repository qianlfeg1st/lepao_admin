import axios from '@/api/axios'

// 获取部门团队榜
export const getDeptRanking = () => {

  return axios.get('cpy_ranking/list_dept_ranking')
}

// 获取步数达人榜
export const getEmpRanking = () => {

  return axios.get('cpy_ranking/list_emp_ranking')
}

// 获取企业管理员信息
export const getAccountDetail = () => {

  return axios.get('cpy/my_account')
}

// 获取企业收件地址
export const getCompanyAddress = params => {

  return axios.get('cpy/prep_edit_company_address', {
    params: {
      ...params,
    },
  })
}

// 编辑企业收件地址
export const editCompanyAddress = params => {

  return axios.post('cpy/edit_company_address', {
    ...params,
  })
}

// 获取企业积分详情
export const getGoldInfo = params => {

  return axios.get('cpy_gold/find_gold_info', {
    params: {
      ...params,
    },
  })
}

// 获取企业积分配置
export const getGoldSetting = () => {

  return axios.get('cpy_gold/prep_gold_setting')
}

// 编辑企业积分配置
export const editGoldSetting = params => {

  return axios.post('cpy_gold/gold_setting', {
    ...params,
  })
}

// 获取部门列表
export const getEmpInfo = () => {

  return axios.get('cpy_emp/emp_info')
}

// 获取部门详情
export const getEmpsDept = params => {

  return axios.get('cpy_emp/emps_dept', {
    params: {
      ...params,
    },
  })
}

// 获取当前奖品
export const getCurrentGoods = params => {

  return axios.post('cpy_goods/list_current', {
    ...params,
  })
}

// 获取奖品分类
export const getShelf = () => {

  return axios.get('cpy_goods/list_shelf')
}

// 获取奖品库存列表
export const getGoodsStore = params => {

  return axios.post('cpy_goods/list_goods_store', {
    ...params,
  })
}

// 编辑奖品库存
export const editGoodsStore = params => {

  return axios.post('cpy_goods/setting', {
    ...params,
  })
}

// 获取兑换订单列表
export const getExchangeList = params => {

  return axios.post('cpy_order/list_orders', {
    ...params,
  })
}

// 获取客服联系方式
export const getServiceInfo = () => {

  return axios.get('cpy/kefu')
}

// 获取待审核员工列表
export const getWaitStaff = () => {

  return axios.get('cpy_emp/emps_wait_audit')
}

// 移除员工
export const removeStaff = params => {

  return axios.get('cpy_emp/remove', {
    params: {
      ...params,
    },
  })
}

// 审核通过员工
export const passStaff = params => {

  return axios.get('cpy_emp/remove', {
    params: {
      ...params,
    },
  })
}

// 可选奖品列表
export const getUnusedList = params => {

  return axios.post('cpy_goods/list_unused', {
    ...params,
  })
}

// 已选奖品列表
export const getUsedList = params => {

  return axios.post('cpy_goods/list_used', {
    ...params,
  })
}

// 选择或取消奖品
export const selectGoods = params => {

  return axios.get('cpy_goods/select', {
    params: {
      ...params,
    },
  })
}