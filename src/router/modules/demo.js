import Layout from '@/views/layout/Layout'

const demoRouter = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/complex-table',
  name: 'demo',
  meta: {
    title: 'demo',
    icon: 'table'
  },
  children: [
    {
      path: '/tab',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/tab/index'),
          name: 'Tab',
          meta: { title: 'tab', icon: 'tab' }
        }
      ]
    },
    {
      path: '/excel',
      component: Layout,
      redirect: '/excel/export-excel',
      name: 'Excel',
      meta: {
        title: 'excel',
        icon: 'excel'
      },
      children: [
        {
          path: 'export-excel',
          component: () => import('@/views/excel/exportExcel'),
          name: 'ExportExcel',
          meta: { title: 'exportExcel' }
        },
        {
          path: 'export-selected-excel',
          component: () => import('@/views/excel/selectExcel'),
          name: 'SelectExcel',
          meta: { title: 'selectExcel' }
        },
        {
          path: 'upload-excel',
          component: () => import('@/views/excel/uploadExcel'),
          name: 'UploadExcel',
          meta: { title: 'uploadExcel' }
        }
      ]
    },
    {
      path: 'zip',
      component: Layout,
      redirect: 'zip/download',
      alwaysShow: true,
      meta: { title: 'zip', icon: 'zip' },
      children: [
        {
          path: 'download',
          component: () => import('@/views/demo/zip/index'),
          name: 'ExportZip',
          meta: { title: 'exportZip' }
        }
      ]
    },
    {
      path: 'external-link',
      component: Layout,
      children: [
        {
          path: 'https://github.com/PanJiaChen/vue-element-admin',
          meta: { title: 'externalLink', icon: 'link' }
        }
      ]
    },
    {
      path: '/i18n',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/i18n-demo/index'),
          name: 'I18n',
          meta: { title: 'i18n', icon: 'international' }
        }
      ]
    },
    {
      path: '/clipboard',
      component: Layout,
      redirect: 'noredirect',
      children: [
        {
          path: 'index',
          component: () => import('@/views/clipboard/index'),
          name: 'ClipboardDemo',
          meta: { title: 'clipboardDemo', icon: 'clipboard' }
        }
      ]
    },
    {
      path: '/theme',
      component: Layout,
      redirect: 'noredirect',
      children: [
        {
          path: 'index',
          component: () => import('@/views/theme/index'),
          name: 'Theme',
          meta: { title: 'theme', icon: 'theme' }
        }
      ]
    },
    {
      path: '/error',
      component: Layout,
      redirect: 'noredirect',
      name: 'ErrorPages',
      meta: {
        title: 'errorPages',
        icon: '404'
      },
      children: [
        {
          path: '401',
          component: () => import('@/views/errorPage/401'),
          name: 'Page401',
          meta: { title: 'page401', noCache: true }
        },
        {
          path: '404',
          component: () => import('@/views/errorPage/404'),
          name: 'Page404',
          meta: { title: 'page404', noCache: true }
        }
      ]
    },
    {
      path: '/error-log',
      component: Layout,
      redirect: 'noredirect',
      children: [
        {
          path: 'log',
          component: () => import('@/views/errorLog/index'),
          name: 'ErrorLog',
          meta: { title: 'errorLog', icon: 'bug' }
        }
      ]
    },
    {
      path: '/icon',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/svg-icons/index'),
          name: 'Icons',
          meta: { title: 'icons', icon: 'icon', noCache: true }
        }
      ]
    },
    {
      path: '/permission',
      component: Layout,
      redirect: '/permission/index',
      alwaysShow: true, // will always show the root menu
      meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin', 'editor'] // you can set roles in root nav
      },
      children: [
        {
          path: 'page',
          component: () => import('@/views/permission/page'),
          name: 'PagePermission',
          meta: {
            title: 'pagePermission',
            roles: ['admin'] // or you can only set roles in sub nav
          }
        },
        {
          path: 'directive',
          component: () => import('@/views/permission/directive'),
          name: 'DirectivePermission',
          meta: {
            title: 'directivePermission'
            // if do not set roles, means: this page does not require permission
          }
        }
      ]
    },
    {
      path: '/example',
      component: Layout,
      redirect: '/example/list',
      name: 'Example',
      meta: {
        title: 'example',
        icon: 'example'
      },
      children: [
        {
          path: 'create',
          component: () => import('@/views/example/create'),
          name: 'CreateArticle',
          meta: { title: 'createArticle', icon: 'edit' }
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/example/edit'),
          name: 'EditArticle',
          meta: { title: 'editArticle', noCache: true },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/example/list'),
          name: 'ArticleList',
          meta: { title: 'articleList', icon: 'list' }
        }
      ]
    }

  ]
}
export default demoRouter
