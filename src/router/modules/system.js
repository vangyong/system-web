import Layout from '@/views/layout/Layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/user',
  name: 'system',
  meta: {
    title: 'system',
    icon: 'table'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/system/userList'),
      name: 'user',
      meta: { title: 'user' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/roleList'),
      name: 'role',
      meta: { title: 'role' }
    },
    {
      path: 'resource',
      component: () => import('@/views/system/resourceList'),
      name: 'resource',
      meta: { title: 'resource' }
    },
    {
      path: 'tenant',
      component: () => import('@/views/system/tenantList'),
      name: 'tenant',
      meta: { title: 'tenant' }
    }
  ]
}
export default systemRouter
