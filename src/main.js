import Vue from 'vue';
import VueRouter from "vue-router";
import store from './store'
import {getCookie} from './store/cookie'
import MintUI from 'mint-ui'

Vue.use(MintUI)
Vue.use(VueRouter);

//引入根模板
import home from './components/home'

//引入路由配置信息
import routes from './router'

//定义一个VUE内全局用到的名称（标题）
Vue.prototype.appName = '';

//定义路由配置
const router = new VueRouter({
	hashbang: false,
	history: true,
	routes: routes,
	scrollBehavior: function(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
	}
});
//添加路由钩子修改每个页面标题
router.beforeEach((to, form, next) => {
  //如果自定义了标题就取标题，否则拿全局标题
  //window.document.title = to.meta.title !== undefined ? (to.meta.title + '-' + Vue.prototype.appName) : Vue.prototype.appName;
  window.document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    let cookieMobile = getCookie('_app_user_mobile')
    if (cookieMobile) {  // 判断当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

//通过components下的index.js文件导入组件
import components from './components/index'
//对导入的组件进行全局组件注册
Object.keys(components).forEach((key) => {
	Vue.component(key, components[key])
});

//通过filters.js导入自定义用于过滤的函数
import filters from './config/filters'
//对导入的函数进行全局过滤器注册
Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key])
});

//methods.js导入自定义方法(/变量)用于全局方法
import methods from './config/methods'
//方法挂靠全局
Object.keys(methods).forEach((key) => {
	Vue.prototype[key] = methods[key];
});

const app = new Vue({
	router,
	store,
	render: h => h(home)
}).$mount('#app');
