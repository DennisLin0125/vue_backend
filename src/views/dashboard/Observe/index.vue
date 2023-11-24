<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <Search />
      </el-col>
      <el-col :span="12">
        <Categroy />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Categroy from '@/views/dashboard/Observe/Categroy'
import Search from '@/views/dashboard/Observe/Search'
export default {
  name: 'Observe',
  components: {
    Categroy,
    Search
  }
}
</script>

<style scoped>

</style>
