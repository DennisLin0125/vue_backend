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

//* 獲取平台屬性的API
//* admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get
export const reqAttrList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'GET'
  })
}

//* 添加屬性與屬性值API
//* admin/product/saveAttrInfo  post
export const reqAddOrUpdateAttr = (data) => {
  return request({
    url: '/admin/product/saveAttrInfo',
    method: 'post',
    data
  })
}
/*
{
  "attrName": "",      屬性名
  "attrValueList": [   屬性名中屬性值，因为屬性值可以是多个，因此需要的是陣列
    {
      "attrId": 0,          屬性的id
      "valueName": "string"  屬性值
    }
  ],
  "categoryId": 0,    category3Id
  "categoryLevel":3,
}
*/
