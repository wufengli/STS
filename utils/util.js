const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
    // biddinglist: [{
    //   bidTaskNum: "RW181221162007016",
    //   releaseTime: "2018-12-21 16:20:13",
    //   pickArea: "湖北省-天门市-天门市",
    //   deliverArea: "湖北省-天门市-天门市",
    //   taskType: "冷藏",
    //   serviceTime: "78",
    //   totalQuantity: "2",
    //   totalWeight: "33",
    //   totalVolume: "22",
    //   proposedPrice: "133",
    //   sealedDiskTime: "50"
    // }, {
    //   bidTaskNum: "RW181221162007015",
    //   releaseTime: "2018-12-21 16:20:13",
    //   pickArea: "湖北省-天门市-天门市",
    //   deliverArea: "湖北省-天门市-天门市",
    //   taskType: "冷藏",
    //   serviceTime: "78",
    //   totalQuantity: "2",
    //   totalWeight: "33",
    //   totalVolume: "22",
    //   proposedPrice: "133",
    //   sealedDiskTime: "4000"
    // }, {
    //   bidTaskNum: "RW181221162007015",
    //   releaseTime: "2018-12-21 16:20:13",
    //   pickArea: "湖北省-天门市-天门市",
    //   deliverArea: "湖北省-天门市-天门市",
    //   taskType: "冷藏",
    //   serviceTime: "78",
    //   totalQuantity: "2",
    //   totalWeight: "33",
    //   totalVolume: "22",
    //   proposedPrice: "133",
    //   sealedDiskTime: "4000"
    // }, {
    //   bidTaskNum: "RW181221162007015",
    //   releaseTime: "2018-12-21 16:20:13",
    //   pickArea: "湖北省-天门市-天门市",
    //   deliverArea: "湖北省-天门市-天门市",
    //   taskType: "冷藏",
    //   serviceTime: "78",
    //   totalQuantity: "2",
    //   totalWeight: "33",
    //   totalVolume: "22",
    //   proposedPrice: "133",
    //   sealedDiskTime: "4000"
    // }, {
    //   bidTaskNum: "RW181221162007015",
    //   releaseTime: "2018-12-21 16:20:13",
    //   pickArea: "湖北省-天门市-天门市",
    //   deliverArea: "湖北省-天门市-天门市",
    //   taskType: "冷藏",
    //   serviceTime: "78",
    //   totalQuantity: "2",
    //   totalWeight: "33",
    //   totalVolume: "22",
    //   proposedPrice: "133",
    //   sealedDiskTime: "4000"
    // }, {
    //   bidTaskNum: "RW181221162007015",
    //   releaseTime: "2018-12-21 16:20:13",
    //   pickArea: "湖北省-天门市-天门市",
    //   deliverArea: "湖北省-天门市-天门市",
    //   taskType: "冷藏",
    //   serviceTime: "78",
    //   totalQuantity: "2",
    //   totalWeight: "33",
    //   totalVolume: "22",
    //   proposedPrice: "133",
    //   sealedDiskTime: "4000"
    // }],
    // biddedlist: [{
    //   bidTaskNum: "RW181221162007017",
    //   releaseTime: "2018-12-21 16:20:13",
    //   pickArea: "湖北省-天门市-天门市",
    //   deliverArea: "湖北省-天门市-天门市",
    //   taskType: "冷藏",
    //   serviceTime: "78",
    //   totalQuantity: "2",
    //   totalWeight: "33",
    //   totalVolume: "22",
    //   proposedPrice: "133",
    //   quotedPrice: "124",
    //   sealedDiskTime: "50"
    // }, {
    //   bidTaskNum: "RW181221162007018",
    //   releaseTime: "2018-12-21 16:20:13",
    //   pickArea: "湖北省-天门市-天门市",
    //   deliverArea: "湖北省-天门市-天门市",
    //   taskType: "冷藏",
    //   serviceTime: "78",
    //   totalQuantity: "2",
    //   totalWeight: "33",
    //   totalVolume: "22",
    //   proposedPrice: "133",
    //   quotedPrice: "124",
    //   sealedDiskTime: "110"
    // }]
module.exports = {
  formatTime: formatTime
}
