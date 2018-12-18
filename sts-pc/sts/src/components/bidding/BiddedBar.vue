<template>
  <div class="bidded-bar">
    <!-- 竞价修改按钮 -->
    <div class="do">
      <div class="btn">
        <!-- 修改 -->
        <el-button size="mini" class="changebtn" @click="changePrice">修改</el-button>
      </div>
      <div class="btn">
        <!-- 取消 -->
        <el-button type="danger" class="exitbtn" size="mini" @click="exit">取消</el-button>
      </div>
    </div>
    <!-- 已竞价表格 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      max-height="385"
      :cell-class-name="tableCell"
      empty-text=" "
      :data="biddeddata"
      class="bidded_table"
      highlight-current-row
      @row-dblclick="handleCurrentChange"
      @current-change="biddedCurrentSelect">
      <el-table-column
        v-for="(item,index) of BiddedHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
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
      currentBiddedRow: '',
      BiddedHeader: [
        {
          prop: 'bidTaskId',
          label: '任务单号',
          width: '160',
          tooltip: false
        }, {
          prop: 'releaseTime',
          label: '发布时间',
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
          width: '100',
          tooltip: false
        }, {
          prop: 'serviceTime',
          label: '时效(h)',
          width: '110',
          tooltip: false
        }, {
          prop: 'totalQuantity',
          label: '件数',
          width: '100',
          tooltip: false
        }, {
          prop: 'totalWeight',
          label: '总重量(kg)',
          width: '110',
          tooltip: false
        }, {
          prop: 'totalVolume',
          label: '总体积(m³)',
          width: '110',
          tooltip: false
        }, {
          prop: 'proposedPrice',
          label: '参考价(元)',
          width: '110',
          tooltip: false
        }, {
          prop: 'quotedPrice',
          label: '已拍价(元)',
          width: '110',
          tooltip: false
        }
      ]
    }
  },
  props: {
    biddeddata: Array,
    loading: Boolean
  },
  methods: {
    // 颜色
    tableCell ({columnIndex}){
      if (columnIndex === 11) {
        return 'color-red'
      }
      return ''
    },
    // 修改价格
    changePrice () {
      if (this.currentBiddedRow === '') {
        this.$message({
          message: '请单击选中你要操作的任务单单',
          type: 'warning'
        })
        return false
      }
      this.$prompt('请输入您的报价（元）', '竞拍价格修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\+?[1-9][0-9]*$/,
        inputErrorMessage: '请输入大于0的整数'
      })
        .then(({ value }) => {
          for (let i = 0; i < this.biddeddata.length; i++) {
            if (this.biddeddata[i].bidTaskId === this.currentBiddedRow.bidTaskId) {
              this.$emit('handleTochangePrice', value, this.currentBiddedRow.bidTaskId)
            }
          }
          this.$message({
            type: 'success',
            message: '修改成功，你修改后的报价是: ' + value + '元'
          })
          this.currentBiddedRow.quotedPrice = value
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消此单的报价'
          })
        })
    },
    // 取消任务单
    exit () {
      if (this.currentBiddedRow === '') {
        this.$message({
          message: '请单击选中你要操作的任务单单',
          type: 'warning'
        })
        return false
      }
      this.$confirm('你要取消此订单的竞拍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          for (let i = 0; i < this.biddeddata.length; i++) {
            if (this.biddeddata[i].bidTaskId === this.currentBiddedRow.bidTaskId) {
              this.$emit('handleToExit', this.currentBiddedRow.bidTaskId)
              this.biddeddata.splice(i, 1)
            }
          }
          this.$message({
            type: 'success',
            message: '你已取消此订单的竞拍!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '消此订单竞拍失败'
          })
        })
    },
    // 双击中
    handleCurrentChange (val) {
      this.$emit('handleToDetail', val.bidTaskId)
    },
    // 单击选中
    biddedCurrentSelect (val) {
      document.getElementsByClassName('changebtn')[0].style.backgroundColor = '#409eff'
      document.getElementsByClassName('changebtn')[0].style.borderColor = '#409eff'
      document.getElementsByClassName('exitbtn')[0].style.backgroundColor = '#f56c6c'
      document.getElementsByClassName('exitbtn')[0].style.borderColor = '#f56c6c'
      this.currentBiddedRow = val
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
    // 如果数据存在
    if (this.biddeddata !== undefined) {
      // 倒计时刷新
      let timer = setInterval(() => {
        for (let i = 0; i < this.biddeddata.length; i++) {
          if (this.TimeLeft(this.biddeddata[i].releaseTime) !== 'zero') {
            this.$set(this.biddeddata[i], 'timeleft', this.TimeLeft(this.biddeddata[i].releaseTime))
          } else {
            // 倒计时结束删除数据
            this.biddeddata.splice(i, 1)
          }
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.bidded-bar {
  .do {
    display: flex;
    justify-content: flex-end;
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
      .exitbtn {
        font-size: .6rem;
        color: #fff;
        border-radius: .15rem;
        background-color: #fab6b6;
        border-color: #fab6b6;
      }
    }
  }
  /deep/.el-table {
    width: 76.5rem !important;
    margin: 0 auto;
  }
}
</style>
