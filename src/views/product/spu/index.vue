<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="scene!=0" @getCategoryId="getCategoryId" />
    </el-card>
    <!-- 這裡有三部分切換 -->
    <el-card>
      <!-- 展示SPU列表結構 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
        >添加Spu</el-button>
        <el-table border :data="records">
          <el-table-column
            type="index"
            label="序號"
            width="80"
            align="center"
          />
          <el-table-column prop="spuName" label="Spu名稱" width="width" />
          <el-table-column prop="description" label="Spu描述" width="width" />
          <el-table-column prop="col.id" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加Sku"
                @click="addSku(row)"
              />
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改Spu"
                @click="updateSpu(row)"
              />
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看當前spu全部sku列表"
                @click="handler(row)"
              />
              <el-popconfirm title="確定要刪除嗎?" @onConfirm="deleteSpu(row)">
                <hint-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="刪除Spu"
                />
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper, -> ,sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="sizeChange"
        />
      </div>
      <SpuForm v-show="scene == 1" ref="spu" @changeScence="changeScence" />
      <SkuForm v-show="scene == 2" ref="sku" @changeSceneBySku="changeSceneBySku" />
    </el-card>
    <el-dialog :title="`${spu.spuName}的SKU列表`" :visible.sync="dialogTableVisible">
      <el-table :data="skuList" border style="width: 100%;">
        <el-table-column prop="skuName" label="名稱" width="width" />
        <el-table-column prop="price" label="價格" width="width" />
        <el-table-column prop="weight" label="重量" width="width" />
        <el-table-column label="預設圖片" width="width">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" height="100px" width="100px">
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
  </div>
</template>

<script>
import SpuForm from '@/views/product/spu/SpuForm'
import SkuForm from '@/views/product/spu/SkuForm'

export default {
  name: 'Spu',
  components: { SpuForm, SkuForm },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      records: [],
      total: 0,
      page: 1,
      limit: 3,
      scene: 0,
      dialogTableVisible: false,
      spu: {},
      skuList: []
    }
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    async getSpuList(pages = 1) {
      this.page = pages
      const { page, limit, category3Id } = this
      const result = await this.$API.spu.reqSpuList(page, limit, category3Id)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    sizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    addSpu() {
      this.scene = 1
      // 讓子組件發請求
      this.$refs.spu.addSpuData(this.category3Id)
    },
    updateSpu(row) {
      this.scene = 1
      // 調用子組件的方法
      this.$refs.spu.initSpuData(row)
    },
    changeScence({ scene, flag }) {
      this.scene = scene
      // 更新數據
      if (flag === '修改') {
        this.getSpuList(this.page)
      } else {
        this.getSpuList()
      }
    },
    async deleteSpu(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '刪除成功' })
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
      } else {
        this.$message({ type: 'error', message: '刪除失敗' })
      }
    },
    addSku(row) {
      // 切換場景
      this.scene = 2
      // 父組件調用子組件的方法發請求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    changeSceneBySku(scene) {
      this.scene = scene
    },
    async handler(spu) {
      this.spu = spu
      this.dialogTableVisible = true
      // 獲取SKU資料進行展示
      const result = await this.$API.spu.reqSkuList(spu.id)
      if (result.code === 200) {
        this.skuList = result.data
      }
    }
  }
}
</script>

<style>
</style>
