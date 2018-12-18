<template>
  <div class="Task-bar">
    <!-- 竞价按钮 -->
    <div class="btn">
      <el-button size="mini" type="primary" class="biddingbtn" @click="handleShowCompany">指派</el-button>
    </div>
    <!-- 未竞价表格 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :row-class-name="tableRowClassName"
      max-height="385"
      :data="taskdata"
      empty-text=" "
      class="task_table"
      highlight-current-row
      @row-dblclick="handleCurrentChange"
      @current-change="biddingCurrentSelect">
      <el-table-column
        v-for="(item,index) of TaskHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :show-overflow-tooltip="item.tooltip">
      </el-table-column>
    </el-table>
    <el-dialog title="可指派内部承运商" :visible.sync="showCompany" width="510px" top="25vh">
      <el-table :data="companydata" max-height="350" @row-dblclick="handleSelectCompany" highlight-current-row>
        <el-table-column property="userId" label="承运商" width="300" show-overflow-tooltip></el-table-column>
        <el-table-column property="price" label="运输价格（元）" width="150"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showCompany: false,
      currentBiddingRow: '',
      TaskHeader: [
        {
          prop: 'bidTaskId',
          label: '任务单号',
          width: '160',
          tooltip: false
        }, {
          prop: 'releaseTime',
          label: '任务单时间',
          width: '160',
          tooltip: false
        }, {
          prop: 'pickArea',
          label: '起始地',
          width: '160',
          tooltip: true
        }, {
          prop: 'deliverArea',
          label: '目的地',
          width: '160',
          tooltip: true
        }, {
          prop: 'taskType',
          label: '类型',
          width: '160',
          tooltip: false
        }, {
          prop: 'serviceTime',
          label: '时效(h)',
          width: '120',
          tooltip: false
        }, {
          prop: 'totalQuantity',
          label: '件数',
          width: '120',
          tooltip: false
        }, {
          prop: 'totalWeight',
          label: '总重量(kg)',
          width: '140',
          tooltip: false
        }, {
          prop: 'totalVolume',
          label: '总体积(m³)',
          width: '140',
          tooltip: false
        }, {
          prop: 'proposedPrice',
          label: '参考价(元)',
          width: '140',
          tooltip: false
        }, {
          prop: 'transactionPrice',
          label: '已拍价(元)',
          width: '140',
          tooltip: false
        }, {
          prop: 'userId',
          label: '承运商',
          width: '160',
          tooltip: true
        }, {
          prop: 'bidStatus',
          label: '任务单状态',
          width: '150',
          tooltip: false
        }
      ]
    }
  },
  props: {
    taskdata: Array,
    companydata: Array,
    loading: Boolean
  },
  methods: {
    // 颜色区分
    tableRowClassName ({row}) {
      if (row.bidStatus === '流拍') {
        return 'remain-row'
      }
      return ''
    },
    // 显示内部承运商
    handleShowCompany () {
      this.$emit('handleToShowCompany', this.currentBiddingRow)
      this.showCompany = true
    },
    // 指派
    handleSelectCompany (val) {
      this.$confirm('是否指派此承运商运输此任务单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '已指派此承运商运输此任务单!'
          })
          this.$emit('handleToCompany', this.currentBiddingRow.bidTaskId, val)
          this.showCompany = false
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消此任务单指派'
          })
          this.showCompany = false
        })
    },
    // 单击选中
    biddingCurrentSelect (val) {
      document.getElementsByClassName('biddingbtn')[0].style.backgroundColor = '#409eff'
      document.getElementsByClassName('biddingbtn')[0].style.borderColor = '#409eff'
      this.currentBiddingRow = val
    },
    // 双击中
    handleCurrentChange (val) {
      this.$emit('handleToDetail', val.bidTaskId)
    }
  }
}
</script>
<style lang="less" scoped>
.Task-bar {
  .btn {
    margin-right: .5rem;
    margin-bottom: .5rem;
    text-align: right;
    .biddingbtn {
      font-size: .6rem;
      color: #fff;
      border-radius: .15rem;
      background-color: #a0cfff;
      border-color: #a0cfff;
    }
  }
}
</style>
