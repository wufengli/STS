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
          <el-select v-model="TaskType" placeholder="请选择任务单类型">
            <el-option
              v-for="item in TypeOptions"
              :key="item.typevalue"
              :label="item.typelabel"
              :value="item.typevalue">
            </el-option>
          </el-select>
        </div>
        <div class="task-time items">
          <span class="label">时效</span>
          <el-select v-model="serviceTime" placeholder="请选择任务单时效">
            <el-option
              v-for="item in TimeOptions"
              :key="item.timevalue"
              :label="item.timelabel"
              :value="item.timevalue">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item">
        <div class="task-volume items">
          <span class="label">总体积</span>
          <el-select v-model="totalVolume" placeholder="请选择任务单总体积">
            <el-option
              v-for="item in VolumeOptions"
              :key="item.volumevalue"
              :label="item.volumelabel"
              :value="item.volumevalue">
            </el-option>
          </el-select>
        </div>
        <div class="task-weight items">
          <span class="label">总重量</span>
          <el-select v-model="totalWeight" placeholder="请选择任务单总重量">
            <el-option
              v-for="item in WeightOptions"
              :key="item.weightvalue"
              :label="item.weightlabel"
              :value="item.weightvalue">
            </el-option>
          </el-select>
        </div>
        <div class="items"></div>
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
      TypeOptions: [
        {
          typevalue: '0',
          typelabel: '冷藏品'
        }, {
          typevalue: '1',
          typelabel: '普通'
        }
      ],
      TaskType: '',
      TimeOptions: [
        {
          timevalue: '0',
          timelabel: '≤72H'
        }, {
          timevalue: '1',
          timelabel: '>72H ≤120H'
        }, {
          timevalue: '2',
          timelabel: '其他'
        }
      ],
      serviceTime: '',
      VolumeOptions: [
        {
          volumevalue: '0',
          volumelabel: '≤10m³'
        }, {
          volumevalue: '1',
          volumelabel: '>10m³ ≤100m³'
        }, {
          volumevalue: '2',
          volumelabel: '其他'
        }
      ],
      totalVolume: '',
      WeightOptions: [
        {
          weightvalue: '0',
          weightlabel: '≤10kg'
        }, {
          weightvalue: '1',
          weightlabel: '>10kg ≤100kg'
        }, {
          weightvalue: '2',
          weightlabel: '其他'
        }
      ],
      totalWeight: ''
    }
  },
  props: ['activebar'],
  watch: {
    activebar: 'handleClear'
  },
  methods: {
    // 搜索
    handleSearch () {
      let parm = {
        bidTaskId: this.bidTaskId,
        pickArea: this.pickArea,
        deliverArea: this.deliverArea,
        TaskType: this.TaskType,
        serviceTime: this.serviceTime,
        totalVolume: this.totalVolume,
        totalWeight: this.totalWeight
      }
      if (this.activebar === 'bidding') {
        this.$emit('searchBidding', parm)
      } else {
        parm.TaskMyprice = this.TaskMyprice
        this.$emit('searchBidded', parm)
      }
    },
    // 清空
    handleClear () {
      this.bidTaskId = ''
      this.pickArea = ''
      this.deliverArea = ''
      this.TaskType = ''
      this.serviceTime = ''
      this.totalVolume = ''
      this.totalWeight = ''
      this.handleSearch()
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
</style>
