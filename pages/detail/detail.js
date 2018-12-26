Page({
  data: {
    id: '',
    detaillist: [{
      goodsType: "西药",
      startArea: "湖北省-天门市-天门市",
      endArea: "湖北省-天门市-天门市",
      transportType: "冷藏",
      receivingTime: "72",
      goodsCount: "2",
      weight: "10",
      volume: "20",
      remark: "易碎 干燥 贵重"
    }, {
      goodsType: "西药",
      startArea: "湖北省-天门市-天门市",
      endArea: "湖北省-天门市-天门市",
      transportType: "冷藏",
      receivingTime: "72",
      goodsCount: "2",
      weight: "10",
      volume: "20",
      remark: "易碎 干燥 贵重"
    }]
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '任务单详情'
    });
    this.setData({
      id: options.id
    })
    console.log(options.id)
  },
})