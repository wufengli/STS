<template>
  <div class="packTask">
    <div class="operate">
      <el-form :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="运输类型" prop="transportType">
              <el-select v-model="transportType" >
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="起始日期">
              <el-date-picker
                type="date"
                placeholder="起始日期"
                value-format="yyyy-MM-dd"
                v-model="startTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束日期">
              <el-date-picker
                type="date"
                placeholder="结束日期"
                value-format="yyyy-MM-dd"
                v-model="endTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button type="primary" @click="pack" >打包</el-button>
              <el-button type="primary" >一键打包</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="寄件地址"  class="address">
              <v-distpicker @selected="onSelectedOne" ></v-distpicker>
              <el-input
                class="input-box"
                placeholder="请选择城市"
                v-show="false">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="收件地址"  class="address">
              <v-distpicker @selected="onSelectedTwo"></v-distpicker>
              <el-input
                class="input-box"
                placeholder="请选择城市"
                v-show="false">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="orderList">
      <el-table
        :data="orderDetail"
        :header-cell-style="tableHeaderColor"
        style="width: 100%"
        align="center"
        max-height="350"
        @cell-dblclick="showDetail"
        @selection-change="selection"
        v-loadmore="loadMore">
        <el-table-column
          type="selection"
          width="55"
          @selection-change="selection">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          align="center"
          label="订单号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="transportType"
          align="center"
          label="运输类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="goodsCount"
          align="center"
          label="总件数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="volume"
          align="center"
          label="总体积(m³)"
          width="100">
        </el-table-column>
        <el-table-column
          prop="weight"
          align="center"
          label="总重量(kg)"
          width="100">
        </el-table-column>
        <el-table-column
          prop="startArea"
          align="center"
          label="起始地址"
          width="250"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="endArea"
          align="center"
          label="收货地址"
          width="250"
          show-overflow-tooltip >
        </el-table-column>
        <el-table-column
          prop="receivingTime"
          align="center"
          label="送达时间">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Api from '@/api/api'
export default {
  name: 'packTask',
  data () {
    return {
      orderDetail: [],
      orderIds: [],
      options3: [{
        value: '1',
        label: '普通运输'
      },
      {
        value: '0',
        label: '冷藏品'
      }],
      transportType: '',
      startTime: '',
      endTime: '',
      startArea: '',
      endArea: '',
      pageTotle: null,
      pageSize: 10,
      currentPage: 1,
      loadSign: true
    }
  },
  mounted () {
    // 获取未发布订单信息
    const params = {
      'pageCode': this.currentPage,
      'pageSize': this.pageSize
    }
    this.$post('/api/orderHandler/findOrders', params)
      .then((response) => {
        console.log(response)
        var data = response.rows
        this.pageTotle = response.total
        this.orderDetail = Api.getParams(data)
      })
  },
  directives: {
    loadmore: {
      bind:(el, binding) => {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        selectWrap.addEventListener('scroll', function() {
          let sign = 5
          const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
          console.log(scrollDistance)
          if(scrollDistance < sign) {
            binding.value()
          }
        })
      }
    }
  },
  methods: {
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #F7F6Fd;'
      }
    },
    showDetail (row) {
      this.$emit('godetail', row)
    },
    selection (val) {
      this.orderIds = []
      val.forEach((v, k) => {
        this.orderIds.push(v.orderId)
      })
    },
    onSelectedOne (data) {
      var address = data.province.value + '-' + data.city.value + '-' + data.area.value
      this.startArea = address === '省-市-区' ? null : address
    },
    onSelectedTwo (data) {
      var address = data.province.value + '-' + data.city.value + '-' + data.area.value
      this.endArea = address === '省-市-区' ? null : address
    },
    pack () {
      // 传将要打包的订单id
      this.$post('/api/orderHandler/buildTask', this.orderIds)
        .then((response) => {
          if (response && response.success) {
            this.$message({
              message: '打包成功',
              type: 'success'
            })
            this.orderIds.forEach((valueOne) => {
              this.orderDetail.forEach((value,index) => {
                if (value.orderId === valueOne) {
                  this.orderDetail.splice(index,1)
                }
              })
            })
          } else {
            this.$message.error('打包失败')
          }
        })
    },
    search () {
      // 依据条件查询订单
      const params = {
        'order': {
          'transportType': this.transportType,
          'startArea': this.startArea,
          'endArea': this.endArea
        },
        'startTime': this.startTime,
        'endTime': this.endTime,
        'pageCode': 1,
        'pageSize': this.pageSize
      }
      this.$post('/api/orderHandler/findOrders', params)
        .then((response) => {
          this.pageTotle = response.total
          this.currentPage = 1
          this.orderDetail = []
          console.log(response)
          var data = response.rows
          this.orderDetail = Api.getParams(data)
        })
    },
    loadMore () {
     if (this.loadSign) {
      this.loadSign = false
      this.currentPage++
      if (this.currentPage > this.pageTotle) {
      return
      }
      setTimeout(() => {
      this.loadSign = true
      }, 1000)
      const params = {
      'pageCode': this.currentPage,
      'pageSize': this.pageSize
      }
      this.$post('/api/orderHandler/findOrders', params)
      .then((response) => {
        var data = response.rows
        var row = Api.getParams(data)
        row.forEach((value) => {
          this.orderDetail.push(value)
        })
        console.log(this.orderDetail)
      })
     }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
.packTask{
  padding: 0rem 0.5rem;
  .operate{
    .el-form-item{
      display: flex;
      width: 90%;
      margin-bottom: 0.5rem;
      /deep/.el-form-item__label{
        display: inline-block;
        line-height: 2rem;
        font-size: 0.6rem;
      }
      /deep/.el-form-item__content{
        flex:1;
        .el-input__inner{
          .elInputInner();
        }
        .el-button{
          .elButton();
        }
      }
      /deep/.distpicker-address-wrapper{
        position: absolute;
        top: 0.2rem;
        left: 0.2rem;
        z-index: 100;
        font-size: 0.6rem;
        select{
          outline: none;
          font-size: 0.6rem;
          padding: 0.2rem 0.5rem;
          width: 6rem;
          height: 1.2rem;
          line-height: 0.8rem;
        }
      }
    }
  }
  .orderList{
    .el-table{
      font-size: 0.6rem;
      /deep/.cell{
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .el-pagination{
      text-align: center;
      margin-top:1rem;
      overflow: hidden
    }
  }
}
</style>
