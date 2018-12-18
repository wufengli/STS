// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
Mock.setup({
    timeout: 800
})
// mock一组数据
function GetRequest(localurl) {
  let url = localurl
  let theRequest = new Object()
  if (url.indexOf("?") != -1) {
    let str = url.split("?")[1]
    strs = str.split("&")
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
    }
  }
  return theRequest
}
// 日期格式
function getNowFormatDate() {
    let date = new Date().getTime() - Random.natural(7000000, 7100000)
    date = new Date(date)
    let seperator1 = "-"
    let seperator2 = ":"
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    let strHour = date.getHours()
    let strMinutes = date.getMinutes()
    let strSeconds = date.getSeconds()
    if (month >= 1 && month <= 9) {
        month = "0" + month
    }
    if (strHour >= 0 && strHour <= 9) {
        strHour = "0" + strHour
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
      strMinutes = "0" + strMinutes
    }
    if (strSeconds >= 0 && strSeconds <= 9) {
        strSeconds = "0" + strSeconds
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + strHour + seperator2 + strMinutes
        + seperator2 + strSeconds
    return currentdate
}
// 生成数据
let rows = []
for (let i = 0; i < 100; i++) {
    let newBidding = {
        bidTaskId: Random.string( 'upper', 2 ) + Random.string( 'number', 13 ),
        releaseTime: Random.now(),
        pickArea: Random.county(true),
        deliverArea: Random.county(true),
        taskType: Random.natural(0, 1),
        serviceTime: Random.natural(72, 100),
        totalQuantity: Random.natural(1, 10),
        totalWeight: Random.natural(5, 200),
        totalVolume: Random.natural(5, 200),
        proposedPrice: Random.natural(5, 200)
   }
   newBidding.taskType = String(newBidding.taskType)
   newBidding.releaseTime = getNowFormatDate()
   rows.push(newBidding)
}
// 排序
rows.sort(function(a,b){
  return new Date(a.releaseTime).getTime() - new Date(b.releaseTime).getTime()
})
const produceBiddingData = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.userId)
    return {
      rows: rows.slice((parm.pageCode - 1) * 10, parm.pageCode * 10),
      total: rows.length
    }
}
Mock.mock(/\/api\/auctionTask\/currentTask(|\?\S*)$/, 'get', produceBiddingData)
let rowss = []
for (let i = 0; i < 100; i++) {
    let newBidded = {
        bidTaskId: Random.string( 'upper', 2 ) + Random.string( 'number', 13 ),
        releaseTime: Random.now(),
        pickArea: Random.county(true),
        deliverArea: Random.county(true),
        taskType: Random.natural(0, 1),
        serviceTime: Random.natural(72, 100),
        totalQuantity: Random.natural(1, 10),
        totalWeight: Random.natural(5, 200),
        totalVolume: Random.natural(5, 200),
        proposedPrice: Random.natural(5, 200),
        quotedPrice: Random.natural(5, 200)
   }
   newBidded.taskType = String(newBidded.taskType)
   newBidded.releaseTime = getNowFormatDate()
   rowss.push(newBidded)
}
rowss.sort(function(a,b){
  return new Date(a.releaseTime).getTime() - new Date(b.releaseTime).getTime()
})
const produceBiddedData = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.userId)
    return {
      rows: rowss.slice((parm.pageCode - 1) * 10, parm.pageCode * 10),
      total: rowss.length
    }
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(/\/api\/auctionTask\/findBidded(|\?\S*)$/, 'get', produceBiddedData)
let rowsss = []
for (let i = 0; i < 5; i++) {
    let newDetail = {
        goodsType: Random.cword(3, 7),
        startArea: Random.county(true),
        endArea: Random.county(true),
        transportType: Random.natural(0, 1),
        receivingTime: Random.natural(5, 150),
        goodsCount: Random.natural(1, 5),
        weight: Random.natural(5, 150),
        volume: Random.natural(5, 150),
        remark: Random.cword(7, 15)
   }
   newDetail.transportType = String(newDetail.transportType)
   rowsss.push(newDetail)
}
const produceDetail = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.bidTaskId)
    return rowsss
}
Mock.mock(/\/api\/auctionTask\/getTaskDetails(|\?\S*)$/, 'get', produceDetail)
let success = []
for (let i = 0; i < 100; i++) {
    let successBidded = {
        bidTaskId: Random.string( 'upper', 2 ) + Random.string( 'number', 13 ),
        releaseTime: Random.now(),
        pickArea: Random.county(true),
        deliverArea: Random.county(true),
        taskType: Random.natural(0, 1),
        serviceTime: Random.natural(72, 100),
        totalQuantity: Random.natural(1, 10),
        totalWeight: Random.natural(5, 200),
        totalVolume: Random.natural(5, 200),
        proposedPrice: Random.natural(5, 200),
        transactionPrice: Random.natural(5, 200),
        bidStatus: Random.natural(1, 2)
   }
   if (successBidded.bidStatus === 1) {
      successBidded.bidStatus = 5
   }
   successBidded.bidStatus = String(successBidded.bidStatus)
   successBidded.taskType = String(successBidded.taskType)
   successBidded.releaseTime = getNowFormatDate()
   success.push(successBidded)
}
success.sort(function(a,b){
  return new Date(a.releaseTime).getTime() - new Date(b.releaseTime).getTime()
})
const produceSuccessData = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.userId)
    return {
      rows: success.slice((parm.pageCode - 1) * 10, parm.pageCode * 10),
      total: success.length
    }
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(/\/api\/auctionTask\/findSuccessByPage(|\?\S*)$/, 'get', produceSuccessData)

