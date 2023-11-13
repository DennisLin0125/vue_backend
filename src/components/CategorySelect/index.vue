<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一級分類">
        <el-select placeholder="請選擇" value="">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="二級分類">
        <el-select placeholder="請選擇" value="">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="三級分類">
        <el-select placeholder="請選擇" value="">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect'
}
</script>

<style>

</style>
