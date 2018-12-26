// components/address/address.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    getId: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    phone: {
      type: String,
      value: ''
    },
    addressDetail: {
      type: String,
      value: ''
    },
    address: {
      type: String,
      value: '湖北省-武汉市-东西湖区'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    region: ['湖北省', '武汉市', '东西湖区']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindRegionChange: function(e) {
      this.setData({
        region: e.detail.value,
        address: e.detail.value.join('-')
      })
    },
    getName: function(e) {
      this.setData({
        name: e.detail.value
      })
    },
    getPhone: function(e) {
      this.setData({
        phone: e.detail.value
      })
    },
    getAddressDetail: function(e) {
      this.setData({
        addressDetail: e.detail.value
      })
    },
    saveAddress: function(e) {
      var that = this
      console.log(this.data)
      var address = {
        name: this.data.name,
        phone: this.data.phone,
        address: this.data.address,
        addressDetail: this.data.addressDetail,
        id: this.data.getId
      }
      this.triggerEvent('getAddress', address)
    }
  }
})