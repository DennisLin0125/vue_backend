<template>
  <div>
    <el-card style="margin: 20px 0;">
      <CategorySelect :show="!isShowTable" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div>
        <el-button type="primary" icon="el-icon-plus">添加Spu</el-button>
        <el-table border :data="records">
          <el-table-column type="index" label="序號" width="80" align="center" />
          <el-table-column prop="spuName" label="Spu名稱" width="width" />
          <el-table-column prop="description" label="Spu描述" width="width" />
          <el-table-column prop="col.id" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加Spu" />
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改Spu" />
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看當前spu全部sku列表" />
              <hint-button type="danger" icon="el-icon-delete" size="mini" title="刪除Spu" />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center;"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper, -> ,sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="sizeChange"
        />

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      records: [],
      total: 0,
      isShowTable: true,
      page: 1,
      limit: 3
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
    }
  }
}
</script>

<style>
</style>
