Page({
  data: {
    biddingpageSize: 2,
    biddingtotal: '',
    biddedpageSize: 2,
    biddedtotal: '',
    total: '',
    pick: '',
    deliver: '',
    // userId为默认值wbcys001
    userId: 'u0006',
    hiddenmodalput: true,
    bidTaskId: '',
    quotedPrice: '',
    placeholder: '请输入您的竞拍价',
    tabs: ["未竞价", "已竞价"],
    activeIndex: 0,
    biddedlist: [],
    biddinglist: []
  },
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    })
    // 获取未竞价数据
    this.ajaxBidding();
    // 获取已竞价数据
    this.ajaxBidded();
    // 执行倒计时函数
    this.countDown();
  },
  // 格式化倒计时数据格式
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  // 倒计时函数
  countDown() {
    this.timeCount(this.data.biddinglist)
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      biddinglist: this.data.biddinglist
    })
    this.timeCount(this.data.biddedlist)
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      biddedlist: this.data.biddedlist
    })
    setTimeout(this.countDown, 1000);
  },
  // 计时列表渲染
  timeCount(e) {
    e.forEach((o, index) => {
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
        e.splice(index, 1);
      }
      o.sealedDiskTime = obj;
    })
  },
  // search
  searchInput(e) { 
    this.setData({
      pick: e.detail.value
    })
    if (parseInt(this.data.activeIndex) === 0) {
      this.setData({
        biddingpageSize: 2
      })
      this.ajaxBidding();
    } else {
      this.setData({
        biddedpageSize: 2
      })
      this.ajaxBidded();
    }
  },
  clearInput(e) { 
    this.setData({
      pick: ''
    })
  },
  // 切换tab
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  // 竞价
  bidding: function(e) {
    this.setData({
      quotedPrice: '',
      hiddenmodalput: !this.data.hiddenmodalput,
      bidTaskId: e.currentTarget.id
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
    let that = this;
    if (parseInt(this.data.quotedPrice) > 0) {
      wx.request({
        url: 'http://10.2.65.73:8080/STS/auctionTask/auctionPrice',
        method: 'post',
        data: {
          userId: that.data.userId,
          bidTaskId: that.data.bidTaskId,
          quotedPrice: that.data.quotedPrice
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res) {
            that.data.biddinglist.forEach((o, index) => {
              if (o.bidTaskId === that.data.bidTaskId) {
                that.data.biddinglist.splice(index, 1);
              }
            })
            that.setData({
              biddinglist: that.data.biddinglist,
              hiddenmodalput: true
            })
          }
        }
      })
    } else {
      this.setData({
        placeholder: '竞拍价格式不正确',
        quotedPrice: ''
      })
    }
  },
  // ajax未竞价任务单数据
  ajaxBidding() {
    let that = this;
    wx.request({
      url: 'http://10.2.65.73:8080/STS/auctionTask/currentTask',
      method: 'get',
      data: {
        userId: that.data.userId,
        pageSize: that.data.biddingpageSize,
        pickArea: that.data.pick,
        deliverArea: that.data.deliver
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          biddinglist: res.data.rows,
          biddingtotal: res.data.total
        })
      }
    })
  },
  // ajax竞价任务单数据
  ajaxBidded() {
    let that = this;
    wx.request({
      url: 'http://10.2.65.73:8080/STS/auctionTask/findBidded',
      method: 'get',
      data: {
        userId: that.data.userId,
        pageSize: that.data.biddedpageSize,
        pickArea: that.data.pick,
        deliverArea: that.data.deliver
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) { 
        that.setData({
          biddedlist: res.data.rows,
          biddedtotal: res.data.total
        })
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    if (parseInt(this.data.activeIndex) === 0) {
      this.setData({
        biddingpageSize: 2
      })
      this.ajaxBidding();
    } else {
      this.setData({
        biddedpageSize: 2
      })
      this.ajaxBidded();
    }
    wx.stopPullDownRefresh();
  },
  // 上拉加载
  onReachBottom() {
    if (this.data.activeIndex === 0) {
      if (this.data.biddingpageSize < this.data.biddingtotal) {
        let page = this.data.biddingpageSize + 2;
        this.setData({
          biddingpageSize: page
        })
        this.ajaxBidding();
      }
    } else {
      if (this.data.biddedpageSize < this.data.biddedtotal) {
        let pages = this.data.biddedpageSize + 2;
        this.setData({
          biddedpageSize: pages
        })
        this.ajaxBidded();        
      }
    }
  }
})