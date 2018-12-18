<template>
  <div class="orderPub">
    <div class="operate">
      <el-button @click="taskPublish">发布</el-button>
      <el-button @click="openTask">拆包</el-button>
    </div>
    <el-table
      :data="packList"
      :header-cell-style="tableHeaderColor"
      style="width: 100%"
      @selection-change="selections"
      align="center">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="orderlist" v-for="(order,index) in props.row.orderList" :key="order.orderId">
            <el-row>
              <el-col :span="6">
                <el-form-item label="订单号:">
                  <span>{{order.orderNum}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="提货时间:">
                  <span>{{order.deliveryTime}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="运输类型:">
                  <span>{{order.transportType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="总件数:">
                  <span>{{order.goodsCount}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="总体积:">
                  <span>{{order.volume}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="总重量:">
                  <span>{{order.weight}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="起始地址:">
                  <span>{{order.startArea}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="目的地址:">
                  <span>{{order.endArea}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                 <el-button type="danger" @click="handleDeletOrder(order.orderId,props.row,index)">拆单</el-button>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        @selection-change="selections"
        width="55">
      </el-table-column>
      <el-table-column
        prop="bidTaskNum"
        align="center"
        label="任务单号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="transportType"
        align="center"
        label="运输类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="totalQuantity"
        align="center"
        label="总件数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="totalVolume"
        align="center"
        label="总体积(m³)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="totalWeight"
        align="center"
        label="总重量(kg)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="serviceTime"
        align="center"
        label="送达时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="pickArea"
        align="center"
        label="起始地址"
        width="300"
        show-overflow-tooltip >
      </el-table-column>
      <el-table-column
        prop="deliverArea"
        align="center"
        label="收货地址"
        show-overflow-tooltip>
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
  name: 'orderPub',
  props: ['packList','pageTotle'],
  data () {
    return {
      TaskIds: [],
      pageSize: 4,
      currentPage: 1
    }
  },
  methods: {
    handleDeletOrder (val,bidId,index) {
      console.log(index)
      const params = {
        bidTaskId: bidId.bidTaskId,
        removeOrderIds: val,
        operationStatus: "1" // 拆单标志
      }
      // // 根据userId进行拆单
      this.$post('/api/orderHandler/demolitionOrder',params)
        .then((response) => {
          if(response && response.success) {
            this.packList.forEach((value) => {
              if (value.bidTaskId === bidId.bidTaskId) {
                value.orderList.splice(index,1)
              }
            })
            this.$message({
              message: '拆单成功',
              type: 'success'
            })
          } else {
            this.$message.error('拆单失败')
          }
        })
    },
    selections (val) {
      console.log(val)
      this.TaskIds = []
      val.forEach((v, k) => {
        this.TaskIds.push(v.bidTaskId)
      })
    },
    openTask () {
      this.$post('/api/orderHandler/taskIssue', this.TaskIds)
        .then((response) => {
          console.log(response)
        })
    },
    taskPublish () {
      // 发布任务单请求
      this.$post('/api/orderHandler/taskIssue', this.TaskIds)
        .then((response) => {
          if (response && response.success) {
            this.$message({
              message: '任务单发布成功',
              type: 'success'
            })
            this.TaskIds.forEach((valueOne) => {
              this.packList.forEach((value,index) => {
                if (value.bidTaskId === valueOne) {
                  this.packList.splice(index,1)
                }
              })
            })
          }
        })
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      const params = {
        'pageCode': this.currentPage,
        'pageSize': this.pageSize
      }
      this.$post('/api/orderHandler/findTask',params)
        .then((response) => {
          console.log(response)
          this.packList = response.rows
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
.orderPub{
  .operate{
    .el-button{
      .elButton();
      float:right;
      margin-right: 1rem;
    }
  }
  .el-table{
    font-size: 0.6rem;
    .orderlist{
      border-bottom:1px solid #f1f1f1;
      /deep/.el-form-item{
        margin: 0rem;
        .el-form-item__label{
          font-size: 0.6rem;
        }
        .el-form-item__content{
          font-size: 0.6rem;
        }
      }
      .el-button{
        font-size: 0.6rem;
        line-height: 1.2rem;
        height: 1.2rem;
        padding: 0rem 0.5rem;
        margin: 0.4rem;
      }
    }
  }
  .el-pagination{
    text-align: center;
    margin-top: 1rem;
  }
}
</style>
