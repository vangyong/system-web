import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs'

const Base64 = require('js-base64').Base64
const jwt = require('jsonwebtoken')

export function loginByUsername(username, password) {
  const user = {
    'username': username,
    'password': password
  }
  const options = {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Base64.encode('system:system')
    },
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
  const decodedComlete = jwt.decode(token, { complete: true })
  const username = decodedComlete.payload.user_name
  return request({
    url: '/v1/sso-server/user/name/' + username,
    method: 'get',
    headers: {
      'Authorization': 'bearer ' + token
    }
  })
}

