<template>
  <div class="home" style="height: 100%">
    <header-bar @refreshData="refreshData"/>
    <router-view :refreshdata="refreshdata" @refreshed="refreshed"/>
  </div>
</template>

<script>
import HeaderBar from '@/components/common/header'
export default {
  name: 'bidding',
  data () {
    return {
      refreshdata: false
    }
  },
  components: {
    HeaderBar
  },
  methods: {
    refreshData () {
      this.refreshdata = true
    },
    refreshed () {
      this.refreshdata = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
