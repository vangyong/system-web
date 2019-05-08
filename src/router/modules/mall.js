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
      path: 'goods',
      component: () => import('@/views/mall/goodsList'),
      name: 'goods',
      meta: { title: 'goods' }
    },
    {
      path: 'member',
      component: () => import('@/views/mall/memberList'),
      name: 'member',
      meta: { title: 'member' }
    },
    {
      path: 'product',
      component: () => import('@/views/mall/productList'),
      name: 'product',
      meta: { title: 'product' }
    },
    {
      path: 'saleOrder',
      component: () => import('@/views/mall/saleOrderList'),
      name: 'saleOrder',
      meta: { title: 'saleOrder' }
    }
  ]
}
export default mallRouter
