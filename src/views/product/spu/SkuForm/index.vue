<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名稱">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名稱">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名稱" />
      </el-form-item>
      <el-form-item label="價格(元)">
        <el-input v-model="skuInfo.price" placeholder="價格(元)" type="number" />
      </el-form-item>
      <el-form-item label="重量(kg)">
        <el-input v-model="skuInfo.weight" placeholder="重量(kg)" />
      </el-form-item>
      <el-form-item label="規格描述">
        <el-input v-model="skuInfo.skuDesc" type="textarea" placeholder="規格描述" rows="4" />
      </el-form-item>
      <el-form-item label="平台屬性">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item v-for="(attr) in attrInfoList" :key="attr.id" :label="attr.attrName">
            <el-select v-model="attr.attrIdAndValueId" placeholder="請選擇">
              <el-option
                v-for="(attrValue) in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="銷售屬性">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
            <el-select v-model="saleAttr.attrIdAndValueId" placeholder="請選擇">
              <el-option
                v-for="(saleAttrValue) in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="圖片列表">
        <el-table border style="width: 100%;" :data="spuImageLIst" @selection-change="handleSelectChange">
          <el-table-column type="selection" width="width" />
          <el-table-column prop="col.id" label="圖片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" height="100px" width="100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名稱" width="width" />
          <el-table-column prop="col.id" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button v-if="row.isDefault == 0" type="primary" @click="changeDefault(row,$index)">設為默認</el-button>
              <el-button v-else>默認</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImageLIst: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        // 第一類收集的數據：父組件給的數據
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二類：需要透過資料雙向綁定v-model收集
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        // 第三類：需要自己書寫程式碼
        // 預設圖片
        skuDefaultImg: '',
        // 收集圖片的字段
        skuImageList: [],
        // 平台屬性
        skuAttrValueList: [],
        // 銷售屬性
        skuSaleAttrValueList: []
      },
      spu: {},
      imageList: []
    }
  },
  methods: {
    // 獲取數據
    async getData(category1Id, category2Id, spu) {
      // 收集父組件給的訊息
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      // 獲取圖片訊息
      const result = await this.$API.spu.reqSpuImageLIst(spu.id)
      if (result.code === 200) {
        const list = result.data
        list.forEach(item => {
          item.isDefault = 0
        })
        this.spuImageLIst = list
      }
      // 獲取銷售屬性數據
      const result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      if (result1.code === 200) {
        this.spuSaleAttrList = result1.data
      }
      // 獲取平台屬性的數據
      const result2 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
      if (result2.code === 200) {
        this.attrInfoList = result2.data
      }
    },
    handleSelectChange(params) {
      this.imageList = params
    },
    changeDefault(row, index) {
      // 排他操作
      this.spuImageLIst.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      // 收集圖片
      this.skuInfo.skuDefaultImg = row.imgUrl
    }
  }
}
</script>

<style>

</style>
