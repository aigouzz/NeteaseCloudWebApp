import Axios from 'axios'
import Vue from 'vue'

let axios = Axios.create({
  timeout: 8000,
  withCredentials: true
})
// code状态码200判断
axios.interceptors.response.use((res) => {
  if (res.status === 654) { // 百度云请求超时检测
    Vue.toast('请求超时！')
  }
  if (res.data.code !== 200) {
    Vue.toast('数据返回有误')
    return Promise.reject(res)
  }
  return res.data
}, (error) => {
  console.log('promise error:' + error)
  return Promise.reject(error)
})
export default axios
