import axios from '@/api/axios'

// 公司列表
export const getCompanyList = params => {

  return axios.get('company_emp/list_company')
}

// 全部员工列表
export const getStaffList = params => {

  return axios.get('company_emp/list_companyemp', {
    params: {
      ...params,
    },
  })
}

// 黑名单员工列表
export const getStaffOffinList = params => {

  return axios.get('company_emp/list_companyemp_offin', {
    params: {
      ...params,
    },
  })
}

// 员工详情
export const getStaffDetail = params => {

  return axios.get('company_emp/prep_edit_companyemp', {
    params: {
      ...params,
    },
  })
}

// 编辑员工信息
export const editStaffDetail = params => {

  return axios.post('company_emp/edit_companyemp', {
    ...params,
  })
}

// 移除或加入员工
export const addOrremoveMember = params => {

  return axios.get('company_emp/add_remove_companyemp', {
    params: {
      ...params,
    },
  })
}

// 设置禁入员工
export const offin = params => {

  return axios.get('company_emp/offin', {
    params: {
      ...params,
    },
  })
}

// 移出黑名单员工
export const recover = params => {

  return axios.get('company_emp/offin_recover', {
    params: {
      ...params,
    },
  })
}

// 邀请二维码图片
export const getQrCode = params => {

  return axios.get('company_emp/invite_join_companyemp', {
    params: {
      ...params,
    },
  })
}