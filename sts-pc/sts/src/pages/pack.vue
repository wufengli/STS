<template>
  <div class="pack">
    <div class="currentPage">当前页面：订单处理</div>
    <div class="tabTool">
      <el-tabs v-model="activeName" @tab-click="handleGetTask">
        <el-tab-pane label="任务打包" name="first">
          <pack-task @godetail="godetail"/>
        </el-tab-pane>
        <el-tab-pane label="任务单发布" name="second" >
          <order-pub :packList="packList" :pageTotle="pageTotle"/>
        </el-tab-pane>
        <el-tab-pane label="任务单详情" name="third" disabled >
          <order-detail :activeRow="activeRow"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import packTask from '@/components/pack/TaskPack'
import orderPub from '@/components/pack/orderPub'
import orderDetail from '@/components/pack/orderDetail'
export default {
  name: 'pack',
  components: {
    packTask,
    orderPub,
    orderDetail,
    activeRow: {}
  },
  data () {
    return {
      activeName: 'first',
      pageCode: 1,
      pageSize: 7,
      packList: [],
      pageTotle: null
    }
  },
  methods: {
    godetail (val) {
      this.activeName = 'third'
      this.activeRow = val
    },
    handleGetTask () {
      if (this.activeName === "second") {
        const params = {
          'pageCode': this.currentPage,
          'pageSize': this.pageSize
        }
        this.$get('/api/orderHandler/findTask',params)
          .then((response) => {
            console.log(response)
            this.packList = response.rows
            this.pageTotle = response.total
          })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pack{
  // position: relative;
  // top:0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // overflow: hidden;
  font-size: 0.6rem;
  margin-top: 3.15rem;
  padding: 0.5rem;
  .tabTool{
    padding: 0.5rem;
    /deep/.el-tabs__nav{
      width: 100%;
      .el-tabs__active-bar {
        background-color: #105faa;
      }
    }
    /deep/.el-tabs__item{
      width: 33.333%;
      text-align: center;
      &.is-active{
        color: #105faa;
      }
    }
  }
}
</style>
