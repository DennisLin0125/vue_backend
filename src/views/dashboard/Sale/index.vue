<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick"-->
      <!--      頭部左側內容-->
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="銷售額" name="sale" />
        <el-tab-pane label="訪問量" name="visit" />
      </el-tabs>
      <!--      頭部右側內容-->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          class="date"
          range-separator="-"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          size="mini"
          value-format="yyyy-MM-dd"
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
          <h3>門店{{ title }}排名</h3>
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
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'sale',
      myCharts: null,
      date: []
    }
  },
  computed: {
    title() {
      return this.activeName === 'sale' ? '銷售額' : '訪問量'
    },
    ...mapState({
      listState: state => state.home.list
    })
  },
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title
        },
        xAxis: {
          data: this.title === '銷售額' ? this.listState.orderFullYearAxis : this.listState.orderFullYearAxis
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.title === '銷售額' ? this.listState.userFullYear : this.listState.orderFullYear,
            color: 'skyblue'
          }
        ]
      })
    },
    listState() {
      this.myCharts.setOption({
        title: {
          text: this.title
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
            data: this.listState.orderFullYearAxis,
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
            data: this.listState.orderFullYearAxis,
            color: 'skyblue'
          }
        ]
      })
    }
  },
  mounted() {
  //   初始化
    this.myCharts = echarts.init(this.$refs.charts)
    this.myCharts.setOption({
      title: {
        text: this.title
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
          data: [],
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
          data: [],
          color: 'skyblue'
        }
      ]
    })
  },
  methods: {
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
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
