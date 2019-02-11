import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',  // 路径
      name: 'login', // 名字
      component: () => import('./views/login/login.vue')  // 引入登录组件
    }, 
    
     
    {
      path: '/',  // 路径
      name: 'index', // 名字
      component: () => import('./views/index/index.vue') , // 引入登录组件
      children: [{
        path: '/goods-manage',  // 路径
        name: 'goods-manage', // 名字
        component: () => import('./views/goods/goods-manage.vue')  // 引入登录组件
      }, 
      {
        path: '/goods-add',  // 路径
        name: 'goods-add', // 名字
        component: () => import('./views/goods/goods-add.vue')  // 引入登录组件
      }, 
      {
        path: '/stock-manage',  // 路径
        name: 'stock-manage', // 名字
        component: () => import('./views/stock/stock-manage.vue')  // 引入登录组件
      },
      {
        path: '/stock-add',  // 路径
        name: 'stock-add', // 名字
        component: () => import('./views/stock/stock-add.vue')  // 引入登录组件
      },
      {
        path: '/sell-list',  // 路径
        name: 'sell-list', // 名字
        component: () => import('./views/selling/sell-list.vue')  // 引入登录组件
      },
      {
        path: '/stock-out',  // 路径
        name: 'stock-out', // 名字
        component: () => import('./views/selling/stock-out.vue')  // 引入登录组件
      }, 
      {
        path: '/return-goods',  // 路径
        name: 'return-goods', // 名字
        component: () => import('./views/selling/return-goods.vue')  // 引入登录组件
      },
      {
        path: '/sell-sta',  // 路径
        name: 'sell-sta', // 名字
        component: () => import('./views/statistics/sell-sta.vue')  // 引入登录组件
      },
      {
        path: '/stock-sta',  // 路径
        name: 'stock-sta', // 名字
        component: () => import('./views/statistics/stock-sta.vue')  // 引入登录组件
      }, 
      {
        path: '/account-manage',  // 路径
        name: 'account-manage', // 名字
        component: () => import('./views/account/account-manage.vue')  // 引入登录组件
      }, 
      {
        path: '/account-add',  // 路径
        name: 'account-add', // 名字
        component: () => import('./views/account/account-add.vue')  // 引入登录组件
      }, 
      {
        path: '/pwd-mod',  // 路径
        name: 'pwd-mod', // 名字
        component: () => import('./views/account/pwd-mod.vue')  // 引入登录组件
      }, 
      {
        path: '',  // 路径
        name: 'system-manage', // 名字
        component: () => import('./views/system/system-manage.vue')  // 引入登录组件
      }, 
      {
        path: '/system-config',  // 路径
        name: 'system-config', // 名字
        component: () => import('./views/system/system-config.vue')  // 引入登录组件
      }, 
      {
        path: '/privlege-manage',  // 路径
        name: 'privlege-manage', // 名字
        component: () => import('./views/system/privlege-manage.vue')  // 引入登录组件
      }, 
      {
        path: '/add-group',  // 路径
        name: 'add-group', // 名字
        component: () => import('./views/system/add-group.vue')  // 引入登录组件
      }, 
      {
        path: '/sortation-manage',  // 路径
        name: 'sortation-manage', // 名字
        component: () => import('./views/sortation/sortation-manage.vue')  // 引入登录组件
      }, 
      {
        path: '/sortation-add',  // 路径
        name: 'sortation-add', // 名字
        component: () => import('./views/sortation/sortation-add.vue')  // 引入登录组件
      }, 
      {
        path: '/member-manage',  // 路径
        name: 'member-manage', // 名字
        component: () => import('./views/member/member-manage.vue')  // 引入登录组件
      }, 
      {
        path: '/member-add',  // 路径
        name: 'member-add', // 名字
        component: () => import('./views/member/member-add.vue')  // 引入登录组件
      },]
    }
  ]
})
