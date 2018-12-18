<template>
  <div class="result">
    <!-- 页面标志 -->
    <div class="title">
      当前页面:
      <span>竞价结果查询</span>
    </div>
    <!-- 查询 -->
    <div class="wrap">
      <!-- tab -->
      <success-search v-if="this.activeName==='success'" @searchCurrent="searchCurrent"/>
      <history-search v-if="this.activeName==='history'" @searchHistory="searchHistory"/>
      <el-tabs v-model="activeName">
        <!-- 当前任务单 -->
        <el-tab-pane label="当前任务单" name="success">
          <success-bar :currentdata="currentdata" :loading="loading" @handleToDetail ="showDetail" @handleToChangeState="handleToChangeState"/>
          <!-- 分页 -->
          <pick-data :total="currenttotal"  @handleToPage ="changeCurrentPage"/>
        </el-tab-pane>
        <!-- 历史任务单 -->
        <el-tab-pane label="历史任务单" name="history">
          <history-bar :historydata="historydata" :loading="loading" @handleToDetail ="showDetail"/>
          <!-- 分页 -->
          <pick-data :total="historytotal"  @handleToPage ="changeHistoryPage"/>
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
import SuccessSearch from '@/components/result/SuccessSearch'
import SuccessBar from '@/components/result/SuccessBar'
import HistorySearch from '@/components/result/HistorySearch'
import HistoryBar from '@/components/result/HistoryBar'
import DetailBar from '@/components/result/DetailBar'
import PickData from '@/components/result/PickData'
export default {
  name: 'result',
  data () {
    return {
      pageCode: 1,
      loading: false,
      currentCondition:
      {
        bidTaskId: '',
        pickArea: '',
        deliverArea: '',
        taskType: '',
        serviceTime: '',
        totalVolume: '',
        totalWeight: '',
        bidStatus: ''
      },
      historyCondition:
      {
        bidTaskId: '',
        releaseTime: '',
        sealedDiskTime: '',
        taskType: '',
        bidStatus: ''
      },
      currenttotal: 0,
      historytotal: 0,
      detailOrder: '',
      detailNum: 0,
      detailData: [],
      currentdata: [],
      historydata: [],
      activeName: 'success',
      flag: true,
      // 代替userId
      userId: 'u1001'
    }
  },
  props: {
    refreshdata: Boolean
  },
  components: {
    SuccessSearch,
    SuccessBar,
    HistorySearch,
    HistoryBar,
    DetailBar,
    PickData
  },
  watch: {
    refreshdata: 'refreshData',
    // tab change
    activeName: function (val, oldval) {
      this.historyTaskAjax(this.userId, this.pageCode, this.flag, this.historyCondition)
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
      this.$get('/api/auctionTask/getResultDetails', { 'bidTaskId': e }).then((response) => {
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
        this.loading = false
      })
    },
    // Current页码变化
    changeCurrentPage (page) {
      this.pageCode = page
      this.currentTaskAjax(this.userId, this.pageCode, this.currentCondition)
    },
    // History页码变化
    changeHistoryPage (page) {
      this.pageCode = page
      this.historyTaskAjax(this.userId, this.pageCode, true, this.historyCondition)
    },
    // 查询当前任务单
    searchCurrent (currentCondition) {
      this.currentCondition = currentCondition
      this.currentTaskAjax(this.userId, this.pageCode, this.currentCondition)
    },
    // 查询历史任务单
    searchHistory (historyCondition) {
      this.historyCondition = historyCondition
      this.historyTaskAjax(this.userId, this.pageCode, true, this.historyCondition)
    },
    // 修改运输状态
    handleToChangeState (value, bidTaskId) {
      let parm = {
        bidTaskId: bidTaskId,
        bidStatus: value
      }
      this.$get('/api/auctionTask/updateTaskStatus', parm)
        .then((response) => {
          console.log(response)
        })
    },
    // ajax current 数据
    currentTaskAjax (Id, page, currentCondition) {
      let parm = {
        userId: Id,
        pageCode: page,
        bidTaskId: currentCondition.bidTaskId,
        pickArea: currentCondition.pickArea,
        deliverArea: currentCondition.deliverArea,
        taskType: currentCondition.taskType,
        serviceTime: currentCondition.serviceTime,
        totalVolume: currentCondition.totalVolume,
        totalWeight: currentCondition.totalWeight,
        bidStatus: currentCondition.bidStatus
      }
      this.loading = true
      this.$get('/api/auctionTask/findSuccessByPage', parm)
        .then((response) => {
          console.log(response)
          this.currentdata = response.rows
          for (let i = 0; i < this.currentdata.length; i++) {
            if (this.currentdata[i].bidStatus === '2') {
              this.currentdata[i].bidStatus = '竞价成功'
            }
            if (this.currentdata[i].bidStatus === '5') {
              this.currentdata[i].bidStatus = '运输中'
            }
            if (this.currentdata[i].taskType === '0') {
              this.currentdata[i].taskType = '冷藏'
            }
            if (this.currentdata[i].taskType === '1') {
              this.currentdata[i].taskType = '普通'
            }
          }
          this.currenttotal = response.total
          this.loading = false
        })
    },
    // ajax history 数据
    historyTaskAjax (Id, page, flag, historyCondition) {
      if (this.activeName === 'history' && flag) {
        let parm = {
          userId: Id,
          pageCode: page,
          bidTaskId: historyCondition.bidTaskId,
          releaseTime: historyCondition.releaseTime,
          sealedDiskTime: historyCondition.sealedDiskTime,
          taskType: historyCondition.taskType,
          bidStatus: historyCondition.bidStatus
        }
        this.loading = true
        this.$get('/api/auctionTask/findHistoryByPage', parm)
          .then((response) => {
            this.historydata = response.rows
            for (let i = 0; i < this.historydata.length; i++) {
              if (this.historydata[i].bidStatus === '4') {
                this.historydata[i].bidStatus = '运输完成'
              }
              if (this.historydata[i].bidStatus === '-1') {
                this.historydata[i].bidStatus = '竞价失败'
              }
              if (this.historydata[i].taskType === '0') {
                this.historydata[i].taskType = '冷藏'
              }
              if (this.historydata[i].taskType === '1') {
                this.historydata[i].taskType = '普通'
              }
            }
            this.historytotal = response.total
            this.loading = false
          })
        this.flag = false
      }
    },
    // 刷新数据
    refreshData () {
      if (this.refreshdata) {
        if (this.activeName === 'success') {
          this.currentTaskAjax(this.userId, this.pageCode, this.currentCondition)
        }
        if (this.activeName === 'history') {
          this.historyTaskAjax(this.userId, this.pageCode, true, this.historyCondition)
        }
        if (this.activeName === 'detail') {
          this.activeName = 'success'
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
    this.currentTaskAjax(this.userId, this.pageCode, this.currentCondition)
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
</style>
