//  主要獲得品牌管理數據
import request from '@/utils/request'
//* 獲取品牌 admin/product/baseTrademark/{page}/{limit} GET
export const reqTradeMarkList = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
  })
}
