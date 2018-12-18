<template>
  <div class="bidding-bar">
    <!-- 竞价按钮 -->
    <div class="btn">
      <el-button size="mini" type="primary" class="biddingbtn" @click="doBidding">竞拍</el-button>
    </div>
    <!-- 未竞价表格 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :cell-class-name="tableCell"
      max-height="385"
      empty-text=" "
      :data="biddingdata"
      class="bidding_table"
      highlight-current-row
      @row-dblclick="handleCurrentChange"
      @current-change="biddingCurrentSelect"
      :default-sort = "{prop: 'releaseTime', order: 'ascending'}"
      >
      <el-table-column
        v-for="(item,index) of biddingHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        :show-overflow-tooltip="item.tooltip">
      </el-table-column>
      <el-table-column
        label="距竞拍结束还剩"
        width="140">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.timeleft }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentBiddingRow: '',
      biddingHeader: [
        {
          prop: 'bidTaskId',
          label: '任务单号',
          width: '160',
          sortable: false,
          tooltip: false
        }, {
          prop: 'releaseTime',
          label: '发布时间',
          width: '160',
          sortable: false,
          tooltip: false
        }, {
          prop: 'pickArea',
          label: '起始地',
          width: '160',
          sortable: false,
          tooltip: true
        }, {
          prop: 'deliverArea',
          label: '目的地',
          width: '160',
          sortable: false,
          tooltip: true
        }, {
          prop: 'taskType',
          label: '类型',
          width: '100',
          sortable: false,
          tooltip: false
        }, {
          prop: 'serviceTime',
          label: '时效(h)',
          width: '130',
          sortable: true,
          tooltip: false
        }, {
          prop: 'totalQuantity',
          label: '件数',
          width: '120',
          sortable: false,
          tooltip: false
        }, {
          prop: 'totalWeight',
          label: '总重量(kg)',
          width: '140',
          sortable: true,
          tooltip: false
        }, {
          prop: 'totalVolume',
          label: '总体积(m³)',
          width: '140',
          sortable: true,
          tooltip: false
        }, {
          prop: 'proposedPrice',
          label: '参考价(元)',
          width: '120',
          sortable: false,
          tooltip: false
        }
      ]
    }
  },
  props: {
    biddingdata: Array,
    loading: Boolean
  },
  methods: {
    // 颜色
    tableCell ({columnIndex}){
      if (columnIndex === 10) {
        return 'color-red'
      }
      return ''
    },
    // 竞拍
    doBidding () {
      if (this.currentBiddingRow === '') {
        this.$message({
          message: '请单击选中你要操作的任务单',
          type: 'warning'
        })
        return false
      }
      this.$prompt('请输入您的报价（元）', '欢迎您参与此订单的竞拍', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\+?[1-9][0-9]*$/,
        inputErrorMessage: '请输入大于0的整数'
      })
        .then(({ value }) => {
          for (let i = 0; i < this.biddingdata.length; i++) {
            if (this.biddingdata[i].bidTaskId === this.currentBiddingRow.bidTaskId) {
              this.$emit('handleToDoBidding', value, this.currentBiddingRow.bidTaskId)
              this.biddingdata.splice(i, 1)
            }
          }
          this.$message({
            type: 'success',
            message: '您已参与此单的竞价，你的报价是: ' + value + '元'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消此单的报价'
          })
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
    },
    // 倒计时
    TimeLeft (endtime) {
      // 获取当前时间
      let date = new Date()
      let now = date.getTime()
      // 设置截止时间
      let endDate = new Date(endtime)
      let end = endDate.getTime() + 7200000
      // 时间差
      let leftTime = end - now
      let h = ''
      let m = ''
      let s = ''
      // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
        m = Math.floor(leftTime / 1000 / 60 % 60)
        s = Math.floor(leftTime / 1000 % 60)
        if (h < 10) {
          h = '0' + h
        }
        if (m < 10) {
          m = '0' + m
        }
        if (s < 10) {
          s = '0' + s
        }
        return h + ':' + m + ':' + s
      } else {
        return 'zero'
      }
    }
  },
  mounted () {
    // 如果存在未竞拍数据
    if (this.biddingdata !== undefined) {
      // 倒计时刷新
      let timer = setInterval(() => {
        for (let i = 0; i < this.biddingdata.length; i++) {
          if (this.TimeLeft(this.biddingdata[i].releaseTime) !== 'zero') {
            // 倒计时刷新
            this.$set(this.biddingdata[i], 'timeleft', this.TimeLeft(this.biddingdata[i].releaseTime))
          } else {
            // 倒计时结束删除数据
            this.biddingdata.splice(i, 1)
          }
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.bidding-bar {
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
  /deep/.el-table {
    width: 76.5rem !important;
    margin: 0 auto;
    .el-table__header-wrapper th {
      padding: .15rem .5rem !important;
    }
    .caret-wrapper {
      height: 1.65rem;
    }
  }
}
</style>
