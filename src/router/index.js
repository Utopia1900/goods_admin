import Vue from 'vue'
import Router from 'vue-router'
// Containers
import Full from '@/containers/Full'
// Views
// import Dashboard from '@/views/Dashboard'
// Views - Pages
import Login from '@/views/Login'
import Add from '@/views/goods/Add'
import View from '@/views/goods/View'
import CustomerList from '@/views/customer/CustomerList'
import One from '@/views/shipping/One'
import UploadDelivery from '@/views/shipping/UploadDelivery'
import OrderList from '@/views/order/OrderList'
import Inventory from '@/views/inventory/Inventory'
Vue.use(Router)

export default new Router({
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: '主页',
      component: Full,
      children: [
        {
          path: '/goods/add',
          name: '新增商品',
          component: Add
        },
        {
          path: '/goods/view',
          name: '查看商品',
          component: View
        },
        {
          path: '/shipping/one',
          name: '发货',
          component: One
        },
        {
          path: '/shipping/uploadDelivery',
          name: '批量导入',
          component: UploadDelivery
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