import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
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

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function fetchGoodsList(query) {
  return request({
    url: '/v1/mall/goods/page',
    method: 'get',
    params: query
  })
}

export function fetchGoods(goodsId) {
  return request({
    url: '/v1/mall/goods/',
    method: 'get',
    params: { goodsId }
  })
}

export function createGoods(data) {
  return request({
    url: '/v1/mall/goods',
    method: 'post',
    data
  })
}

export function updateGoods(data) {
  return request({
    url: '/v1/mall/goods',
    method: 'put',
    data
  })
}

export function examineGoods(data) {
  return request({
    url: '/v1/mall/goods/examine',
    method: 'put',
    data
  })
}

export function deleteGoods(goodsId) {
  return request({
    url: '/v1/mall/goods/' + goodsId,
    method: 'delete',
    goodsId
  })
}

export function fetchSaleOrderList(query) {
  return request({
    url: '/v1/mall/sale/order/page',
    method: 'get',
    params: query
  })
}

export function fetchSaleOrder(id) {
  return request({
    url: '/v1/mall/sale/order/',
    method: 'get',
    params: { id }
  })
}

export function updateSaleOrder(data) {
  return request({
    url: '/v1/mall/sale/order',
    method: 'put',
    data
  })
}

export function examineSaleOrder(data) {
  return request({
    url: '/v1/mall/sale/order/examine',
    method: 'put',
    data
  })
}
