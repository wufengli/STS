<template>
  <div class="orderList">
    <el-table
      :data="orderDetail"
      style="width: 100%"
      align="center"
      @row-dblclick="showDetail">
      <el-table-column
        prop="createdTime"
        align="center"
        label="下单时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="transportType"
        align="center"
        label="运输类型"
        width="150">
      </el-table-column>
      <el-table-column
        prop="weight"
        align="center"
        label="总重量(kg)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="volume"
        align="center"
        label="总体积(m³)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="consignee"
        align="center"
        label="收件人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="phoneNumConsignee"
        align="center"
        label="联系方式"
        width="150">
      </el-table-column>
      <el-table-column
        prop="endArea"
        align="center"
        label="收货地址"
        width="300"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        label="运单状态"
        width="100">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageTotle"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'orderList',
  props: ['time'],
  data () {
    return {
      orderDetail: [],
      orderList: [],
      currentPage: 1,
      pageSize: 7,
      pageTotle: null
    }
  },
  watch: {
    time () {
    // 时间选择框的查询
      if (this.time) {
        this.orderDetail = []
        for (var i = 0; i < this.orderList.length; i++) {
          if (this.time === this.orderList[i].createdTime) {
            this.orderDetail.push(this.orderList[i])
          }
        }
      } else {
        this.orderDetail = []
        this.orderList.forEach((val, index) => {
          this.orderDetail.push(val)
        })
      }
    }
  },
  mounted () {
    const params = {
      order:{"Consignee":null},
      pageSize: this.pageSize,
      pageCode: this.currentPage
    }
    this.$get('/api/order/findByConPage', params)
      .then((response) => {
        console.log(response)
        var data = response.rows
        this.pageTotle = response.total
        for (var i = 0; i < data.length; i++) {
          this.orderList.push(data[i])
          data[i].endArea = data[i].endArea + data[i].endAreaMx
          this.orderDetail.push(data[i])
        }
      })
  },
  methods: {
    showDetail (row, event) {
      this.$emit('godetail', row)
    },
    handleDelete (index, row) {
      console.log(row)
      if (row.status === '刚生成') {
        this.$confirm('确定要取消该订单吗？？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '已取消当前订单'
            })
            this.$post('/api/delet', { orderId: row.orderId }) // 删除未发布的订单
              .then((response) => {
                if (response.status) {
                  this.orderDetail.splice(index, 1)
                }
              })
          })
      } else {
        this.$alert('当前订单已经不能取消', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      const params = {
        order:{"Consignee":null},
        pageSize: this.pageSize,
        pageCode: this.currentPage
      }
      this.$get('/api/order/findByConPage', params)
        .then((response) => {
          var data = response.rows
          this.pageTotle = response.total
          this.orderDetail = []
          for (var i = 0; i < data.length; i++) {
            this.orderList.push(data[i])
            data[i].endArea = data[i].endArea + data[i].endAreaMx
            this.orderDetail.push(data[i])
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.orderList{
  padding:0rem 1rem;
  .el-table{
    font-size: 0.6rem;
    /deep/.el-table__body{
      td{
        padding:0.4rem 0rem;
      }
    }
  }
  .el-pagination{
    text-align: center;
    margin-top: 0.5rem;
  }
}
</style>
