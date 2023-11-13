<template>
  <div>
    <!-- 按鈕 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
    >添加</el-button>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序號" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名稱" width="width" />
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分頁器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->,sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    />
    <!-- 對話框 -->
    <!--
      :visible.sync:控制對話框顯示與隱藏用
     -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <!-- 展示表單
        :model屬性:收集表單的數據
      -->
      <el-form ref="ruleForm" style="width: 80%;" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名稱" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上傳jpg/png文件，且不超過500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">確 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    // 定義校驗規則
    const validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error('品牌名稱需要2~10位'))
      } else {
        callback()
      }
    }
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      // 對話框顯示或隱藏
      dialogFormVisible: false,
      // 收集品牌訊息
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      // 表單驗證規則
      rules: {
        tmName: [
          { required: true, message: '請輸入品牌名稱', trigger: 'blur' },
          // 自定義校驗規則
          { validator: validateTmName, trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '請選擇品牌圖片' }
        ]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    async getPageList(page = 1) {
      this.page = page
      const result = await this.$API.trademark.reqTradeMarkList(this.page, this.limit)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    showDialog() {
      this.dialogFormVisible = true
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    updateTradeMark(row) {
      this.dialogFormVisible = true
      this.tmForm = { ...row }
    },
    handleAvatarSuccess(res) {
      this.tmForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上傳頭像圖片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上傳頭像圖片大小不能超過 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加按鈕
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async(success) => {
        if (success) {
          this.dialogFormVisible = false
          const result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
            })
            //* 新增或修改品牌成功以後，需要再次取得品牌清單進行展示
            //* 如果新增品牌： 停留在第一頁，修改品牌應該留在目前頁面
            this.getPageList(this.tmForm.id ? this.page : 1)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 刪除品牌
    deleteTradeMark(row) {
      this.$confirm(`確定刪除 ${row.tmName}?`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 發送請求
        const result = await this.$API.trademark.reqDeleteTradeMark(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 更新
          this.getPageList(this.list.length ? this.page : this.page)
        } else {
          this.$message({
            type: 'info',
            message: '删除失敗!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}

</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
