<template>
<!-- 分页 -->
<div class="pick-data">
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="page"
    :page-size="10"
    layout="prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</div>
</template>

<script>
export default {
  data () {
    return {
      page: 1
    }
  },
  props: {
    total: Number
  },
  methods: {
    // 更改页码
    handleSizeChange () {
      this.$emit('handleToPage', this.page)
    },
    handleCurrentChange () {
      this.$emit('handleToPage', this.page)
    }
  }
}
</script>
<style lang="less" scoped>
.pick-data {
  margin-top: 1rem;
  width: 100%;
  text-align: center;
}
</style>
