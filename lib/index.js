import axios from 'axios'

import isPlainObject from './isPlainObject'
import { param } from './param'

const instance = axios.create({
  timeout: 60 * 1000,
  withCredentials: true
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

export function request(config = {}) {
  const returnResponse = config.returnResponse

  const ret = instance(config).then(response => {
    const responseData = response.data || {}

    if (response.status === 200 && returnResponse) {
      return response.data
    }

    if (responseData.data === undefined) {
      responseData.data = true
    }

    if (responseData.success) {
      return returnResponse ? response : responseData.data
    } else {
      throw new Error(responseData.msg || '请求出错')
    }
  })

  return ret
}

// https://github.com/axios/axios/blob/master/lib/core/Axios.js
export function get(url, params = {}, config = {}) {
  return request(
    Object.assign(config, {
      method: 'get',
      url,
      params
    })
  )
}

export function post(url, data, config = {}) {
  if (isPlainObject(data)) {
    data = param(data)
  }

  return request(
    Object.assign(config, {
      method: 'post',
      url,
      data
    })
  )
}

export function postJson(url, data, config={}) {
  return request(Object.assign({
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }, config, {
    method: 'post',
    url,
    data
  }))
}

// 兼容之前的写法
export const jsonPost = postJson

export {
  axios,
  instance
}

export default request
