## 简介

[system-web] 是一个后台管理系统集成解决方案，它基于 vue和element,内置了i18国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以快速搭建企业级中后台产品原型。


**本项目的定位是后台集成方案，不适合当基础模板来开发。**

- 模板建议使用: [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
- 桌面端: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)
- Typescript版: [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) 

**注意：
** 使用node@10.9.0版本 不要高于node@11, element-ui@2.3.0+ 版本，所以最低兼容 vue@2.5.0+**
** webpack4
** 不支持低版本浏览器(如 ie)，有需求请自行添加 polyfill

## 技术栈基于:
vue,vuex,vue-router,axios,element-ui,Mock.js

## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 二步登录

- 多环境发布
  - dev sit stage prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地mock数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导出zip
  - 导入excel
  - 前端可视化excel

- 表格
  - 动态表格
  - 拖拽表格
  - 树形表格
  - 内联编辑

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
- Markdown2html
```

## 开发

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

浏览器访问 http://localhost:11001

## 发布

# 构建测试环境
npm run build:sit

# 构建生产环境
npm run build:prod

## 其它

# --report to build with bundle size analytics
npm run build:prod

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix

## 参照：
# 参照源码 https://github.com/PanJiaChen/vue-element-admin.git
# 说明文档 https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html


## License
[MIT]
Copyright (c) 2019-present www.fengtuwei.com