let history = []
for (let i = 0; i < 100; i++) {
    let historyBidded = {
        bidTaskId: Random.string( 'upper', 2 ) + Random.string( 'number', 13 ),
        releaseTime: Random.now(),
        pickArea: Random.county(true),
        deliverArea: Random.county(true),
        taskType: Random.natural(0, 1),
        serviceTime: Random.natural(72, 100),
        totalQuantity: Random.natural(1, 10),
        totalWeight: Random.natural(5, 200),
        totalVolume: Random.natural(5, 200),
        proposedPrice: Random.natural(5, 200),
        transactionPrice: Random.natural(5, 200),
        bidStatus: Random.natural(3, 4)
   }
   if (historyBidded.bidStatus === 3) {
      historyBidded.bidStatus = -1
   }
   historyBidded.bidStatus = String(historyBidded.bidStatus)
   historyBidded.taskType = String(historyBidded.taskType)
   historyBidded.releaseTime = getNowFormatDate()
   history.push(historyBidded)
}
history.sort(function(a,b){
  return new Date(a.releaseTime).getTime() - new Date(b.releaseTime).getTime()
})
const producehistoryData = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.userId)
    return {
      rows: history.slice((parm.pageCode - 1) * 10, parm.pageCode * 10),
      total: history.length
    }
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(/\/api\/auctionTask\/findHistoryByPage(|\?\S*)$/, 'get', producehistoryData)
let result = []
for (let i = 0; i < 5; i++) {
    let resultDetail = {
        orderId:Random.string('upper', 1) + Random.string('number', 8),
        goodsType: Random.cword(3, 7),
        consignor: Random.cword(3, 4),
        phoneNumConsignor: Random.string('number', 11, 11),
        phoneNumConsignee: Random.string('number', 11, 11),
        startArea: Random.county(true),
        consignee: Random.cword(3, 4),
        endArea: Random.county(true),
        transportType: Random.natural(0, 1),
        receivingTime: Random.natural(5, 150),
        goodsCount: Random.natural(1, 5),
        weight: Random.natural(5, 150),
        volume: Random.natural(5, 150),
        remark: Random.cword(7, 15)
   }
   resultDetail.transportType = String(resultDetail.transportType)
   result.push(resultDetail)
}
const produceResult = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.bidTaskId)
    return result
}
Mock.mock(/\/api\/auctionTask\/getResultDetails(|\?\S*)$/, 'get', produceResult)

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(/\/api\/auctionTask\/findHistoryByPage(|\?\S*)$/, 'get', producehistoryData)
let task = []
for (let i = 0; i < 100; i++) {
    let taskDetail = {
        bidTaskId: Random.string( 'upper', 2 ) + Random.string( 'number', 13 ),
        releaseTime: Random.now(),
        pickArea: Random.county(true),
        deliverArea: Random.county(true),
        taskType: Random.natural(0, 1),
        serviceTime: Random.natural(72, 100),
        totalQuantity: Random.natural(1, 10),
        totalWeight: Random.natural(5, 200),
        totalVolume: Random.natural(5, 200),
        proposedPrice: Random.natural(5, 200),
        transactionPrice: Random.natural(5, 200),
        bidStatus: Random.natural(0, 4),
        userId: Random.cword(5, 15)
   }
   taskDetail.taskType = String(taskDetail.taskType)
   if (taskDetail.bidStatus === 3) {
     taskDetail.bidStatus = 5
   }
   taskDetail.bidStatus = String(taskDetail.bidStatus)
   task.push(taskDetail)
}
const produceTask = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.userId)
    return {
      rows: task.slice((parm.pageCode - 1) * 10, parm.pageCode * 10),
      total: task.length
    }
}
Mock.mock(/\/api\/auctionTask\/biddeTask(|\?\S*)$/, 'get', produceTask)
const produceTasks = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.userId)
    return task
}
Mock.mock(/\/api\/auctionTask\/biddeTasks(|\?\S*)$/, 'get', produceTasks)

let taskd = []
for (let i = 0; i < 5; i++) {
    let taskdDetail = {
        price: Random.natural(5, 150),
        company: Random.cword(5, 15)
   }
   taskdDetail.transportType = String(taskdDetail.transportType)
   taskd.push(taskdDetail)
}
const producetaskd = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.bidTaskId)
    return {
      task: taskd,
      price: Random.natural(5, 150),
      company: Random.cword(5, 15)
    }
}
Mock.mock(/\/api\/auctionTask\/findBiddingDetail(|\?\S*)$/, 'get', producetaskd)

let order = []
for (let i = 0; i < 8; i++) {
    let orderDetail = {
        price: Random.natural(5, 150),
        userId: Random.cword(5, 15)
   }
   order.push(orderDetail)
}

const produceorder = function(options) {
    const parm = GetRequest(options.url)
    console.log(parm.bidTaskId)
    return order
}
Mock.mock(/\/api\/auctionTask\/order(|\?\S*)$/, 'get', produceorder)