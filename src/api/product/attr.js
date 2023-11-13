// 平台屬性管理模塊請求文件
import request from '@/utils/request'

//* 獲取一級分類的API
//* admin/product/getCategory1   get
export const reqCategory1List = () => {
  return request({
    url: '/admin/product/getCategory1',
    method: 'GET'
  })
}

//* 獲取二級分類的API
//* admin/product/getCategory2/{category1Id} get
export const reqCategory2List = (category1Id) => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'GET'
  })
}

//* 獲取三級分類的API
//* admin/product/getCategory3/{category2Id}  get
export const reqCategory3List = (category2Id) => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'GET'
  })
}
