<template>
  <div class="detail-bar">
    <div class="detail-title">
      <div class="detail-leader">当前位置： 任务单 / 详情</div>
      <div class="detail-total">
        任务单号:
        <span class="detail-num">{{ detailOrder }}</span>
          共:
        <span>{{ detailNum }}</span>
          条明细
    </div>
    </div>
    <!-- 任务单表格 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="detailData"
      class="detail_table">
      <el-table-column
        v-for="(item,index) of DetailHeader"
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
      DetailHeader: [
        {
          prop: 'goodsType',
          label: '商品名称',
          width: '160',
          tooltip: true
        }, {
          prop: 'startArea',
          label: '起始地',
          width: '160',
          tooltip: true
        }, {
          prop: 'endArea',
          label: '目的地',
          width: '160',
          tooltip: true
        }, {
          prop: 'transportType',
          label: '类型',
          width: '120',
          tooltip: false
        }, {
          prop: 'receivingTime',
          label: '时效(h)',
          width: '120',
          tooltip: false
        }, {
          prop: 'goodsCount',
          label: '件数',
          width: '120',
          tooltip: false
        }, {
          prop: 'weight',
          label: '总重量(kg)',
          width: '140',
          tooltip: false
        }, {
          prop: 'volume',
          label: '总体积(m³)',
          width: '140',
          tooltip: false
        }, {
          prop: 'remark',
          label: '备注',
          width: '160',
          tooltip: true
        }
      ]
    }
  },
  props: {
    detailOrder: String,
    detailNum: Number,
    detailData: Array,
    loading: Boolean
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
.detail-bar {
  .detail-title {
    width: 64.05rem !important;
    margin: 0 auto;
    margin-bottom: .5rem;
    .detail-total {
      padding-right: 0;
    }
  }
  /deep/.el-table {
    width: 64.05rem !important;
    margin: 0 auto;
  }
}
</style>
