import axios from 'axios'
// 请求时提示
import {Loading} from 'element-ui'
let loadingCount = 0
let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

const endLoading = () => {
  loading.close()
}
const showLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount += 1
}

const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}

axios.defaults.timeout = 5000
axios.defaults.baseURL = ''

/* 请求之前的操作 */
axios.interceptors.request.use(
  config => {
    showLoading()
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/* 请求之后的操作 */
axios.interceptors.response.use((res) => {
  hideLoading()
  return res
}, (err) => {
  hideLoading()
  return Promise.reject(err)
})

/* axios get请求 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
