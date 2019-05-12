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

export function fetchRoleList(query) {
  return request({
    url: '/v1/system/role/page',
    method: 'get',
    params: query
  })
}

export function fetchRole(id) {
  return request({
    url: '/v1/system/role/',
    method: 'get',
    params: { id }
  })
}

export function createRole(data) {
  return request({
    url: '/v1/system/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/v1/system/role',
    method: 'put',
    data
  })
}

export function deleteRole(roleId) {
  return request({
    url: '/v1/system/role/' + roleId,
    method: 'delete',
    roleId
  })
}

export function fetchResourceList(query) {
  return request({
    url: '/v1/system/resource/page',
    method: 'get',
    params: query
  })
}

export function fetchResource(id) {
  return request({
    url: '/v1/system/resource/',
    method: 'get',
    params: { id }
  })
}

export function createResource(data) {
  return request({
    url: '/v1/system/resource',
    method: 'post',
    data
  })
}

export function updateResource(data) {
  return request({
    url: '/v1/system/resource',
    method: 'put',
    data
  })
}

export function deleteResource(roleId) {
  return request({
    url: '/v1/system/resource/' + roleId,
    method: 'delete',
    roleId
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
