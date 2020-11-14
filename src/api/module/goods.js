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