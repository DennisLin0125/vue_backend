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
                title="添加Spu"
                @click="addSpu"
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
              />
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="刪除Spu"
              />
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
      <SkuForm v-show="scene == 2" />
    </el-card>
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
      scene: 0
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
    },
    updateSpu(row) {
      this.scene = 1
      // 調用子組件的方法
      this.$refs.spu.initSpuData(row)
    },
    changeScence(scene) {
      this.scene = scene
    }
  }
}
</script>

<style>
</style>
