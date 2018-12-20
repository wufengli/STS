//index.js
//获取应用实例
const app = getApp()

Page({
  // 参与页面渲染
  data: {},
  //事件处理函数
  handleToBidding: function () {
    wx.navigateTo({
      url: '../bidding/bidding',
      success: function (res) {
        console.log('bidding success')
      }
    })
  },
  // 启动时触发
  onLoad: function () {},
})
