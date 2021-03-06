import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import store from './store';
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css'
import '../static/css/font-awesome.css'
import 'babel-polyfill'
import '../static/js/validate.js'

// 导入存储
import storage from '@/utils/storage'
Vue.use(ElementUI, {
    size: 'small'
})
Vue.prototype.$store = store
Vue.prototype.$axios = axios

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const userData = sessionStorage.getItem('username');
    console.log(userData)
    // 获取保存的用户对象
    //const userData = storage.getItem('user')
    if (!userData && to.path !== '/login') {
         console.log('1')
        next('/login')
    } else if (to.meta.permission) {
        console.log('2')
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        userData?JSON.parse(userData).data:'' === 'admin' ? next() : next('/403')
    } else {
        console.log('3')
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert(
                'vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看',
                '浏览器不兼容通知', {
                    confirmButtonText: '确定'
                }
            )
        } else {
            next()
        }
    }
})








new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
