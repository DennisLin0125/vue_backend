<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名稱">海綿寶寶</el-form-item>
      <el-form-item label="SKU名稱">
        <el-input placeholder="SKU名稱" />
      </el-form-item>
      <el-form-item label="價格(元)">
        <el-input placeholder="價格(元)" />
      </el-form-item>
      <el-form-item label="重量(kg)">
        <el-input placeholder="重量(kg)" />
      </el-form-item>
      <el-form-item label="規格描述">
        <el-input type="textarea" placeholder="規格描述" rows="4" />
      </el-form-item>
      <el-form-item label="平台屬性">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item label="螢幕尺寸">
            <el-select placeholder="請選擇" value="">
              <el-option
                key="item.value"
                label="item.label"
                value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="銷售屬性">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item label="顏色">
            <el-select placeholder="請選擇" value="">
              <el-option
                key="item.value"
                label="item.label"
                value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="圖片列表">
        <el-table border style="width: 100%;">
          <el-table-column type="selection" label="" width="width" />
          <el-table-column prop="col.id" label="圖片" width="width">
            <template slot-scope="" />
          </el-table-column>
          <el-table-column prop="col.id" label="名稱" width="width" />
          <el-table-column prop="col.id" label="操作" width="width">
            <template slot-scope="" />
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
      attrInfoList: []
    }
  },
  methods: {
    // 獲取數據
    async getData(category1Id, category2Id, spu) {
      // 獲取圖片訊息
      const result = await this.$API.spu.reqSpuImageLIst(spu.id)
      if (result.code === 200) {
        this.spuImageLIst = result.data
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
    }
  }
}
</script>

<style>

</style>
