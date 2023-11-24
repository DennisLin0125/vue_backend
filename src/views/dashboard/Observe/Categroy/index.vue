<template>
  <el-card>
    <div slot="header" class="header">
      <div class="categroy-header">
        <span>銷售額類別占比</span>
        <el-radio-group v-model="value">
          <el-radio-button label="全部通路" />
          <el-radio-button label="線上" />
          <el-radio-button label="店面" />
        </el-radio-group>
      </div>
    </div>
    <div>
      <div ref="charts" class="charts" />
    </div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      value: '全部通路'
    }
  },
  mounted() {
    // 饼图
    const mychart = echarts.init(this.$refs.charts)
    mychart.setOption({
      title: {
        text: '影片',
        subtext: 1048,
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outsize'
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: '影片' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    // 绑定事件
    mychart.on('mouseover', (params) => {
      const { name, value } = params.data
      mychart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>

<style scoped>
.categroy-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header{
  border-bottom: 1px solid #eee;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>
