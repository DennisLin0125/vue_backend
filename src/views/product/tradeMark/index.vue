<template>
  <div>
    <!-- 按鈕 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
    >添加</el-button>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序號" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名稱" width="width" />
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分頁器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->,sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: []
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    async getPageList(page = 1) {
      this.page = page
      const result = await this.$API.trademark.reqTradeMarkList(this.page, this.limit)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    }
  }
}
</script>

<style>
</style>
