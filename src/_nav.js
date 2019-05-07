export default {
  items: [
    {
      name: '主页',
      url: '/dashboard',
      icon: 'fa fa-home',
      badge: {
        variant: 'primary',
        text: ''
      }
    },
    {
      name: '代理商管理',
      url: '/agency',
      icon: 'fa fa-sitemap'
    },
    {
      name: '商品管理',
      icon: 'fa fa-product-hunt',
      children: [
        {
          name: '新增商品',
          url: '/goods/add',
          icon: 'fa fa-plus'
        },
        {
          name: '查看商品',
          url: '/goods/list',
          icon: 'fa fa-list'
        }
      ]
    },
    {
      name: '库存管理',
      url: '/inventory',
      icon: 'fa fa-shopping-bag'
    },
    {
      name: '订单管理',
      url: '/order/list',
      icon: 'fa fa-file-text-o'
    },
    {
      name: '客户管理',
      url: '/customers/list',
      icon: 'fa fa-users'
    }
  ]
}
