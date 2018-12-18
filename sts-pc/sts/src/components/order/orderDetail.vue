<template>
  <div class="detail">
    <el-form :model="Order" :rules="rules" ref="Order" :disabled="isdisabled">
      <div class="area address">
        <div class="classify">收发货地址</div>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="寄件人姓名" prop="consignor">
              <el-input
                class="input-box"
                placeholder="请输入寄件人姓名"
                v-model="Order.consignor">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收件人姓名" prop="consignee">
              <el-input
                class="input-box"
                placeholder="请输入收件人人姓名"
                v-model="Order.consignee">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phoneNumConsignor">
              <el-input
                class="input-box"
                placeholder="请输入手机号"
                v-model="Order.phoneNumConsignor">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phoneNumConsignee">
              <el-input
                class="input-box"
                placeholder="请输入手机号"
                v-model="Order.phoneNumConsignee">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12" class="addressRow">
            <el-form-item label="寄件地址"  class="l-address" prop="startArea">
              <div class="hideAddress" v-show="hideOk">
                <p>选择寄送地址</p>
                <v-distpicker @selected="onSelected"></v-distpicker>
              </div>
              <div class="m-a" @click="changehide">
                <el-input
                  class="input-box"
                  placeholder="请选择城市"
                  v-model="Order.startArea">
                </el-input>
              </div>
            </el-form-item>
            <el-form-item class="AreaDetail" prop="startAreaMx">
              <el-input
                class="input-box"
                placeholder="详细街道"
                v-model="Order.startAreaMx">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="addressRow">
            <el-form-item label="收件地址"  class="l-address" prop="endArea">
              <div class="hideAddress" v-show="hideOk1">
                <p>选择寄送地址</p>
                <v-distpicker @selected="onSelected1 "></v-distpicker>
              </div>
              <div class="m-a" @click="changehide1">
                <el-input
                  class="input-box"
                  placeholder="请选择城市"
                  v-model="Order.endArea">
                </el-input>
              </div>
            </el-form-item>
            <el-form-item class="AreaDetail" prop="endAreaMx">
              <el-input
                class="input-box"
                placeholder="详细街道"
                v-model="Order.endAreaMx">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="area sendInfo">
        <div class="classify">寄托物信息</div>
        <el-row class="row">
          <el-col :span="6">
            <el-form-item label="商品类型" prop="goodsType">
              <el-select v-model="Order.goodsType">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="重量(kg)" prop="weight">
              <el-input
                class="input-box"
                placeholder="重量"
                v-model="Order.weight">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="体积" prop="volume">
              <el-input
                class="input-box"
                placeholder="0-999"
                v-model="Order.volume">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="件数" prop="goodsCount">
              <el-input
                class="input-box"
                placeholder="件"
                v-model="Order.goodsCount">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输类型" prop="transportType">
              <el-select v-model="Order.transportType" >
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="area serviceInfo">
        <div class="classify">服务信息</div>
        <el-row class="row">
          <el-col :span="6">
            <el-form-item label="提货时间">
              <el-date-picker
                v-model="Order.deliveryTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH-mm-ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="签收单">
              <el-select v-model="Order.signatureType">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预计送达时间">
              <el-select v-model="Order.receivingTime">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="备注" class="remark">
              <el-input type="textarea" v-model="Order.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="submit">
        <p>预估总价<span class="price"> {{ Order.transportPrices }} </span>元</p>
        <el-button class="submitBtn" @click="submitForm('Order')" >提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'orderDetail',
  props: ['Order', 'isdisabled'],
  data () {
    var validPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入联系方式'))
      } else {
        const reg1 = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg1.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确手机号'))
        }
      }
    }
    var validNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('必填内容'))
      } else {
        const reg = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)|(^[0-9]*\.[0-9]{1}$)/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('数字不合法'))
        }
      }
    }
    return {
      hideOk: false,
      hideOk1: false,
      options1: [{
        value: '0',
        label: '中药'
      },
      {
        value: '1',
        label: '西药'
      }, {
        value: '2',
        label: '器械'
      }, {
        value: '3',
        label: '生活用品'
      }],
      options2: [{
        value: '0',
        label: '无需返单'
      },
      {
        value: '1',
        label: '签收单传真返回'
      },
      {
        value: '2',
        label: '签收单原件返回'
      }],
      options3: [{
        value: '1',
        label: '普通运输'
      },
      {
        value: '0',
        label: '冷藏车'
      }],
      options4: [{
        value: '0',
        label: '3天内'
      },
      {
        value: '1',
        label: '3-5天'
      },
      {
        value: '2',
        label: '5-7天'
      }],
      Order: {
        consignor: '',
        consignee: '',
        phoneNumConsignor: '',
        phoneNumConsignee: '',
        startArea: '',
        startAreaMx: '',
        endArea: '',
        endAreaMx: '',
        weight: '',
        volume: '',
        goodsCount: '',
        goodsType: '',
        deliveryTime: '',
        remark: '',
        receivingTime: '',
        transportPrices: null,
        transportType: '',
        signatureType: '',
        userId: ''
      },
      rules: {
        consignor: [
          {required: true, message: '请输入寄件人人姓名', trigger: 'blur'},
          {max: 10, message: '长度在20个字符以内', trigger: 'blur'}
        ],
        consignee: [
          {required: true, message: '请输入收件人人姓名', trigger: 'blur'},
          {max: 10, message: '长度在20个字符以内', trigger: 'blur'}
        ],
        phoneNumConsignor: [
          {required: true, trigger: 'blur', validator: validPhone}
        ],
        phoneNumConsignee: [
          {required: true, trigger: 'blur', validator: validPhone}
        ],
        goodsName: [
          {required: true, message: '请选择物品类型', trigger: 'blur'}
        ],
        weight: [
          {required: true, validator: validNumber, trigger: 'blur'}
        ],
        volume: [
          {required: true, validator: validNumber, trigger: 'blur'}
        ],
        goodsCount: [
          {required: true, validator: validNumber, trigger: 'blur'}
        ],
        goodsType: [
          {required: true, message: '请选择运输类型', trigger: 'blur'}
        ],
        startArea: [
          {required: true, message: '请选择城市', trigger: 'blur'}
        ],
        endArea: [
          {required: true, message: '请选择城市', trigger: 'blur'}
        ],
        startAreaMx: [
          {required: true, message: '请输入详细街道', trigger: 'blur'}
        ],
        endAreaMx: [
          {required: true, message: '请输入详细街道', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    computedPrice () {
      var data = this.Order
      const {startArea, endArea, goodsCount, volume, weight, goodsType} = data
      return {startArea, endArea, goodsCount, volume, weight, goodsType}
    }
  },
  watch: {
    computedPrice (newData) {
      if (newData.volume && newData.goodsCount && newData.weight && newData.startArea && newData.endArea) {
        this.$get('/api/price/getPrice', newData)
          .then((response) => {
            this.$set(this.Order, 'transportPrices', response.transportPrices)
          })
      } else {
        this.$set(this.Order, 'transportPrices', 0)
      }
    }
  },
  methods: {
    changehide () {
      this.hideOk = !this.hideOk
    },
    onSelected (data) {
      var address = data.province.value + '-' + data.city.value + '-' + data.area.value
      this.$set(this.Order, 'startArea', address)
      this.hideOk = !this.hideOk
    },
    changehide1 () {
      this.hideOk1 = !this.hideOk1
    },
    onSelected1 (data) {
      var address = data.province.value + '-' + data.city.value + '-' + data.area.value
      this.$set(this.Order, 'endArea', address)
      this.hideOk1 = !this.hideOk1
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Order.userId = 'lisi'
          this.$post('/api/order/create', this.Order)
            .then((response) => {
              console.log(response)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/main.less';
.detail{
  padding:0px 1rem;
  margin-bottom: 1rem;
  .area{
    .classify{
      font-size: 0.7rem;
      font-weight: 700;
      margin:0.5rem 0rem;
    }
    .row{
      padding:0px 0.5rem;
      .addressRow{
        display: flex;
        .AreaDetail{
          margin-top: 0.75rem;
          width: 50%;
        }
      }
      .el-form-item{
        width:35%;
        /deep/.el-form-item__label{
          line-height: 0.75rem;
          font-size: 0.6rem;
        }
        /deep/.el-input__inner{
          height:1.5rem !important;
          font-size: 0.6rem;
        }
        &.l-address{
          width:40%;
          position:relative;
          /deep/.el-form-item__label{
            text-align: left;
            float: none;
            display: block;
            width:100%;
          }
          /deep/.el-form-item__content{
            display: flex;
            .input-box{
              margin-right: 0.5rem;
            }
          }
          .m-a{
            width:100%;
            margin-right: 0.5rem;
          }
          .hideAddress{
            position: absolute;
            top:2rem;
            z-index: 100;
            background:#fff;
            border-radius:0.2rem;
            padding: 0.5rem 1rem;
            box-shadow: 0px 0px 5px #ccc;
            width: 20rem;
            /deep/.distpicker-address-wrapper{
              font-size: 0.6rem;
              select{
                font-size: 0.6rem;
                padding: 0.2rem 0.5rem;
                width: 6rem;
                height: 1.5rem;
              }
            }
          }
        }
        &.remark{
          width: 100%;
        }
      }
    }
  }
  .submit{
    height:1.2rem;
    padding: 0.5rem 1rem 0.5rem 0rem;
    background: #ebeef5;
    display: flex;
    justify-content: flex-end;
    margin-top:1rem;
    p{
      font-size: 0.8rem;
      line-height: 1.5rem;
      .price{
        color:red;
        margin:0px 0.4rem;
      }
    }
    .submitBtn{
      .elButton();
      margin-left: 0.5rem;
    }
  }
}
</style>
