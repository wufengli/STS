<template>
  <div class="manage">
    <!-- 页面标志 -->
    <div class="title">
      当前页面:
      <span>竞价管理</span>
    </div>
    <!-- 查询 -->
    <div class="wrap">
      <!-- tab -->
      <search-bar v-if="this.activeName!=='detail'" @searchTask="searchTask"/>
      <el-tabs v-model="activeName">
        <!-- 任务单 -->
        <el-tab-pane label="竞价任务单" name="task">
          <task-bar :loading="loading" :taskdata="taskdata" :companydata="companydata" @handleToDetail ="showDetail" @handleToCompany="handleToCompany" @handleToShowCompany="handleToShowCompany"/>
          <!-- 分页 -->
          <pick-data :total="tasktotal"  @handleToPage ="changePage"/>
        </el-tab-pane>
        <!-- 任务单详情 -->
        <el-tab-pane label="竞价详情" name="detail" disabled>
          <detail-bar :loading="loading" :detailOrder="detailOrder" :detailNum="detailNum" :detailCompany="detailCompany" :detailPrice="detailPrice" :detailData="detailData"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import SearchBar from '@/components/manage/SearchBar'
import TaskBar from '@/components/manage/TaskBar'
import DetailBar from '@/components/manage/DetailBar'
import PickData from '@/components/result/PickData'
export default {
  name: 'manage',
  data () {
    return {
      pageCode: 1,
      loading: false,
      condition:
      {
        bidTaskId: '',
        taskType: '',
        releaseTime: '',
        sealedDiskTime: '',
        bidStatus: ''
      },
      tasktotal: 0,
      detailOrder: '',
      detailNum: 0,
      detailCompany: '',
      detailPrice: '',
      detailData: [],
      companydata: [],
      taskdata: [],
      activeName: 'task',
      // 代替userId
      userId: 'ui003'
    }
  },
  components: {
    SearchBar,
    TaskBar,
    DetailBar,
    PickData
  },
  // computed: {
  //   // 获取userId
  //   ...mapState({
  //     userId: 'userId'
  //   })
  // },
  watch: {
    refreshdata: 'refreshData'
  },
  methods: {
    // 展示竞拍详情
    showDetail (e) {
      this.activeName = 'detail'
      this.loading = true
      this.$get('/api/auctionTask/findBiddingDetail', { 'bidTaskId': e })
        .then((response) => {
          this.detailOrder = e
          this.detailData = response.task
          this.detailNum = response.task.length
          this.detailCompany = response.company
          this.detailPrice = String(response.price)
          this.loading = false
        })
    },
    // 页码变化
    changePage (page) {
      this.pageCode = page
      this.taskAjax(this.userId, this.pageCode, this.condition)
    },
    // 搜索
    searchTask (condition) {
      this.condition = condition
      this.taskAjax(this.userId, this.pageCode, this.condition)
    },
    // ajax 竞拍任务
    taskAjax (Id, page, condition) {
      let parm = {
        userId: Id,
        pageCode: page,
        bidTaskId: condition.bidTaskId,
        taskType: condition.taskType,
        releaseTime: condition.releaseTime,
        sealedDiskTime: condition.sealedDiskTime,
        bidStatus: condition.bidStatus
      }
      this.loading = true
      this.$get('/api/auctionTask/biddeTask', parm)
        .then((response) => {
          this.taskdata = response.rows
          if (this.taskdata !== undefined && this.taskdata.length !== 0) {
            for (let i = 0; i < this.taskdata.length; i++) {
              if (this.taskdata[i].taskType === '0') {
                this.taskdata[i].taskType = '冷藏'
              }
              if (this.taskdata[i].taskType === '1') {
                this.taskdata[i].taskType = '普通'
              }
              if (this.taskdata[i].bidStatus === '0') {
                this.taskdata[i].bidStatus = '流拍'
              }
              if (this.taskdata[i].bidStatus === '1') {
                this.taskdata[i].bidStatus = '竞价中'
              }
              if (this.taskdata[i].bidStatus === '2') {
                this.taskdata[i].bidStatus = '竞价完成'
              }
              if (this.taskdata[i].bidStatus === '4') {
                this.taskdata[i].bidStatus = '运输完成'
              }
              if (this.taskdata[i].bidStatus === '5') {
                this.taskdata[i].bidStatus = '运输中'
              }
            }
            this.tasktotal = response.total
            this.loading = false
          }
        })
    },
    // 显示承运商
    handleToShowCompany (val) {
      let parm = {
        bidStatus: val.bidStatus,
        deliverArea: val.deliverArea,
        pickArea: val.pickArea,
        taskType: val.taskType,
        serviceTime: val.serviceTime
      }
      this.$get('/api/auctionTask/order', parm)
        .then((response) => {
          this.companydata = response
        })
    },
    // 选择指派承运商
    handleToCompany (bidTaskId, val) {
      let parm = {
        bidTaskId: bidTaskId,
        userId: val.userId,
        transactionPrice: val.price
      }
      console.log(parm)
    },
    // 刷新数据
    refreshData () {
      if (this.refreshdata) {
        if (this.activeName === 'task') {
          this.taskAjax(this.userId, this.pageCode, this.condition)
        } else {
          this.activeName = 'task'
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
    this.taskAjax(this.userId, this.pageCode, this.condition)
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
</style>
