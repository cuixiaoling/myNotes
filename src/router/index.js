import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import test1 from '@/test/test1'
import test2 from '@/test/test2'
import test3 from '@/test/test3'
import test4 from '@/test/test4'
import test5 from '@/test/test5'

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
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },{
      path: '/test3',
      name: 'test3',
      component: test3
    },{
      path: '/test4',
      name: 'test4',
      component: test4
    },{
      path: '/test5',
      name: 'test5',
      component: test5
    },
  ]
})
