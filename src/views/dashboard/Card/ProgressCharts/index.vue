<template>
  <!-- 容器 -->
  <div ref="charts" class="charts" />
</template>

<script>
// 引入echarts
import echarts from 'echarts'
export default {
  name: 'ProgressCharts',
  mounted() {
    const lineCharts = echarts.init(this.$refs.charts)
    lineCharts.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [78],
          color: 'cyan',
          barWidth: 10,
          // eslint-disable-next-line no-dupe-keys
          color: 'yellowgreen',
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
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

