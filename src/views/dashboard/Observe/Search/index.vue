<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>線上熱門搜索</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>雞蛋糕</el-dropdown-item>
            <el-dropdown-item>獅子頭</el-dropdown-item>
            <el-dropdown-item>螺獅粉</el-dropdown-item>
            <el-dropdown-item>水煎包</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineChart />
        </el-col>
        <el-col :span="12">
          <LineChart />
        </el-col>
      </el-row>
      <!--table-->
      <!--   :default-sort="{prop: 'date', order: 'descending'}"   -->
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          label="排名"
          width="80"
          type="index"
        />
        <el-table-column
          label="搜索關鍵字"
          width="180"
        />
        <el-table-column
          label="用戶數"
          sortable
        />
        <el-table-column
          label="周漲幅"
          sortable
        />
      </el-table>
      <!--      分頁器-->
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        class="pagination"
      />
    </div>
  </el-card>
</template>

<script>
import LineChart from './LineChart'

export default {
  name: 'Search',
  components: { LineChart },
  data() {
    return {
      tableData: [{}]
    }
  }
}
</script>

<style scoped>
.search-header{
  display: flex;
  justify-content: space-between;
}
.header {
border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.pagination{
  float: right;
}
</style>
