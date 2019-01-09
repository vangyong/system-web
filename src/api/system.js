import request from '@/utils/request'

export function fetchUserList(query) {
  return request({
    url: '/v1/users/page',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: '/v1/users/',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createUser(data) {
  return request({
    url: '/v1/users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/v1/users',
    method: 'post',
    data
  })
}

export function deleteUser(userId) {
  return request({
    url: '/v1/users/' + userId,
    method: 'delete',
    userId
  })
}
