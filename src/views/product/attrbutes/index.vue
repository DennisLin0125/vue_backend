<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
        >添加屬性</el-button>
        <!-- 表格 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            label="序號"
            width="80"
            align="center"
          />
          <el-table-column prop="attrName" label="屬性名稱" width="150" />
          <el-table-column prop="" label="屬性列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                type="success"
                style="margin: 0px 20px"
              >{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              />
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加屬性和修改屬性的結構 -->
      <div v-show="!isShowTable">
        <el-form ref="form" label-width="80px" :inline="true" :model="attrInfo">
          <el-form-item label="屬性名">
            <el-input v-model="attrInfo.attrName" placeholder="請輸入屬性名" />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
        >添加屬性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          border
          style="width: 100%; margin: 20px 10px"
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序號"
            width="80"
            align="center"
          />
          <el-table-column prop="attrName" label="屬性值名稱" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="請輸入屬性值名稱"
                size="mini"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              />
              <span v-else style="display: block;" @click="row.flag=true">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="!attrInfo.attrName"
        >保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attribute',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShowTable: true,
      // 收集新增屬性
      attrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
      }
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
      const result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      )
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
    },
    addAttr() {
      this.isShowTable = false
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    updateAttr(row) {
      this.isShowTable = false
      // 利用深拷貝
      this.attrInfo = cloneDeep(row)
      // 將相應屬性值元素加上flag
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
    },
    toLook(row) {
      if (row.valueName.trim() === '') {
        this.$message({ type: 'error', message: '請輸入一個正確的值' })
        return
      }
      const isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })
      if (isRepeat) {
        this.$message({ type: 'error', message: '輸入的值已重複' })
        return
      }
      row.flag = false
    }
  }
}
</script>

<style></style>

