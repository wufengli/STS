// pages/order/order.js
import WxValidate from '../../utils/WxValidate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      goodsType: '0',
      deliveryTime: '',
      remark: '',
      receivingTime: '0',
      transportPrices: 0,
      transportType: '0',
      signatureType: '0',
      userId: ''
    },
    goodsType: [{
        value: '0',
        name: '中药'
      },
      {
        value: '1',
        name: '西药'
      }, {
        value: '2',
        name: '器械'
      }, {
        value: '3',
        name: '生活用品'
      }
    ],
    transportType: [{
        value: '1',
        label: '普通运输'
      },
      {
        value: '0',
        label: '冷藏车'
      }
    ],
    signatureType: [{
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
      }
    ],
    receivingTime: [{
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
      }
    ],
    name: null,
    phone: null,
    addressDetail: null,
    address: "湖北省-武汉市-东西湖区",
    indexOne: 0,
    indexTwo: 0,
    indexSign: 0,
    indexReceive: 0,
    date: "请选择",
    flagOne: true,
    flagTwo: true,
    show: true,
    getId: null
  },
  bindPickerChange(e) {
    var index = e.detail.value
    this.setData({
      indexOne: e.detail.value,
      'Order.goodsType': this.data.goodsType[index].value
    })
  },
  bindPickerChangeTwo(e) {
    var index = e.detail.value
    this.setData({
      indexTwo: e.detail.value,
      'Order.transportType': this.data.transportType[index].value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value,
      'Order.deliveryTime': e.detail.value
    })
  },
  bindPickerChangeSign: function(e) {
    var index = e.detail.value
    this.setData({
      indexSign: e.detail.value,
      'Order.signatureType': this.data.signatureType[index].value
    })
  },
  bindPickerChangeReceive: function(e) {
    var index = e.detail.value
    this.setData({
      indexReceive: e.detail.value,
      'Order.receivingTime': this.data.receivingTime[index].value
    })
  },
  bindTextAreaBlur: function(e) {
    this.setData({
      'Order.remark': e.detail.value
    })
  },
  addAddress: function(event) {
    wx.setNavigationBarTitle({
      display: 'none'
    })
    console.log(this.data)
    if (this.data.getId != event.currentTarget.id) {
      console.log('a')
      this.setData({
        name: '',
        phone: '',
        addressDetail: '',
        address: ''
      })
    }
    this.setData({
      show: false,
      getId: event.currentTarget.id
    })
  },
  handleGetAddress: function(e) {
    this.setData({
      show: true
    })
    console.log(e.detail)
    var data = e.detail
    if (data.id == "send") {
      this.setData({
        'Order.consignor': data.name,
        'Order.phoneNumConsignor': data.phone,
        'Order.startArea': data.address,
        'Order.startAreaMx': data.addressDetail,
        flagOne: false
      })
    } else {
      this.setData({
        'Order.consignee': data.name,
        'Order.phoneNumConsignee': data.phone,
        'Order.endArea': data.address,
        'Order.endAreaMx': data.addressDetail,
        flagTwo: false
      })
    }
  },
  getWeight: function(e) {
    this.setData({
      'Order.weight': e.detail.value
    })
  },
  getVolume: function(e) {
    this.setData({
      'Order.volume': e.detail.value
    })
  },
  getCount: function(e) {
    this.setData({
      'Order.goodsCount': e.detail.value
    })
  },

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  bindSubmit: function() {
    console.log(this.data.Order)
    const params = this.data.Order
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    // wx.request({
    //   url: 'http://10.2.65.77:8080/STS/price/getPrice',
    //   data: this.data.Order,
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json;charset=UTF-8'
    //   },// 设置请求的 header
    //   success: function (res) {
    //     if (res.statusCode == 200) {

    //     } else {
    //       console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
    //     }
    //   },
    //   fail: function () {
    //     console.log("index.js wx.request CheckCallUser fail");
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '下单界面'
    })
    this.initValidate()
  },
  initValidate() {
    const rules = {
      consignor: {
        required: true
      },
      phoneNumConsignor: {
        required: true,
        tel: true
      },
      startArea: {
        required: true
      },
      startAreaMx: {
        required: true
      },
      consignee: {
        required: true
      },
      phoneNumConsignee: {
        required: true,
        tel: true
      },
      endArea: {
        required: true
      },
      endAreaMx: {
        required: true
      },
      weight: {
        required: true
      },
      volume: {
        required: true
      },
      goodsCount: {
        required: true
      }
    }
    const messages = {
      consignor: {
        required: '请输入寄件人'
      },
      phoneNumConsignor: {
        required: '请输入联系方式',
        tel: '号码格式不正确'
      },
      startArea: {
        required: '请输入寄件地址'
      },
      startAreaMx: {
        required: '请输入寄件地址'
      },
      consignee: {
        required: '请输入收件人'
      },
      phoneNumConsignee: {
        required: '请输入联系方式',
        tel: '号码格式不正确'
      },
      endArea: {
        required: '请输入地址'
      },
      endAreaMx: {
        required: '请输入详细地址'
      },
      weight: {
        required: '请输入重量'
      },
      volume: {
        required: '请输入体积'
      },
      goodsCount: {
        required: '请输入件数'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  }
})