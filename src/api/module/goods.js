import axios from '@/api/axios'

// 商品列表
export const getGoodsList = params => {

  return axios.post('plat_goods/goods_list', {
    ...params,
  })
}