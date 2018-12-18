<template>
  <div class="success-bar">
    <!-- 修改状态按钮 -->
    <div class="btn">
      <el-button size="mini" type="primary" class="changebtn" @click="doChangeState">运输</el-button>
    </div>
    <!-- 当前表格 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :row-class-name="tableRowClassName"
      max-height="385"
      empty-text=" "
      :data="currentdata"
      class="success_table"
      highlight-current-row
      @row-dblclick="handleCurrentChange"
      @current-change="successCurrentSelect">
      <el-table-column
        v-for="(item,index) of SuccessHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :show-overflow-tooltip="item.tooltip">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentSuccessRow: '',
      SuccessHeader: [
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
          width: '120',
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
          prop: 'transactionPrice',
          label: '已拍价(元)',
          width: '140',
          tooltip: false
        }, {
          prop: 'bidStatus',
          label: '任务单状态',
          width: '140',
          tooltip: false
        }
      ]
    }
  },
  props: {
    currentdata: Array,
    loading: Boolean
  },
  methods: {
    // 颜色区分
    tableRowClassName ({row}) {
      if (row.bidStatus === '运输中') {
        return 'trans-row'
      }
      return ''
    },
    // 修改状态
    doChangeState () {
      if (this.currentSuccessRow === '') {
        this.$message({
          message: '请单击选中你要操作的任务单单',
          type: 'warning'
        })
        return false
      }
      if (this.currentSuccessRow.bidStatus === '竞价成功') {
        this.$confirm('您将此任务单的状态改为运输中, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            for (let i = 0; i < this.currentdata.length; i++) {
              if (this.currentdata[i].bidTaskId === this.currentSuccessRow.bidTaskId) {
                this.$emit('handleToChangeState', 5, this.currentSuccessRow.bidTaskId)
              }
            }
            this.$message({
              type: 'success',
              message: '此任务单的状态已改为运输中!'
            })
            this.currentSuccessRow.bidStatus = '运输中'
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消状态修改'
            })
          })
      }
      if (this.currentSuccessRow.bidStatus === '运输中') {
        this.$confirm('您将此任务单的状态改为运输完成, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            for (let i = 0; i < this.currentdata.length; i++) {
              if (this.currentdata[i].bidTaskId === this.currentSuccessRow.bidTaskId) {
                this.$emit('handleToChangeState', 4, this.currentSuccessRow.bidTaskId)
                this.currentdata.splice(i, 1)
              }
            }
            this.$message({
              type: 'success',
              message: '此任务单的状态已改为运输完成!'
            })
            this.currentSuccessRow.bidStatus = '运输完成'
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消状态修改'
            })
          })
      }
    },
    // 单击选中
    successCurrentSelect (val) {
      document.getElementsByClassName('changebtn')[0].style.backgroundColor = '#409eff'
      document.getElementsByClassName('changebtn')[0].style.borderColor = '#409eff'
      this.currentSuccessRow = val
    },
    // 双击中
    handleCurrentChange (val) {
      this.$emit('handleToDetail', val.bidTaskId)
    }
  }
}
</script>
<style lang="less" scoped>
.success-bar {
  .btn {
    margin-right: .5rem;
    margin-bottom: .5rem;
    text-align: right;
    .changebtn {
      font-size: .6rem;
      color: #fff;
      border-radius: .15rem;
      background-color: #a0cfff;
      border-color: #a0cfff;
    }
  }
}
</style>
<!-- <style>
.el-table .false-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style> -->
