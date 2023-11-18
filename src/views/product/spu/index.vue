<template>
  <div>
    <el-card style="margin: 20px 0;">
      <CategorySelect :show="!isShowTable" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div>
        <el-button type="primary" icon="el-icon-plus">添加Spu</el-button>
        <el-table border>
          <el-table-column type="index" label="序號" width="80" align="center" />
          <el-table-column prop="col.id" label="Spu名稱" width="width" />
          <el-table-column prop="col.id" label="Spu描述" width="width" />
          <el-table-column prop="col.id" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="success" icon="el-icon-plus" size="mini" />
              <el-button type="waring" icon="el-icon-edit" size="mini" />
              <el-button type="info" icon="el-icon-info" size="mini" />
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </template>
          </el-table-column>
        </el-table>
        <!--
          @size-change="sizeChange"
          @current-change="currentChange"
         -->
        <el-pagination
          style="text-align: center;"
          :current-page="6"
          :page-sizes="[3, 5, 10]"
          :page-size="3"
          layout="prev, pager, next, jumper, -> ,sizes, total"
          :total="23"
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
      attrList: [],
      isShowTable: true
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
    async getSpuList() {

    }
  }
}
</script>

<style>
</style>
