<template>
  <div ref="charts" class="charts" />
</template>

<script>
// 引入
import echarts from 'echarts'
export default {
  name: 'LineChart',
  mounted() {
    const lineChart = echarts.init(this.$refs.charts)
    lineChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'blue'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'blue' // 0% 的颜色
                },
                {
                  offset: 1,
                  color: '#fff' // 100% 的颜色
                }
              ],
              global: false // 缺省为 false
            }
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
.charts{
    width: 100%;
    height: 100%;
}
</style>
