<template>
  <!-- 容器 -->
  <div ref="charts" class="charts" />
</template>

<script>
// 引入echarts
import echarts from 'echarts'
export default {
  name: '',
  mounted() {

    const lineCharts = echarts.init(this.$refs.charts)

    lineCharts.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
       
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44, 33, 22, 8],
          color: 'cyan'
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip: {}
    })
  }
}
</script>

  <style scoped>
  .charts {
    width: 100%;
    height: 100%;
  }
  </style>

