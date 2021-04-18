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
    path: '/land1',
    name: 'land1',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '注册'
    },
    component: resolve => require(['./view/register/land1'], resolve)
  },
  {
    path: '/land2',
    name: 'land2',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '注册'
    },
    component: resolve => require(['./view/register/land2'], resolve)
  },

  {
    path: '/land3',
    name: 'land3',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '注册'
    },
    component: resolve => require(['./view/register/land3'], resolve)
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
    path: '/landDet',
    name: 'landDet',
    meta: {
      keepAlive: true,
      isBack:false,
      title: '注册'
    },
    component: resolve => require(['./view/register/landDet'], resolve)
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
