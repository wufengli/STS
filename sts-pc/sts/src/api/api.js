
function setCookie (name, value, day) {
  var oDate = new Date()
  oDate.setDate(oDate.getDate() + day)
  document.cookie = name + '=' + value + ';expires=' + oDate
}
function getCookie (name) {
  var arr = document.cookie.split('; ')
  for (var i = 0; i < arr.length; i++) {
    var arrName = arr[i].split('=')
    if (arrName[0] === name) {
      return arrName[1]
    }
  }
  return ''
}
function clearCookie (name) {
  this.setCookie(name, 1, -1)
}
function getParams (dataArray) {
  var array = []
  const data = dataArray
  for (var i = 0; i < data.length; i++) {
    data[i].transportType = data[i].transportType === '0' ? '冷藏品' : '普通运输'
    data[i].startArea = data[i].startArea + data[i].startAreaMx
    data[i].endArea = data[i].endArea + data[i].endAreaMx
    array.push(data[i])
  }
  return array
}
export default {setCookie, getCookie, clearCookie, getParams}
