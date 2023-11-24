<template>
  <div>
    <Card />
    <Sale />
  </div>
</template>

<script>
import Sale from '@/views/dashboard/Sale'
import Card from '@/views/dashboard/Card'
export default {
  name: 'Dashboard',
  components: { Card, Sale }
}
</script>

<style scoped>

</style>
