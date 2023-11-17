<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一級分類">
        <el-select v-model="cForm.category1Id" placeholder="請選擇" :disabled="show" @change="handler1">
          <el-option v-for="(c1, index) in list1" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二級分類">
        <el-select v-model="cForm.category2Id" placeholder="請選擇" :disabled="show" @change="handler2">
          <el-option v-for="(c2, index) in list2" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三級分類">
        <el-select v-model="cForm.category3Id" placeholder="請選擇" :disabled="show" @change="handler3">
          <el-option v-for="(c3, index) in list3" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      // 收集相應ID
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    // 獲取一級分類請求
    this.getCategoryList()
  },
  methods: {
    async getCategoryList() {
      const result = await this.$API.attr.reqCategory1List()
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    // 一級分類的事件發生變化的回調
    async handler1() {
      // 清除資料
      this.list2 = []
      this.list3 = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''

      const { category1Id } = this.cForm
      // 觸發自定義事件
      this.$emit('getCategoryId', { categoryId: category1Id, level: 1 })

      // 發請求
      const result = await this.$API.attr.reqCategory2List(category1Id)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    // 二級分類的事件發生變化的回調
    async handler2() {
      this.list3 = []
      this.cForm.category3Id = ''

      const { category2Id } = this.cForm
      // 觸發自定義事件
      this.$emit('getCategoryId', { categoryId: category2Id, level: 2 })
      // 發請求
      const result = await this.$API.attr.reqCategory3List(category2Id)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    handler3() {
      const { category3Id } = this.cForm
      // 觸發自定義事件
      this.$emit('getCategoryId', { categoryId: category3Id, level: 3 })
    }
  }
}
</script>

<style>

</style>
