<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名稱">
        <el-input v-model="spu.spuName" placeholder="請輸入SPU的名稱" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="請輸入品牌">
          <el-option
            v-for="item in tradeMarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>

      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spu.description" type="textarea" placeholder="SPU的描述" rows="4" />
      </el-form-item>
      <el-form-item label="SPU圖片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="imageList"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

      </el-form-item>
      <el-form-item label="銷售屬性">
        <el-select placeholder="還有3未選擇" value="">
          <el-option
            key="item.value"
            label="item.label"
            value="item.value"
          />
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加銷售屬性</el-button>
        <el-table border>
          <el-table-column type="index" label="序號" width="80" align="center" />
          <el-table-column prop="" label="屬性名" width="width" />
          <el-table-column prop="" label="屬性值名稱列表" width="width" />
          <el-table-column prop="" label="操作" width="width" />
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScence',0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: '',
        spuName: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: []
      },
      tradeMarkList: [],
      imageList: [],
      baseSaleAttrList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 初始化
    async initSpuData(spu) {
      // 獲取Spu訊息
      const spuResult = await this.$API.spu.reqSpu(spu.id)
      if (spuResult.code === 200) {
        this.spu = spuResult.data
      }
      // 獲取品牌訊息
      const tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 獲取圖片訊息
      const spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (spuImageResult.code === 200) {
        const listArr = spuImageResult.data
        // 為了配合elementUI的顯示規定,故重新產生一個json
        listArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.imageList = listArr
      }
      // 獲取平台全部銷售屬性
      const result = await this.$API.spu.reqBaseSaleAttrList()
      if (result.code === 200) {
        this.baseSaleAttrList = result.data
      }
    }
  }
}
</script>

  <style>

  </style>
