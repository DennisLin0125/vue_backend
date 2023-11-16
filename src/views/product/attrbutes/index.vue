<template>
  <div>
    <el-card style="margin: 20px 0;">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="isShowTable=false">添加屬性</el-button>
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
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="isShowTable=false" />
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加屬性和修改屬性的結構 -->
      <div v-show="!isShowTable">
        <el-form ref="form" :rules="rules" label-width="80px" :inline="true">
          <el-form-item label="屬性名">
            <el-input placeholder="請輸入屬性名" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus">添加屬性值</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
        <el-table border style="width: 100%;margin: 20px 10px;">
          <el-table-column type="index" label="序號" width="80" align="center" />
          <el-table-column prop="attrName" label="屬性值名稱" width="width" />
          <el-table-column prop="" label="操作" width="width" />
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
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
      attrList: [],
      isShowTable: false
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

