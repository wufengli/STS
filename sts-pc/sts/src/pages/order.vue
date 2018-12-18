<template>
  <div class="order">
    <div class="currentPage">当前页面：在线下单</div>
    <div class="toolBar">
      <button class="btn addBtn" @click="addOrder">
        <i class="el-icon-plus addIcon"></i>新增
      </button>
      <div class="data">
        <el-date-picker
          v-model="time1"
          type="date"
          class="choiceData"
          placeholder="选择查询日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
    </div>
    <el-tabs class="toolTab" v-model="activeName">
      <el-tab-pane label="订单列表" name="first">
        <order-list @godetail="addOrderDetail" :time="time1"/>
      </el-tab-pane>
      <el-tab-pane label="订单详情" name="second" disabled>
        <order-detail :Order="order" :isdisabled="ishide"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import orderDetail from '@/components/order/orderDetail'
import orderList from '@/components/order/orderList'
export default {
  name: 'order',
  components: {
    orderDetail,
    orderList
  },
  data () {
    return {
      time1: '',
      ishide: false,
      activeName: 'first',
      order: {}
    }
  },
  methods: {
    addOrder () {
      this.activeName = 'second'
      this.ishide = false
      this.order = {
        transportType: '0',
        signatureType: '0',
        receivingTime: '0'
      }
    },
    addOrderDetail (params) {
      this.activeName = 'second'
      this.order = params
      this.ishide = true
    }
  }
}
</script>
<style lang="less" scoped>
.order{
  padding:0.2rem 0.5rem;
  margin-top: 3.15rem;
  font-size: .7rem;
  .toolBar{
    width:100%;
    height:2.1rem;
    background: #ebeef5;
    margin:1rem 0rem;
    font-size: 0.6rem;
    display: flex;
    justify-content: space-between;
    .btn{
      outline-style: none;
      border:none;
      background:#ebeef5;
      padding:0.25rem 0.75rem;
      height:100%;
      box-sizing: border-box;
      .addIcon{
        font-size: 0.7rem;
        font-weight: 800;
        margin-right: 0.25rem;
      }
    }
    .data{
      margin:0.25rem 0.5rem;
      height:1.6rem;
      .choiceData{
        /deep/.el-input__inner{
          height:1.6rem;
          line-height: 1.6rem;
        }
        /deep/.el-input__icon{
          line-height: 1.6rem;
        }
      }
    }
  }
  .toolTab{
    /deep/.el-tabs__nav{
      width:60%;
      margin-left:20%;
      .el-tabs__active-bar {
        background-color: #105faa;
      }
      .el-tabs__item{
        width:50%;
        text-align: center;
        padding-right:3rem;
        &.is-active{
          color: #105faa;
        }
      }
    }
  }
}
</style>
