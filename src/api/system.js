import request from '@/utils/request'

export function fetchUserList(query) {
  return request({
    url: '/v1/system/user/page',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: '/v1/system/user/',
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
    url: '/v1/system/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/v1/system/user',
    method: 'put',
    data
  })
}

export function deleteUser(userId) {
  return request({
    url: '/v1/system/user/' + userId,
    method: 'delete',
    userId
  })
}

export function fetchTenantList(query) {
  return request({
    url: '/v1/system/tenant/page',
    method: 'get',
    params: query
  })
}

export function fetchTenant(id) {
  return request({
    url: '/v1/system/tenant/',
    method: 'get',
    params: { id }
  })
}

export function createTenant(data) {
  return request({
    url: '/v1/system/tenant',
    method: 'post',
    data
  })
}

export function updateTenant(data) {
  return request({
    url: '/v1/system/tenant',
    method: 'put',
    data
  })
}

export function examineTenant(data) {
  return request({
    url: '/v1/system/tenant/examine',
    method: 'put',
    data
  })
}

export function deleteTenant(tenantId) {
  return request({
    url: '/v1/system/tenant/' + tenantId,
    method: 'delete',
    tenantId
  })
}
