import Vue from 'vue'
import Router from 'vue-router'
// Containers
import Full from '@/containers/Full'
// Views
// import Dashboard from '@/views/Dashboard'
// Views - Pages
import Login from '@/views/Login'
import AgencyList from '@/views/agency/AgencyList'
import Add from '@/views/goods/Add'
import Goods from '@/views/goods/Goods'
import CustomerList from '@/views/customer/CustomerList'
import OrderList from '@/views/order/OrderList'
import Inventory from '@/views/inventory/Inventory'
Vue.use(Router)

const router = new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'false active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: '主页',
      component: Full,
      children: [
        {
          path: '/agency',
          name: '代理商管理',
          meta: {
            requireAuth: true
          },
          component: AgencyList
        },
        {
          path: '/goods/add',
          name: '新增商品',
          component: Add
        },
        {
          path: '/goods/list',
          name: '查看商品',
          component: Goods
        },
        {
          path: '/customers/list',
          name: '客户管理',
          component: CustomerList
        },
        {
          path: '/order/list',
          name: '订单管理',
          component: OrderList
        },
        {
          path: '/inventory',
          name: '库存信息',
          component: Inventory
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let token = window.sessionStorage.getItem('token')
    if (token){
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router











