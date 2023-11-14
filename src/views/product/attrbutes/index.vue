<template>
  <div>
    <el-card style="margin: 20px 0;">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>

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
      category3Id: ''
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
    getAttrList(){
      console.log('first')
    }
  }
}
</script>

<style>
</style>

