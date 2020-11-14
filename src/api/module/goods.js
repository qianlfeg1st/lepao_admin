import axios from '@/api/axios'

// 商品列表
export const getGoodsList = params => {

  return axios.post('plat_goods/goods_list', {
    ...params,
  })
}

// 商品详情
export const getGoodsDetail = params => {

  return axios.get('plat_goods/prep_modify_goods', {
    params: {
      ...params,
    },
  })
}

// 新增或编辑商品
export const addOrEditGoods = params => {

  return axios.post('plat_goods/save_goods', {
    ...params,
  })
}

// 下架商品
export const removeGoods = params => {

  return axios.get('plat_goods/remove_goods', {
    params: {
      ...params,
    },
  })
}

// 上架商品
export const upGoods = params => {

  return axios.get('plat_goods/up_goods', {
    params: {
      ...params,
    },
  })
}

// 货架列表
export const getShelfList = () => {

  return axios.get('plat_shelf/list_shelf')
}