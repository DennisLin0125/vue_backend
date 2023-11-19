import request from '@/utils/request'

//* 獲取SPU列表数据的接口
//* admin/product/{page}/{limit}   get   page limit category3Id
export const reqSpuList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
  })
}

//* 獲取SPU信息
//* admin/product/getSpuById/{spuId}   get
export const reqSpu = (spuId) => {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}

//* 獲取品牌的信息
//* admin/product/baseTrademark/getTrademarkList  get
export const reqTradeMarkList = () => {
  return request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'get'
  })
}

//* 獲取SPU图标的接口
//* admin/product/spuImageList/{spuId}  get
export const reqSpuImageList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

//* 獲取平台全部銷售屬性----整個平台銷售屬性共三個
//* GET /admin/product/baseSaleAttrList

export const reqBaseSaleAttrList = () => {
  return request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
  })
}

//* 修改SPU||添加SPU：對於修改或添加，攜帶給伺服器參數大致相同的，唯一的差別就是攜帶的參數是否帶id
export const reqAddOrUpdateSpu = (spuInfo) => {
  //* 攜帶的參數帶有id----修改spu
  if (spuInfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuInfo
    })
  } else {
    //* 攜帶的參數不帶id---添加SPU
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuInfo
    })
  }
}

//* 刪除SPU
//* admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => {
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}

//* 取得圖片的數據
//* admin/product/spuImageList/{spuId}  get
export const reqSpuImageLIst = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

//* 取得銷售屬性的數據
//* admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId) => {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}

//* 取得平台屬性的數據
//* GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

//* 添加SKU
//* admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo) => {
  return request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data: skuInfo
  })
}

//* 取得SPU列表資料的接口
//* GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}
