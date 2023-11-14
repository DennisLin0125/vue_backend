<template>
  <div>
    <el-card style="margin: 20px 0;">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-button type="primary" icon="el-icon-plus">添加屬性</el-button>
    <!-- 表格 -->
    <el-table style="width: 100%;" border :data="attrList">
      <el-table-column type="index" label="序號" width="80" align="center" />
      <el-table-column prop="attrName" label="屬性名稱" width="150" />
      <el-table-column prop="" label="屬性列表">
        <template slot-scope="{row,$index}">
          <el-tag v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id" type="success" style="margin: 0px 20px;">{{ attrValue.valueName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="150">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" />
          <el-button type="danger" icon="el-icon-delete" size="mini" />
        </template>
      </el-table-column>
    </el-table>

    <el-card />
  </div>
</template>

<script>
export default {
  name: 'Attribute',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: []
    }
  },
  methods: {
    // 自定義事件回調
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
        this.getAttrList()
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      const result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrList = result.data
      }
    }
  }
}
</script>

<style>
</style>

