import request from '@/utils/request'

export function fetchCategoryList(query) {
  return request({
    url: '/v1/mall/category/page',
    method: 'get',
    params: query
  })
}

export function fetchCategory(categoryId) {
  return request({
    url: '/v1/mall/category',
    method: 'get',
    params: { categoryId }
  })
}

export function createCategory(data) {
  return request({
    url: '/v1/mall/category',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/v1/mall/category',
    method: 'put',
    data
  })
}

export function deleteCategory(couponId) {
  return request({
    url: '/v1/mall/category/' + couponId,
    method: 'delete',
    couponId
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

export function fetchCouponList(query) {
  return request({
    url: '/v1/mall/coupon/page',
    method: 'get',
    params: query
  })
}

export function fetchCoupon(goodsId) {
  return request({
    url: '/v1/mall/coupon/',
    method: 'get',
    params: { goodsId }
  })
}

export function createCoupon(data) {
  return request({
    url: '/v1/mall/coupon',
    method: 'post',
    data
  })
}

export function updateCoupon(data) {
  return request({
    url: '/v1/mall/coupon',
    method: 'put',
    data
  })
}

export function deleteCoupon(couponId) {
  return request({
    url: '/v1/mall/coupon/' + couponId,
    method: 'delete',
    couponId
  })
}

export function fetchSaleAccountList(query) {
  return request({
    url: '/v1/mall/sale/account/page',
    method: 'get',
    params: query
  })
}

export function fetchSaleAccount(id) {
  return request({
    url: '/v1/mall/sale/account/',
    method: 'get',
    params: { id }
  })
}

export function updateSaleAccount(data) {
  return request({
    url: '/v1/mall/sale/account',
    method: 'put',
    data
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

