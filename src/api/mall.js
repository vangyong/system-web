import request from '@/utils/request'

export function fetchCategoryPage(query) {
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

export function fetchGoodsPage(query) {
  return request({
    url: '/v1/mall/goods/page',
    method: 'get',
    params: query
  })
}

export function fetchGoods(goodsId) {
  return request({
    url: '/v1/mall/goods/' + goodsId,
    method: 'get'
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

export function fetchGoodsDetail(goodsId) {
  return request({
    url: '/v1/mall/goods/detail/' + goodsId,
    method: 'get'
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

export function fetchSellerAccountList(query) {
  return request({
    url: '/v1/mall/seller/account/page',
    method: 'get',
    params: query
  })
}

export function fetchSellerAccount(id) {
  return request({
    url: '/v1/mall/seller/account/',
    method: 'get',
    params: { id }
  })
}

export function updateSellerAccount(data) {
  return request({
    url: '/v1/mall/seller/account',
    method: 'put',
    data
  })
}

export function fetchSellerOrderList(query) {
  return request({
    url: '/v1/mall/order/seller/page',
    method: 'get',
    params: query
  })
}

// export function fetchSellerOrder(id) {
//   return request({
//     url: '/v1/mall/order/',
//     method: 'get',
//     params: { id }
//   })
// }

export function updateSellerOrder(data) {
  return request({
    url: '/v1/mall/order',
    method: 'put',
    data
  })
}

export function fetchBuyerAccountList(query) {
  return request({
    url: '/v1/mall/buyer/account/page',
    method: 'get',
    params: query
  })
}

export function fetchBuyerAccount(id) {
  return request({
    url: '/v1/mall/buyer/account/',
    method: 'get',
    params: { id }
  })
}

export function updateBuyerAccount(data) {
  return request({
    url: '/v1/mall/buyer/account',
    method: 'put',
    data
  })
}
