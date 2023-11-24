<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick"-->
      <!--      頭部左側內容-->
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="銷售額" name="銷售額" />
        <el-tab-pane label="訪問量" name="訪問量" />
      </el-tabs>
      <!--      頭部右側內容-->
      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <!-- type="daterange"        v-model="value1"-->
        <el-date-picker
          class="date"
          range-separator="-"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          size="mini"
        />
      </div>
    </div>
    <!-- 內容區-->
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!--容器-->
          <div ref="charts" class="charts" />
        </el-col>
        <el-col :span="6" class="right">
          <h3>門店銷售額排名</h3>
          <ul>
            <li>
              <span class="rindex">0</span>
              <span>肯德基</span>
              <span class="rvalue">831456</span>
            </li>
            <li>
              <span class="rindex">1</span>
              <span>麥當勞</span>
              <span class="rvalue">754542</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>星巴克</span>
              <span class="rvalue">664242</span>
            </li>
            <li>
              <span>4</span>
              <span>海底撈</span>
              <span class="rvalue">547552</span>
            </li>
            <li>
              <span>5</span>
              <span>康世美</span>
              <span class="rvalue">345653</span>
            </li>
            <li>
              <span>6</span>
              <span>家樂福</span>
              <span class="rvalue">221478</span>
            </li>
            <li>
              <span>7</span>
              <span>大潤發</span>
              <span class="rvalue">152145</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Sale',
  data() {
    return {
      activeName: '銷售額'
    }
  },
  mounted() {
  //   初始化
    const myCharts = echarts.init(this.$refs.charts)
    myCharts.setOption({
      title: {
        text: '銷售額趨勢'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220, 110, 298, 230, 15, 159],
          color: 'skyblue'
        }
      ]
    })
  }
}
</script>

<style scoped>
.clearfix{
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab{
  width: 100%;
}
.right{
  position: absolute;
  right: 0;
}
.date{
  width: 250px;
  margin: 0 20px;
}

.right span {
  margin: 0 10px;
}

.charts{
  width: 100%;
  height: 300px;
}

ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}
</style>
