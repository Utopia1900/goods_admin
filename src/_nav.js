export default {
  items: [
    {
      name: '主页',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: ''
      }
    },
    {
      name: '商品管理',
      icon: 'icon-folder',
      children: [
        {
          name: '新增商品',
          url: '/goods/add',
          icon: 'icon-plus'
        },
        {
          name: '查看商品',
          url: '/goods/view',
          icon: 'icon-list'
        }
      ]
    },
    {
      name: '库存管理',
      url: '/inventory',
      icon: 'icon-direction'
    },
    {
      name: '订单管理',
      url: '/order/list',
      icon: 'icon-book-open'
    },
    {
      name: '发货管理',
      icon: 'icon-list',
      children: [
        {
          name: '发货',
          url: '/shipping/one',
          icon: 'icon-folder'
        },
        {
          name: '批量导入',
          url: '/shipping/uploadDelivery',
          icon: 'icon-folder'
        }
      ]
    },
    {
      name: '客户管理',
      url: '/customers/list',
      icon: 'icon-people'
    }
  ]
}
