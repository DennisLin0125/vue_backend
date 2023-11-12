<template>
  <div>
    <!-- 按鈕 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
    >添加</el-button>
    <!-- 表格 -->
    <el-table style="width: 100%" border>
      <el-table-column prop="tmName" label="序號" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名稱" width="width" />
      <el-table-column prop="tmName" label="品牌LOGO" width="width" />
      <el-table-column prop="tmName" label="操作" width="width" />
    </el-table>
    <!-- 分頁器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="6"
      :total="99"
      :page-size="3"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->,sizes,total"
    />
  </div>
</template>

<script>
export default {
  name: 'TradeMark'
}
</script>

<style>
</style>
