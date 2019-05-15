import Layout from '@/views/layout/Layout'

const mallRouter = {
  path: '/mall',
  component: Layout,
  redirect: '/mall/complex-table',
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
      meta: { title: 'goods' },
      children: [
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/mall/goodsEdit'),
          name: 'EditGoods',
          meta: { title: 'editGoods', noCache: true },
          hidden: true
        }
      ]
    },
    {
      path: 'product',
      component: () => import('@/views/mall/productList'),
      name: 'product',
      meta: { title: 'product' }
    },
    {
      path: 'coupon',
      component: () => import('@/views/mall/couponList'),
      name: 'coupon',
      meta: { title: 'coupon' }
    },
    {
      path: 'saleAccount',
      component: () => import('@/views/mall/saleAccountList'),
      name: 'saleAccount',
      meta: { title: 'saleAccount' }
    },
    {
      path: 'saleOrder',
      component: () => import('@/views/mall/saleOrderList'),
      name: 'saleOrder',
      meta: { title: 'saleOrder' }
    },
    {
      path: 'buyAccount',
      component: () => import('@/views/mall/buyAccountList'),
      name: 'buyAccount',
      meta: { title: 'buyAccount' }
    }
  ]
}
export default mallRouter
