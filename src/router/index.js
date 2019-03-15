import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/page/login.vue'], resolve),
    },{
      path: '/',
      redirect: '/login'
  },
    {
      path: '/Home',
      name: 'Home',
      component: resolve => require(['@/components/common/Home.vue'], resolve),
      children: [
        {
          path: '/user',
          name: 'user',
          component: resolve => require(['@/components/page/user.vue'], resolve),
          meta: {
              title: '管理员原理'
          }
        }
      ]
    }
  ]
})
