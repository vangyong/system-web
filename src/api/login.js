import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs'

const Base64 = require('js-base64').Base64

export function loginByUsername(username, password) {
  // const data = {
  //   username,
  //   password
  // }

  // return request({
  //   url: '/login/login',
  //   method: 'post',
  //   data
  // })

  const user = {
    'username': username,
    'password': password
  }
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Base64.encode('system:system') },
    data: qs.stringify(user),
    url: '/v1/sso-server/form/token'
  }
  return axios(options)
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

