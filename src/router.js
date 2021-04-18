import home from './components/home';

export default [{
  path: '/',
  component: home,
  children: [{
    path: '/',
    redirect: '/landMes1'
  }
  ]
},
  {
    path: '*',
    meta: {
      title: '页面不存在'
    },
    component: resolve => require(['./view/other/error'], resolve)
  },
  {
    path: '/agreement',
    meta: {
      title: '委托服务确认书'
    },
    component: resolve => require(['./view/other/agreement'], resolve)
  },
  {
    path: '/page',
    name: 'page',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '注册'
    },
    component: resolve => require(['./view/register/page'], resolve)
  },
  {
    path: '/page1',
    name: 'page1',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '注册'
    },
    component: resolve => require(['./view/register/page1'], resolve)
  },

  {
    path: '/page2',
    name: 'page2',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '注册'
    },
    component: resolve => require(['./view/register/page2'], resolve)
  },

  {
    path: '/landMes1',
    name: 'landMes1',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '注册'
    },
    component: resolve => require(['./view/register/landMes1'], resolve)
  },

  {
    path: '/information',
    name: 'information',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '贷款信息'
    },
    component: resolve => require(['./view/information/information'], resolve)
  },


  {
    path: '/page3',
    name: 'page3',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '注册'
    },
    component: resolve => require(['./view/register/page3'], resolve)
  },
  {
    path: '/selectCity',
    name: 'selectCity',
    meta: {
      parentName: '',
      title: '选择城市'
    },
    component: resolve => require(['./view/register/selectCity'], resolve)
  },
  {
    path: '/success',
    name: 'success',
    meta: {
      parentName: '',
      title: '申请成功'
    },
    component: resolve => require(['./view/result/success'], resolve)
  }
]
