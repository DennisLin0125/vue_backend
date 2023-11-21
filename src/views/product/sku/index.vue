<template>
  <div>
    <el-table border style="width: 100%" :data="records">
      <el-table-column type="index" label="序號" width="85" align="center" />
      <el-table-column prop="skuName" label="名稱" width="width" />
      <el-table-column prop="skuDesc" label="描述" width="width" />
      <el-table-column prop="col.id" label="預設圖片" width="110">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" height="100px" width="100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(kg)" width="80" />
      <el-table-column prop="price" label="價格(元)" width="80" />
      <el-table-column prop="col.id" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="row.isSale == 0"
            type="success"
            size="mini"
            icon="el-icon-bottom"
            @click="sale(row)"
          />
          <el-button
            v-else
            type="success"
            size="mini"
            icon="el-icon-top"
            @click="cancel(row)"
          />
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit"
          />
          <el-button
            type="info"
            size="mini"
            icon="el-icon-time"
            @click="getSkuInfo(row)"
          />
          <el-button type="danger" size="mini" icon="el-icon-delete" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="getSkuList"
      @size-change="sizeChange"
    />
    <!-- 抽屜 -->
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名稱</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">價格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台屬性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              v-for="(item, index) in skuInfo.skuAttrValueList"
              :key="item.id"
              type="success"
              style="margin-right: 10px;"
            >{{ item.attrId }}-{{ item.valueId }}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品圖片</el-col>
        <el-col :span="16">
          <el-carousel height="400px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      skuInfo: {},
      show: false
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const result = await this.$API.sku.reqSkuList(page, limit)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    sizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    async sale(sku) {
      const result = await this.$API.sku.reqSale(sku.id)
      if (result.code === 200) {
        // eslint-disable-next-line require-atomic-updates
        sku.isSale = 1
        this.$message({
          type: 'success',
          message: '上架成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: '上架失敗'
        })
      }
    },
    async cancel(sku) {
      const result = await this.$API.sku.reqCancel(sku.id)
      if (result.code === 200) {
        // eslint-disable-next-line require-atomic-updates
        sku.isSale = 0
        this.$message({
          type: 'success',
          message: '下架成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: '下架失敗'
        })
      }
    },
    edit() {
      this.$message({
        type: 'info',
        message: '正在開發中'
      })
    },
    async getSkuInfo(sku) {
      this.show = true
      const result = await this.$API.sku.reqSkuById(sku.id)
      if (result.code === 200) {
        this.skuInfo = result.data
      }
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button{
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
</style>

