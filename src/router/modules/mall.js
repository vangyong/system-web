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
      path: 'order',
      component: () => import('@/views/mall/orderList'),
      name: 'order',
      meta: { title: 'order' }
    }
  ]
}
export default mallRouter
