<template>
  <div class="bidding">
    <!-- 页面标志 -->
    <div class="title">
      当前页面:
      <span>任务单竞价</span>
    </div>
    <!-- 查询 -->
    <search-bar v-if="activeName==='bidding'" @searchBidding="searchBidding"/>
    <search-bar v-if="activeName==='bidded'" @searchBidded="searchBidded"/>
    <div class="wrap">
      <!-- tab -->
      <el-tabs v-model="activeName">
        <!-- 未竞价任务单 -->
        <el-tab-pane label="未竞价任务单" name="bidding">
          <bidding-bar :biddingdata="biddingdata" :loading="loading" @handleToDetail ="showDetail" @handleToDoBidding="handleToDoBidding"/>
          <!-- 分页 -->
          <pick-data :total="biddingtotal"  @handleToPage ="changeBiddingPage"/>
        </el-tab-pane>
        <!-- 已竞价表单 -->
        <el-tab-pane label="已竞价任务单" name="bidded">
          <bidded-bar :biddeddata="biddeddata" :loading="loading" @handleToDetail ="showDetail" @handleTochangePrice ="handleTochangePrice" @handleToExit ="handleToExit"/>
          <!-- 分页 -->
          <pick-data :total="biddedtotal"  @handleToPage ="changeBiddedPage"/>
        </el-tab-pane>
        <!-- 任务单详情 -->
        <el-tab-pane label="任务单详情" name="detail" disabled>
          <detail-bar :detailOrder="detailOrder" :loading="loading" :detailNum="detailNum" :detailData="detailData"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchBar from '@/components/bidding/SearchBar'
