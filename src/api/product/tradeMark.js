//  主要獲得品牌管理數據
import request from '@/utils/request'
//* 獲取品牌 admin/product/baseTrademark/{page}/{limit} GET
export const reqTradeMarkList = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
  })
}

//* 處理新增品牌
//* 新增品牌: /admin/product/baseTrademark/save post 攜帶兩個參數：品牌名稱、品牌logo
//! 切記：對於新增的品牌，給伺服器傳遞數據，不需要傳遞ID，ID是由伺服器生成

//* 修改品牌的
//* 修改品牌 /admin/product/baseTrademark/update put 攜帶三個參數：id、品牌名稱、品牌logo
//! 切記：對於修改某一個品牌的操作，前端攜帶的參數需要帶上id，你需要告訴伺服器修改的是哪一個品牌
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  //* 帶給伺服器資料攜帶ID---修改
  if (tradeMark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: tradeMark
    })
  } else {
    //* 新增品牌
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tradeMark
    })
  }
}

//* 删除品牌
//* admin/product/baseTrademark/remove/{id}  delete
export const reqDeleteTradeMark = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}
