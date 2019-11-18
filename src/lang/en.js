export default {
  route: {
    dashboard: 'Dashboard',
    introduction: 'Introduction',
    documentation: 'Documentation',
    guide: 'Guide',
    system: 'System Manage',
    user: 'User Manage',
    role: 'Role Manage',
    resource: 'Resource Manage',
    tenant: 'Tenant Manage',
    mall: 'Mall Manage',
    category: 'Category Manage',
    goods: 'Goods Manage',
    createGoods: 'Create Goods',
    editGoods: 'Edit Goods',
    goodsList: 'Goods List',
    product: 'Product Manage',
    coupon: 'Coupon Manage',
    sellerAccount: 'Seller Account',
    sellerOrder: 'Seller Order',
    buyerAccount: 'Buyer Account',

    demo: 'Demo',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    componentIndex: 'Introduction',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'Screenfull',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: '123456',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  form: {
    create: 'Create',
    update: 'Edit',
    examine: 'Examine',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    deleteStatus: 'DeleteStatus',
    deleteStatus_deleted: 'Deleted',
    deleteStatus_undelete: 'UnDelete'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  notify: {
    success: 'Success',
    createSuccess: 'Create Success',
    editSuccess: 'Edit Success',
    deleteSuccess: 'Delete Success',
    fail: 'Fail',
    createFail: 'Create Fail',
    editFail: 'Edit Fail',
    deleteFail: 'Delete Fail'
  },
  user: {
    userId: 'User Id',
    nickName: 'Nick Name',
    userName: 'User Name',
    password: 'Password',
    gender: 'Gender',
    gender_male: 'Male',
    gender_female: 'Female',
    gender_secret: 'Secret',
    mobileNumber: 'Mobile',
    createTime: 'Create Time',
    deleteStatus: 'Delete Status'
  },
  role: {
    roleId: 'Role Id',
    roleName: 'Role Name',
    roleCode: 'Role Code',
    description: 'description',
    locked: 'Locked Status',
    locked_1: 'Locked',
    locked_2: 'No Locked',
    tenant_id: 'Tenant Id',
    createTime: 'Create Time',
    deleteStatus: 'Delete Status'
  },
  resource: {
    resourceId: 'Resource Id',
    resourceName: 'Resource Name',
    resourceCode: 'Resource Code',
    resourceUrl: 'Resource Url',
    description: 'Description',
    hide: 'Hide',
    hide_0: 'No Hide',
    hide_1: 'Hide',
    createTime: 'Create Time',
    deleteStatus: 'Delete Status'
  },
  tenant: {
    tenantId: 'Tenant Id',
    tenantName: 'Tenant Name',
    tenantCode: 'Tenant Code',
    status: 'Status',
    certificate: 'Certificate',
    status_1: 'Pending Review',
    status_2: 'No Pass',
    status_3: 'Normal Operation',
    status_4: 'Paused',
    status_5: 'Revoke',
    mobileNumber: 'Mobile Number',
    officePhone: 'Office Phone',
    createTime: 'Create Time',
    deleteStatus: 'Delete Status',
    businessModel: 'Business Model',
    mainProduct: 'Main Product',
    examine: 'Examine'
  },
  category: {
    categoryId: 'Category Id',
    categoryName: 'Category Name',
    rank: 'Rank',
    iconUrl: 'Icon Url',
    parentId: 'Parent Category',
    sortNumber: 'Sort Number',
    status: 'Status',
    status_1: 'Use Status',
    status_2: 'No Use',
    description: 'Description',
    createTime: 'CreateTime',
    deleteStatus: 'DeleteStatus',
    channelId: 'Channel Id'
  },
  goods: {
    goodsId: 'Goods Id',
    goodsName: 'Goods Name',
    goodsCode: 'Goods Code',
    status: 'Status',
    status_1: 'Edit Pending Review',
    status_2: 'No Pass',
    status_3: 'On Sale',
    status_4: 'Obtained',
    status_5: 'Sold Out',
    brief: 'Brief',
    primaryPicture: 'Primary Picture',
    listPicture: 'List Picture',
    gallerty: 'Gallerty',
    attribute: 'Attribute',
    specification: 'Specification',
    createTime: 'Create Time',
    deleteStatus: 'Delete Status',
    examine: 'Examine'
  },
  coupon: {
    couponId: 'Coupon Id',
    couponName: 'Coupon Name',
    money: 'Money',
    type: 'Type',
    type_1: 'use all mall',
    type_2: 'use in shop',
    minMoney: 'Min Money',
    maxMoney: 'Max Money',
    sendStartDate: 'Send StartDate',
    sendEndDate: 'Send EndDate',
    useStartDate: 'Use StartDate',
    useEndDate: 'Use EndDate',
    minGoodsMoney: 'Min GoodsMoney',
    tenantId: 'Tenant Id'
  },
  sellerAccount: {
    sellerAccountId: 'Seller Account',
    amountMoney: 'Account Money',
    amountIntegral: 'Amount Integral',
    userId: 'User',
    status: 'Status',
    status_1: 'No Use',
    status_2: 'Use',
    grade: 'Grade',
    createTime: 'Create Time',
    updateTime: 'Update Time',
    deleteStatus: 'Delete Status'
  },
  sellerOrder: {
    orderId: 'SellerOrderId',
    orderName: 'SellerOrder Name',
    orderCode: 'SellerOrder Code',
    status: 'Status',
    status_1: 'Not Shipped ',
    status_2: 'Shipped',
    status_3: 'Complete',
    orderMoney: 'Order Money',
    shipFee: 'Ship Fee',
    createTime: 'Create Time',
    deleteStatus: 'Delete Status',
    examine: 'Examine'
  },
  buyerAccount: {
    buyerAccountId: 'Seller Account',
    amountMoney: 'Account Money',
    amountIntegral: 'Amount Integral',
    userId: 'User',
    status: 'Status',
    status_1: 'Use',
    status_2: 'No Use',
    grade: 'Grade',
    createTime: 'Create Time',
    updateTime: 'Update Time',
    deleteStatus: 'Delete Status',
    receiveAddressId: 'Receive Address(default)'
  }
}
