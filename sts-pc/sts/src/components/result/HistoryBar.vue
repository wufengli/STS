<template>
  <div class="history-bar">
    <!-- 历史任务单表格 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :row-class-name="tableRowClassName"
      max-height="385"
      empty-text=" "
      :data="historydata"
      class="history_table"
      highlight-current-row
      @row-dblclick="handleCurrentChange">
      <el-table-column
        v-for="(item,index) of HistoryHeader"
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
      HistoryHeader: [
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
    historydata: Array,
    loading: Boolean
  },
  methods: {
    // 颜色区分
    tableRowClassName ({row}) {
      if (row.bidStatus === '竞价失败') {
        return 'false-row'
      }
      return ''
    },
    // 双击中
    handleCurrentChange (val) {
      if (val.bidStatus === '竞价失败') {
        this.$message({
          message: '竞价失败任务单不可查阅详情',
          type: 'warning'
        })
        return false
      } else {
        this.$emit('handleToDetail', val.bidTaskId)
      }
    }
  }
}
</script>
