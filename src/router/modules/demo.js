import Layout from '@/views/layout/Layout'

const demoRouter = {
  path: '/demo',
  component: Layout,
  name: 'demo',
  meta: {
    title: 'demo',
    icon: 'table'
  },
  children: [
    {
      path: 'tab',
      component: () => import('@/views/demo/tab/index'),
      name: 'Tab',
      meta: { title: 'tab', icon: 'tab' }
    },
    {
      path: 'zip',
      component: () => import('@/views/demo/zip/index'),
      name: 'zip',
      meta: { title: 'zip', icon: 'zip' }
    },
    {
      path: 'link',
      component: Layout,
      children: [
        {
          path: 'https://github.com/PanJiaChen/vue-element-admin',
          meta: { title: 'externalLink', icon: 'link' }
        }
      ]
    },
    {
      path: 'i18n',
      component: () => import('@/views/demo/i18n/index'),
      name: 'i18n',
      meta: { title: 'i18n', icon: 'international' }
    },
    {
      path: 'clipboard',
      component: () => import('@/views/demo/clipboard/index'),
      name: 'clipboard',
      meta: { title: 'clipboard', icon: 'clipboard' }
    },
    {
      path: 'theme',
      component: () => import('@/views/demo/theme/index'),
      name: 'theme',
      meta: { title: 'theme', icon: 'theme' }
    },
    {
      path: 'permission',
      name: 'Permission',
      component: () => import('@/views/demo/permission/index'),
      meta: {
        title: 'permission',
        icon: 'excel'
      },
      children: [
        {
          path: 'page',
          component: () => import('@/views/demo/permission/page'),
          name: 'PermissionPage',
          meta: { title: 'pagePermission' }
        },
        {
          path: 'directive',
          component: () => import('@/views/demo/permission/directive'),
          name: 'Permission Directive',
          meta: { title: 'directivePermission' }
        }
      ]
    },
    {
      path: 'excel',
      name: 'Excel',
      component: () => import('@/views/demo/excel/index'),
      meta: {
        title: 'excel',
        icon: 'excel'
      },
      children: [
        {
          path: 'export',
          component: () => import('@/views/demo/excel/export/index'),
          name: 'ExportExcel',
          meta: { title: 'exportExcel' }
        },
        {
          path: 'select',
          component: () => import('@/views/demo/excel/select/index'),
          name: 'SelectExcel',
          meta: { title: 'selectExcel' }
        },
        {
          path: 'upload',
          component: () => import('@/views/demo/excel/upload/index'),
          name: 'UploadExcel',
          meta: { title: 'uploadExcel' }
        }
      ]
    },
    {
      path: 'example',
      name: 'Example',
      component: () => import('@/views/demo/example/index'),
      redirect: 'example/list',
      meta: {
        title: 'example',
        icon: 'excel'
      },
      children: [
        {
          path: 'create',
          component: () => import('@/views/demo/example/create'),
          name: 'CreateArticle',
          meta: { title: 'createArticle', icon: 'edit' }
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/demo/example/edit'),
          name: 'EditArticle',
          meta: { title: 'editArticle', noCache: true },
          hidden: true
        },
        {
          path: 'list',
          component: () => import('@/views/demo/example/list'),
          name: 'ArticleList',
          meta: { title: 'articleList', icon: 'list' }
        }
      ]
    },
    {
      path: 'charts',
      name: 'Charts',
      component: () => import('@/views/demo/charts/index'),
      redirect: 'noredirect',
      meta: {
        title: 'charts',
        icon: 'excel'
      },
      children: [
        {
          path: 'keyboard',
          component: () => import('@/views/demo/charts/keyboard'),
          name: 'KeyboardChart',
          meta: { title: 'keyboardChart', noCache: true }
        },
        {
          path: 'line',
          component: () => import('@/views/demo/charts/line'),
          name: 'LineChart',
          meta: { title: 'lineChart', noCache: true }
        },
        {
          path: 'mixchart',
          component: () => import('@/views/demo/charts/mixChart'),
          name: 'MixChart',
          meta: { title: 'mixChart', noCache: true }
        }
      ]
    },
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/demo/table/index'),
      redirect: 'noredirect',
      meta: {
        title: 'table',
        icon: 'table'
      },
      children: [
        {
          path: 'dynamic-table',
          component: () => import('@/views/demo/table/dynamicTable/index'),
          name: 'DynamicTable',
          meta: { title: 'dynamicTable' }
        },
        {
          path: 'drag-table',
          component: () => import('@/views/demo/table/dragTable'),
          name: 'DragTable',
          meta: { title: 'dragTable' }
        },
        {
          path: 'inline-edit-table',
          component: () => import('@/views/demo/table/inlineEditTable'),
          name: 'InlineEditTable',
          meta: { title: 'inlineEditTable' }
        },
        {
          path: 'tree-table',
          component: () => import('@/views/demo/table/treeTable/treeTable'),
          name: 'TreeTableDemo',
          meta: { title: 'treeTable' }
        },
        {
          path: 'custom-tree-table',
          component: () => import('@/views/demo/table/treeTable/customTreeTable'),
          name: 'CustomTreeTableDemo',
          meta: { title: 'customTreeTable' }
        },
        {
          path: 'complex-table',
          component: () => import('@/views/demo/table/complexTable'),
          name: 'ComplexTable',
          meta: { title: 'complexTable' }
        }
      ]
    },
    {
      path: 'components',
      name: 'Components',
      component: () => import('@/views/demo/components/index'),
      redirect: 'noredirect',
      meta: {
        title: 'components',
        icon: 'component'
      },
      children: [
        {
          path: 'tinymce',
          component: () => import('@/views/demo/components/tinymce'),
          name: 'TinymceDemo',
          meta: { title: 'tinymce' }
        },
        {
          path: 'markdown',
          component: () => import('@/views/demo/components/markdown'),
          name: 'MarkdownDemo',
          meta: { title: 'markdown' }
        },
        {
          path: 'json-editor',
          component: () => import('@/views/demo/components/jsonEditor'),
          name: 'JsonEditorDemo',
          meta: { title: 'jsonEditor' }
        },
        {
          path: 'splitpane',
          component: () => import('@/views/demo/components/splitpane'),
          name: 'SplitpaneDemo',
          meta: { title: 'splitPane' }
        },
        {
          path: 'avatar-upload',
          component: () => import('@/views/demo/components/avatarUpload'),
          name: 'AvatarUploadDemo',
          meta: { title: 'avatarUpload' }
        },
        {
          path: 'dropzone',
          component: () => import('@/views/demo/components/dropzone'),
          name: 'DropzoneDemo',
          meta: { title: 'dropzone' }
        },
        {
          path: 'sticky',
          component: () => import('@/views/demo/components/sticky'),
          name: 'StickyDemo',
          meta: { title: 'sticky' }
        },
        {
          path: 'count-to',
          component: () => import('@/views/demo/components/countTo'),
          name: 'CountToDemo',
          meta: { title: 'countTo' }
        },
        {
          path: 'mixin',
          component: () => import('@/views/demo/components/mixin'),
          name: 'ComponentMixinDemo',
          meta: { title: 'componentMixin' }
        },
        {
          path: 'back-to-top',
          component: () => import('@/views/demo/components/backToTop'),
          name: 'BackToTopDemo',
          meta: { title: 'backToTop' }
        },
        {
          path: 'drag-dialog',
          component: () => import('@/views/demo/components/dragDialog'),
          name: 'DragDialogDemo',
          meta: { title: 'dragDialog' }
        },
        {
          path: 'dnd-list',
          component: () => import('@/views/demo/components/dndList'),
          name: 'DndListDemo',
          meta: { title: 'dndList' }
        },
        {
          path: 'drag-kanban',
          component: () => import('@/views/demo/components/dragKanban'),
          name: 'DragKanbanDemo',
          meta: { title: 'dragKanban' }
        }
      ]
    }
  ]
}
export default demoRouter
