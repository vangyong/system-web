import request from '@/utils/request'
import axios from 'axios'

const Base64 = require('js-base64').Base64

export function loginByUsername(username, password) {
  // const data = {
  //   username,
  //   password
  // }

  // let formData = new FormData()
  // formData.append('username', username)
  // formData.append('password', password)

  // return request({
  //   url: '/login/login',
  //   method: 'post',
  //   data
  // })
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Base64.encode('system:system')
    }
  }

  const form = new FormData()
  form.append('username', username)
  form.append('password', password)
  const param = new URLSearchParams(form)

  return axios.post('/v1/sso-server/form/token', param, config)
    .then(res => res.data)

  // return axios.post('/v1/sso-server/form/token?' + encodeURIComponent('username') + '=' + encodeURIComponent(username) + '&' + encodeURIComponent('password') + '=' + encodeURIComponent(password), config)

  // return request({
  //   url: '/v1/sso-server/form/token',
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     'Authorization': 'Basic ' + Base64.encode('system:system')
  //   },
  //   formData
  // })
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