import BiddingBar from '@/components/bidding/BiddingBar'
import BiddedBar from '@/components/bidding/BiddedBar'
import DetailBar from '@/components/bidding/DetailBar'
import PickData from '@/components/bidding/PickData'
export default {
  name: 'bidding',
  data () {
    return {
      pageCode: 1,
      condition:
      {
        bidTaskId: '',
        pickArea: '',
        deliverArea: '',
        taskType: '',
        serviceTime: '',
        totalVolume: '',
        totalWeight: ''
      },
      loading: false,
      biddedtotal: 0,
      biddingtotal: 0,
      detailOrder: '',
      detailNum: 0,
      detailData: [],
      biddingdata: [],
      biddeddata: [],
      activeName: 'bidding',
      flag: true,
      // 代替userId
      userId: 'ui003'
    }
  },
  // props: {
  //   refreshdata: Boolean
  // },
  components: {
    SearchBar,
    BiddingBar,
    BiddedBar,
    DetailBar,
    PickData
  },
  watch: {
    refreshdata: 'refreshData',
    // tab change
    activeName: function (val, oldval) {
      this.biddedAjax(this.userId, this.pageCode, this.flag, this.condition)
    }
  },
  // computed: {
  //   // 获取userId
  //   ...mapState({
  //     userId: 'userId'
  //   })
  // },
  methods: {
    // 任务单详情
    showDetail (e) {
      this.activeName = 'detail'
      this.loading = true
      this.$get('/api/auctionTask/getTaskDetails', { 'bidTaskId': e })
        .then((response) => {
          this.detailOrder = e
          this.detailData = response
          for (let i = 0; i < this.detailData.length; i++) {
            if (this.detailData[i].transportType === '0') {
              this.detailData[i].transportType = '冷藏'
            }
            if (this.detailData[i].transportType === '1') {
              this.detailData[i].transportType = '普通'
            }
          }
          this.detailNum = response.length


        })
      this.loading = false
    },
    // 未竞拍页码变化
    changeBiddingPage (page) {
      this.pageCode = page
      this.biddingAjax(this.userId, this.pageCode, this.condition)
    },
    // 已竞拍页码变化
    changeBiddedPage (page) {
      this.pageCode = page
      this.biddedAjax(this.userId, this.pageCode, true, this.condition)
    },
    // 查询未竞拍的任务单
    searchBidding (condition) {
      this.condition = condition
      this.biddingAjax(this.userId, this.pageCode, this.condition)
    },
    // 查询已竞拍的任务单
    searchBidded (condition) {
      this.condition = condition
      this.biddedAjax(this.userId, this.pageCode, true, this.condition)
    },
    // 竞拍
    handleToDoBidding (value, bidTaskId) {
      let parm = {
        userId: this.userId,
        bidTaskId: bidTaskId,
        quotedPrice: value
      }
      this.$get('/api/auctionTask/auctionPrice', parm)
        .then((response) => {
          console.log(response)
        })
    },
    // 修改竞拍价
    handleTochangePrice (value, bidTaskId) {
      let parm = {
        userId: this.userId,
        bidTaskId: bidTaskId,
        quotedPrice: value
      }
      this.$get('/api/auctionTask/auctionPrice', parm)
        .then((response) => {
          console.log(response)
        })
    },
    // 取消竞拍
    handleToExit (bidTaskId) {
      let parm = {
        userId: this.userId,
        bidTaskId: bidTaskId
      }
      this.$get('/api/auctionTask/cancelBidding', parm)
        .then((response) => {
          console.log(response)
        })
    },
    // ajax 未竞拍数据
    biddingAjax (Id, page, condition) {
      let parm = {
        userId: Id,
        pageCode: page,
        bidTaskId: condition.bidTaskId,
        pickArea: condition.pickArea,
        deliverArea: condition.deliverArea,
        taskType: condition.taskType,
        serviceTime: condition.serviceTime,
        totalVolume: condition.totalVolume,
        totalWeight: condition.totalWeight
      }
      this.loading = true
      this.$get('/api/auctionTask/currentTask', parm)
        .then((response) => {
          this.biddingdata = response.rows
          if (this.biddingdata !== undefined && this.biddingdata.length !== 0) {
            for (let i = 0; i < this.biddingdata.length; i++) {
              if (this.biddingdata[i].taskType === '0') {
                this.biddingdata[i].taskType = '冷藏'
              }
              if (this.biddingdata[i].taskType === '1') {
                this.biddingdata[i].taskType = '普通'
              }
            }
            this.biddingtotal = response.total
          }
        })
      this.loading = false
    },
    // ajax 已竞拍数据
    biddedAjax (Id, page, flag, condition) {
      if (this.activeName === 'bidded' && flag) {
        this.loading = true
        let parm = {
          userId: Id,
          pageCode: page,
          bidTaskId: condition.bidTaskId,
          pickArea: condition.pickArea,
          deliverArea: condition.deliverArea,
          taskType: condition.taskType,
          serviceTime: condition.serviceTime,
          totalVolume: condition.totalVolume,
          totalWeight: condition.totalWeight
        }
        this.$get('/api/auctionTask/findBidded', parm)
          .then((response) => {
            this.biddeddata = response.rows
            if (this.biddingdata !== undefined && this.biddingdata.length !== 0) {
              for (let i = 0; i < this.biddeddata.length; i++) {
                if (this.biddeddata[i].taskType === '0') {
                  this.biddeddata[i].taskType = '冷藏'
                }
                if (this.biddeddata[i].taskType === '1') {
                  this.biddeddata[i].taskType = '普通'
                }
              }
              this.biddedtotal = response.total
            }
          })
        this.flag = false
        this.loading = false
      }
    },
    // 刷新数据
    refreshData () {
      if (this.refreshdata) {
        if (this.activeName === 'bidding') {
          this.biddingAjax(this.userId, this.pageCode, this.condition)
        }
        if (this.activeName === 'bidded') {
          this.biddedAjax(this.userId, this.pageCode, this.condition)
        }
        if (this.activeName === 'detail') {
          this.activeName = 'bidding'
        }
        this.$emit('refreshed')
      }
    }
  },
  mounted () {
    // 判断是否登录
    // if (this.userId === '未登录') {
    //   this.$router.push({ path: '/login' })
    // }
    this.biddingAjax(this.userId, this.pageCode, this.condition)
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
</style>
