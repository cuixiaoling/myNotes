import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import test1 from '@/test/test1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/test1',
      name: 'test1',
      component: test1
    }
  ]
})
