import Layout from '@/views/layout/Layout'

const mallRouter = {
  path: '/mall',
  component: Layout,
  name: 'mall',
  meta: {
    title: 'mall',
    icon: 'table'
  },
  children: [
    {
      path: 'category',
      component: () => import('@/views/mall/categoryList'),
      name: 'category',
      meta: { title: 'category' }
    },
    {
      path: 'goods',
      component: () => import('@/views/mall/goodsList'),
      name: 'goods',
      meta: { title: 'goods' }
    },
    {
      path: 'goodsEdit/:id(\\d+)',
      component: () => import('@/views/mall/goodsEdit'),
      name: 'goodsEdit',
      meta: { title: 'goodsEdit', noCache: true },
      hidden: true
    },
    {
      path: 'coupon',
      component: () => import('@/views/mall/couponList'),
      name: 'coupon',
      meta: { title: 'coupon' }
    },
    {
      path: 'sellerAccount',
      component: () => import('@/views/mall/sellerAccountList'),
      name: 'sellerAccount',
      meta: { title: 'sellerAccount' }
    },
    {
      path: 'sellerOrder',
      component: () => import('@/views/mall/sellerOrderList'),
      name: 'sellerOrder',
      meta: { title: 'sellerOrder' }
    },
    {
      path: 'buyerAccount',
      component: () => import('@/views/mall/buyerAccountList'),
      name: 'buyerAccount',
      meta: { title: 'buyerAccount' }
    }
  ]
}
export default mallRouter
