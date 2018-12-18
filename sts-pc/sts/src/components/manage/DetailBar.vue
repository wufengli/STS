<template>
  <div class="detail-bar"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
    <div class="detail-title">
      <div class="detail-leader">当前位置： 任务单 / 详情</div>
      <div class="detail-total">
        任务单号:
        <span class="detail-num">{{ detailOrder }}</span>
      </div>
    </div>
    <!-- 任务单表格 -->
    <el-table
      max-height="385"
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
    <div class="detail-result">
      <div class="lefts">
        共:
        <span>{{ detailNum }}</span>
          家承运商参与竞拍
      </div>
      <div>
        竞价结果:
        <span>{{ detailCompany }}</span>成功接单，运输价格为：
        <span>{{ detailPrice }}</span>元
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      DetailHeader: [
        {
          prop: 'company',
          label: '承运商',
          width: '300',
          tooltip: true
        }, {
          prop: 'price',
          label: '竞拍价(元)',
          width: '120',
          tooltip: false
        }
      ]
    }
  },
  props: {
    detailOrder: String,
    detailNum: Number,
    detailData: Array,
    detailCompany: String,
    detailPrice: String,
    loading: Boolean
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
.detail-bar {
  .detail-title {
    width: 21.05rem !important;
    margin: 0 auto;
    margin-bottom: .5rem;
    .detail-total {
      padding-right: 0;
      .detail-num {
        padding-right: 0 !important;
      }
    }
  }
  .detail-result {
    margin-top: .5rem;
    width: 100%;
    text-align: center;
    font-size: .6rem;
    color: #666;
    padding: .5rem;
    padding-left: 0;
    display: inline-block;
    div {
      display: inline-block;
      &.lefts {
        padding-right: 1rem;
      }
      span {
        padding: 0 .1rem;
        color: #e61f1f;
      }
    }
  }
  /deep/.el-table {
    width: 21.05rem !important;
    margin: 0 auto;
  }
}
</style>
