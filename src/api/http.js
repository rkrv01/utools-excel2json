/**http请求封装 */
import axios from 'axios'
let timeout = 60000

const instance = axios.create({
  timeout,
})

function geterrroMsg(status, ohter) {
  let errMsg = ''
  const statusMsg = {
    400: '请求语法有问题，服务器无法识别',
    401: '客户端未授权该请求。缺乏有效的身份认证凭证',
    403: '服务器拒绝响应。权限不足',
    404: 'URL无效或者URL有效但是没有资源',
    405: '请求行中指定的请求方法不能被用于请求相应的资源',
    415: '服务器无法处理请求附带的媒体格式',
    500: '因为意外情况，服务器不能完成请求',
    501: '服务器不支持请求的工具',
    502: '服务器接收到来自上游服务器的无效响应',
    503: '由于临时过载或维护，服务器无法处理请求',
  }

  errMsg = statusMsg[status] || ohter

  return `错误 ${status} : ${errMsg}`
}

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    config.headers.ContentType = 'application/json'
    // const token = getToken();
    // config.headers["X-Authorization"] = "bearer " + token;
    return config
  },
  function (error) {
    // 对请求错误做些什么
    console.error('请求错误')
    return Promise.reject(error)
  }
)

// 添加响应拦截器;
instance.interceptors.response.use(
  (res) => {
    // 对响应数据做点什么
    const data = res.data
    return Promise.resolve(data)
    // const { code, flag, message } = data
    // if (!flag) {
    //   const errMsg = `错误 ${code} : ${message}`
    //   return Promise.reject(errMsg)
    // } else {
    //   return Promise.resolve(data)
    // }
  },
  (error) => {
    const { response } = error
    // 对响应错误做点什么
    let errMsg = error
    if (response) {
      errMsg = geterrroMsg(response.status, error)
    }
    return Promise.reject(errMsg)
  }
)
export default instance
