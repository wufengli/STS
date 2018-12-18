<template>
  <div class="search-bar">
    <div class="search-btn">
      <div class="btn-box">
        <button type="button" class="el-button el-button--text" @click="handleSearch">
          <span>
            <i class="el-icon-search"></i>
            查询
          </span>
        </button>
      </div>
      <div class="btn-box">
        <button type="button" class="el-button el-button--text" @click="handleClear">
          <span>
            <i class="el-icon-refresh"></i>
            清除条件
          </span>
        </button>
      </div>
<!--       <div class="btn-box">
        <button type="button" class="el-button el-button--text" @click="handlePut">
          <span>
            <i class="el-icon-tickets"></i>
            导出
          </span>
        </button>
      </div> -->
    </div>
    <div class="search-box">
      <div class="item">
        <div class="task-order items">
          <span class="label">任务单号</span>
          <el-input v-model.trim="bidTaskId" placeholder="请输入任务单号" />
        </div>
        <div class="task-type items data">
          <span class="label">任务单时间</span>
          <el-date-picker
            v-model="releaseTime"
            type="date"
            placeholder="请选择开始时间">
          </el-date-picker>
          <span>&nbsp;</span>
          <el-date-picker
            v-model="sealedDiskTime"
            type="date"
            placeholder="请选择结束时间">
          </el-date-picker>
        </div>
        <div class="task-type items">
          <span class="label">任务单状态</span>
          <el-select v-model="bidStatus" placeholder="请选择任务单状态">
            <el-option
              v-for="item in stateOptions"
              :key="item.stateValue"
              :label="item.stateLabel"
              :value="item.stateValue">
            </el-option>
          </el-select>
        </div>
        <div class="task-type items">
          <span class="label">类型</span>
          <el-select v-model="taskType" placeholder="请选择任务单类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.typeValue"
              :label="item.typeLabel"
              :value="item.typeValue">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bidTaskId: '',
      typeOptions: [
        {
          typeValue: '0',
          typeLabel: '冷藏品'
        }, {
          typeValue: '1',
          typeLabel: '普通'
        }
      ],
      taskType: '',
      sealedDiskTime: '',
      releaseTime: '',
      stateOptions: [
        {
          stateValue: '-1',
          stateLabel: '竞价失败'
        }, {
          stateValue: '4',
          stateLabel: '运输完成'
        }
      ],
      bidStatus: ''
    }
  },
  methods: {
    handleSearch () {
      let parm = {
        bidTaskId: this.bidTaskId,
        taskType: this.taskType,
        bidStatus: this.bidStatus,
        releaseTime: this.releaseTime,
        sealedDiskTime: this.sealedDiskTime
      }
      this.$emit('searchHistory', parm)
    },
    // handlePut () {
    //   console.log('导出')
    // },
    handleClear () {
      this.bidTaskId = ''
      this.taskType = ''
      this.bidStatus = ''
      this.releaseTime = ''
      this.sealedDiskTime = ''
      this.handleSearch()
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
</style>
