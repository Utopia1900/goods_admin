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
      meta: {
        requireAuth: true
      },
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
          meta: {
            requireAuth: true
          },
          component: Add
        },
        {
          path: '/goods/list',
          name: '查看商品',
          meta: {
            requireAuth: true
          },
          component: Goods
        },
        {
          path: '/customers/list',
          name: '客户管理',
          meta: {
            requireAuth: true
          },
          component: CustomerList
        },
        {
          path: '/order/list',
          name: '订单管理',
          meta: {
            requireAuth: true
          },
          component: OrderList
        },
        {
          path: '/inventory',
          name: '库存信息',
          meta: {
            requireAuth: true
          },
          component: Inventory
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = window.sessionStorage.getItem('token')
    if (token){
      next()
    } else {
      next({
        path: '/'
      })
      alert('请先登录')
    }
  } else {
    next()
  }
})

export default router











