<template>
  <div class="orderDetail">
    <!-- 任务单表格 -->
      <el-table
        :data="packDetail"
        :header-cell-style="tableHeaderColor"
        style="width: 100%"
        align="center"
        @cell-dblclick="showDetail">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          align="center"
          label="订单号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="consignor"
          align="center"
          label="寄件人姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="phoneNumConsignor"
          align="center"
          label="联系电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="consignee"
          align="center"
          label="收件人姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="phoneNumConsignee"
          align="center"
          label="联系电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goodsType"
          align="center"
          label="商品类型"
          width="100">
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
          prop="receivingTime"
          align="center"
          label="送达时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="deliveryTime"
          align="center"
          label="上门时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="transportPrices"
          align="center"
          label="预计费用(元)"
          width="100">
        </el-table-column>
        <el-table-column
          prop="endArea"
          align="center"
          label="起始地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="endArea"
          align="center"
          label="目的地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"
          label="备注"
          width="150">
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  props: ['activeRow'],
  data () {
    return {
      packDetail: []
    }
  },
  watch: {
    activeRow () {
      this.packDetail = []
      this.packDetail.push(this.activeRow)
    }
  }
}
</script>
<style lang="less" scoped>
.orderDetail{
  .el-table{
    font-size: 0.6rem;
  }
}
</style>
