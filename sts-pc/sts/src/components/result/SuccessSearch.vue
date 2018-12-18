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
    </div>
    <div class="search-box">
      <div class="item">
        <div class="task-order items">
          <span class="label">任务单号</span>
          <el-input v-model.trim="bidTaskId" placeholder="请输入任务单号" />
        </div>
        <div class="task-start items">
          <span class="label">起始地</span>
          <el-input v-model.trim="pickArea" placeholder="请输入起始地" />
        </div>
        <div class="task-end items">
          <span class="label">目的地</span>
          <el-input v-model.trim="deliverArea" placeholder="请输入目的地" />
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
        <div class="task-time items">
          <span class="label">时效</span>
          <el-select v-model="serviceTime" placeholder="请选择任务单时效">
            <el-option
              v-for="item in timeOptions"
              :key="item.timeValue"
              :label="item.timeLabel"
              :value="item.timeValue">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item">
        <div class="task-volume items">
          <span class="label">总体积</span>
          <el-select v-model="totalVolume" placeholder="请选择任务单总体积">
            <el-option
              v-for="item in volumeOptions"
              :key="item.volumeValue"
              :label="item.volumeLabel"
              :value="item.volumeValue">
            </el-option>
          </el-select>
        </div>
        <div class="task-weight items">
          <span class="label">总重量</span>
          <el-select v-model="totalWeight" placeholder="请选择任务单总重量">
            <el-option
              v-for="item in weightOptions"
              :key="item.weightValue"
              :label="item.weightLabel"
              :value="item.weightValue">
            </el-option>
          </el-select>
        </div>
        <div class="task-myprice items">
          <span class="label">任务单状态</span>
          <el-select v-model="bidStatus" placeholder="请选择任务单已拍价">
            <el-option
              v-for="item in stateOptions"
              :key="item.stateValue"
              :label="item.stateLabel"
              :value="item.stateValue">
            </el-option>
          </el-select>
        </div>
        <div class="items"></div>
        <div class="items"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bidTaskId: '',
      pickArea: '',
      deliverArea: '',
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
      timeOptions: [
        {
          timeValue: '0',
          timeLabel: '≤72H'
        }, {
          timeValue: '1',
          timeLabel: '>72H ≤120H'
        }, {
          timeValue: '2',
          timeLabel: '其他'
        }
      ],
      serviceTime: '',
      volumeOptions: [
        {
          volumeValue: '1',
          volumeLabel: '≤10m³'
        }, {
          volumeValue: '2',
          volumeLabel: '>10m³ ≤100m³'
        }, {
          volumeValue: '3',
          volumeLabel: '其他'
        }
      ],
      totalVolume: '',
      weightOptions: [
        {
          weightValue: '1',
          weightLabel: '<10kg'
        }, {
          weightValue: '2',
          weightLabel: '≥10kg ≤100kg'
        }, {
          weightValue: '3',
          weightLabel: '其他'
        }
      ],
      totalWeight: '',
      stateOptions: [
        {
          stateValue: '2',
          stateLabel: '竞价成功'
        }, {
          stateValue: '5',
          stateLabel: '运输中'
        }
      ],
      bidStatus: ''
    }
  },
  methods: {
    handleSearch () {
      let parm = {
        bidTaskId: this.bidTaskId,
        pickArea: this.pickArea,
        deliverArea: this.deliverArea,
        taskType: this.taskType,
        serviceTime: this.serviceTime,
        totalVolume: this.totalVolume,
        totalWeight: this.totalWeight,
        bidStatus: this.bidStatus
      }
      this.$emit('searchCurrent', parm)
    },
    handleClear () {
      this.bidTaskId = ''
      this.pickArea = ''
      this.deliverArea = ''
      this.taskType = ''
      this.serviceTime = ''
      this.totalVolume = ''
      this.totalWeight = ''
      this.totalWeight = ''
      this.bidStatus = ''
      this.handleSearch()
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
</style>
