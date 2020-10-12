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

  return axios.post('cpy/prep_edit_company_address', {
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

  return axios.get('cpy_gold/find_gold_info')
}

// 编辑企业积分配置
export const editGoldSetting = params => {

  return axios.post('cpy_gold/gold_setting', {
    ...params,
  })
}
