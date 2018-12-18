// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
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
const orderData = function() {
    let order = [];
    for (let i = 0; i < 100; i++) {
        let newOrderObject = {
          orderId: Random.string(2, 10),
          userId:"1",
          phoneNumConsignor:"1785426812",
          consignor:Random.cname(),
          consignee:Random.cname(),
          phoneNumConsignee:"15611223333",
          startArea:Random.region(),
          startAreaMx:Random.region(),
          endArea:Random.region(),
          endAreaMx:Random.region(),
          goodsType:"药品",
          goodsCount:Random.natural(1, 10),
          volume:Random.natural(1, 10),
          weight:Random.natural(1, 10),
          deliveryTime:Random.date(),
          receivingTime:"三天内",
          transportPrices:Random.natural(1, 10),
          status:"刚生成",
          createdTime:Random.date(),
          updatedTime:Random.date(),
          remark:"尽量提前到",
          transportType:"普通运输",
          orderNum:Random.string( 'upper', 15 ),
          signatureType:"无返单"
        }
        order.push(newOrderObject)
    }
    return {
        order: order
    }
}
Mock.mock(/\/api\/order\/findByConPage(|\?\S*)$/, 'get', (options) => {
  var orderList = orderData().order
  var params =  GetRequest(options.url)
  var pageSize = parseInt(params.pageSize)
  var currentPage = parseInt(params.pageCode)
  var i = currentPage * pageSize - pageSize
  var n = i + pageSize 
  if(n > orderList.length){
    n = orderList.length
  } 
  var data = []
  for (i; i < n ; i++ ){
      data.push(orderList[i])
  }
  var order = {
    rows : data,
    total : orderList.length
  }
  return Mock.mock(order)
})



//删除订单
const orderDelet = function() {
    let Delet = { message:"删除成功" };
    return {
        status: true,
        Delet: Delet
    }
}
Mock.mock('/api/delet', 'post', orderDelet)

// 获取将要打包的订单
const orderList = function() {
    let rows = [];
    for (let i = 0; i < 15; i++) {
        let newOrderObject = {
          orderId: Random.natural(1, 800),
          userId:"1",
          phoneNumConsignor:"1785426812",
          consignor:Random.cname(),
          consignee:Random.cname(),
          phoneNumConsignee:"15611223333",
          startArea:"湖北省武汉市东西湖区田园大道九州通物流有限公司",
          startAreaMx:Random.region(),
          endArea:Random.region(),
          endAreaMx:Random.region(),
          goodsType:"药品",
          goodsCount:Random.natural(1, 999),
          volume:Random.natural(1, 999),
          weight:Random.natural(1, 999),
          deliveryTime:Random.date(),
          receivingTime:"三天内",
          transportPrices:Random.natural(1, 10),
          status:"0",
          createdTime:Random.date(),
          updatedTime:Random.date(),
          remark:"尽量提前到",
          transportType:"普通运输",
          orderNum:Random.string( 'upper', 10 ),
          signatureType:"无返单"
        }
        rows.push(newOrderObject)
    }
    return {
        rows: rows,
        total: rows.length
    }
}
Mock.mock('/api/orderHandler/findOrders', 'post', orderList)

//获取任务单列表

const packData = function() {
    let rows = [];
    let orderList = [];
    for (let i = 0; i < 4; i++) {
      let order = {
        orderId: Random.natural(1, 800),
        userId:"1",
        phoneNumConsignor:"1785426812",
        consignor:Random.cname(),
        consignee:Random.cname(),
        phoneNumConsignee:"15611223333",
        startArea:Random.region(),
        startAreaMx:Random.region(),
        endArea:Random.region(),
        endAreaMx:Random.region(),
        goodsType:"药品",
        goodsCount:Random.natural(1, 999),
        volume:Random.natural(1, 999),
        weight:Random.natural(1, 999),
        deliveryTime:Random.date(),
        receivingTime:"三天内",
        transportPrices:Random.natural(1, 10),
        status:"0",
        createdTime:Random.date(),
        updatedTime:Random.date(),
        remark:"尽量提前到",
        transportType:"普通运输",
        orderNum:Random.string( 'upper', 10 ),
        signatureType:"无返单"
      }
      orderList.push(order)
    }
    for (let i = 0; i < 8; i++) {
        let newOrderObject = {
          bidTaskNum: Random.natural(1, 800),
          transportType:"普通运输",
          totalQuantity: Random.natural(1, 999),
          totalVolume: Random.natural(1, 999),
          totalWeight: Random.natural(1, 999),
          serviceTime: Random.date(),
          pickArea: "湖北省武汉市东西湖区",
          deliverArea: "湖北省武汉市东西湖区",
          orderList: orderList
        }
        rows.push(newOrderObject)
    }
    return {
        rows: rows,
        total: rows.length
    }
}
Mock.mock(/\/api\/orderHandler\/findTask(|\?\S*)$/, 'get', packData)


//计算价格接口
const Price = function() {
    return {
      price:1111111
    }
}
Mock.mock('/api/price/getPrice', 'post', Price)