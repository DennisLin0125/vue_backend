<template>
  <div>
    <el-table border style="width: 100%;" :data="records">
      <el-table-column type="index" label="序號" width="85" align="center" />
      <el-table-column prop="skuName" label="名稱" width="width" />
      <el-table-column prop="skuDesc" label="描述" width="width" />
      <el-table-column prop="col.id" label="預設圖片" width="110">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" height="100px" width="100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(kg)" width="80" />
      <el-table-column prop="price" label="價格(元)" width="80" />
      <el-table-column prop="col.id" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="success" size="mini" icon="el-icon-bottom" />
          <el-button type="success" size="mini" icon="el-icon-top" />
          <el-button type="primary" size="mini" icon="el-icon-edit" />
          <el-button type="info" size="mini" icon="el-icon-time" />
          <el-button type="danger" size="mini" icon="el-icon-delete" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center;"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="getSkuList"
      @size-change="sizeChange"
    />

  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 3,
      records: [],
      total: 0
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const result = await this.$API.sku.reqSkuList(page, limit)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    sizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    }
  }

}
</script>

<style>
</style>

