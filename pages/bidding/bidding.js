Page({

  data: {
    hiddenmodalput: true,
    bidTaskNum: '',
    quotedPrice: '',
    placeholder: '请输入您的竞拍价',
    tabs: ["未竞价", "已竞价"],
    activeIndex: 0,
    biddinglist: [{
      bidTaskNum: "RW181221162007016",
      releaseTime: "2018-12-21 16:20:13",
      pickArea: "湖北省-天门市-天门市",
      deliverArea: "湖北省-天门市-天门市",
      taskType: "冷藏",
      serviceTime: "78",
      totalQuantity: "2",
      totalWeight: "33",
      totalVolume: "22",
      proposedPrice: "133",
      sealedDiskTime: "50"
    }, {
      bidTaskNum: "RW181221162007015",
      releaseTime: "2018-12-21 16:20:13",
      pickArea: "湖北省-天门市-天门市",
      deliverArea: "湖北省-天门市-天门市",
      taskType: "冷藏",
      serviceTime: "78",
      totalQuantity: "2",
      totalWeight: "33",
      totalVolume: "22",
      proposedPrice: "133",
      sealedDiskTime: "4000"
    }],
    biddedlist: [{
      bidTaskNum: "RW181221162007017",
      releaseTime: "2018-12-21 16:20:13",
      pickArea: "湖北省-天门市-天门市",
      deliverArea: "湖北省-天门市-天门市",
      taskType: "冷藏",
      serviceTime: "78",
      totalQuantity: "2",
      totalWeight: "33",
      totalVolume: "22",
      proposedPrice: "133",
      quotedPrice: "124",
      sealedDiskTime: "50"
    }, {
      bidTaskNum: "RW181221162007018",
      releaseTime: "2018-12-21 16:20:13",
      pickArea: "湖北省-天门市-天门市",
      deliverArea: "湖北省-天门市-天门市",
      taskType: "冷藏",
      serviceTime: "78",
      totalQuantity: "2",
      totalWeight: "33",
      totalVolume: "22",
      proposedPrice: "133",
      quotedPrice: "124",
      sealedDiskTime: "110"
    }]
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '竞价操作'
    })
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    })
    // 执行倒计时函数
    this.countDown();
  },
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  countDown() {
    this.data.biddinglist.forEach((o, index) => {
      if (typeof o.sealedDiskTime === 'object') {
        o.sealedDiskTime = parseInt(o.sealedDiskTime.sec) + parseInt(o.sealedDiskTime.min) * 60 + parseInt(o.sealedDiskTime.hou * 60 * 60);
        o.sealedDiskTime = o.sealedDiskTime - 1;
      } else {
        o.sealedDiskTime = parseInt(o.sealedDiskTime);
      }
      let time = o.sealedDiskTime;
      let obj = null;
      if (time >= 0) {
        let hou = Math.floor(time / 60 / 60 % 24);
        let min = Math.floor(time / 60 % 60);
        let sec = Math.floor(time % 60);
        obj = {
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {
        obj = {
          hou: '00',
          min: '00',
          sec: '00'
        }
        this.data.biddinglist.splice(index, 1);
      }
      o.sealedDiskTime = obj;
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      biddinglist: this.data.biddinglist
    })
    this.data.biddedlist.forEach((o, index) => {
      if (typeof o.sealedDiskTime === 'object') {
        o.sealedDiskTime = parseInt(o.sealedDiskTime.sec) + parseInt(o.sealedDiskTime.min) * 60 + parseInt(o.sealedDiskTime.hou * 60 * 60);
        o.sealedDiskTime = o.sealedDiskTime - 1;
      } else {
        o.sealedDiskTime = parseInt(o.sealedDiskTime);
      }
      let time = o.sealedDiskTime;
      let obj = null;
      if (time >= 0) {
        let hou = Math.floor(time / 60 / 60 % 24);
        let min = Math.floor(time / 60 % 60);
        let sec = Math.floor(time % 60);
        obj = {
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {
        obj = {
          hou: '00',
          min: '00',
          sec: '00'
        }
        this.data.biddedlist.splice(index, 1);
      }
      o.sealedDiskTime = obj;
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      biddedlist: this.data.biddedlist
    })
    setTimeout(this.countDown, 1000);
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  bidding: function(e) {
    this.setData({
      quotedPrice: '',
      hiddenmodalput: !this.data.hiddenmodalput,
      bidTaskNum: e.currentTarget.id
    })
  },
  //获取输入价格
  priceInput: function(e) {
    this.setData({
      quotedPrice: e.detail.value
    })
  },
  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    })
  },
  //确认  
  confirm: function(e) {
    if (parseInt(this.data.quotedPrice) > 0) {
      this.data.biddinglist.forEach((o, index) => {
        if (o.bidTaskNum === this.data.bidTaskNum) {
          this.data.biddinglist.splice(index, 1);
        }
      })
      this.setData({
        biddinglist: this.data.biddinglist,
        hiddenmodalput: true
      })
    } else {
      this.setData({
        placeholder: '竞拍价格式不正确',
        quotedPrice: ''
      })
    }
  }
})