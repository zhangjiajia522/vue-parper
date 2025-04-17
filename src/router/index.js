import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'dashboard', affix: true }
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/role',
    component: Layout,
    redirect: '/role/order',
    children: [
      {
        name: 'Role',
        path: 'role',
        component: () => import('@/views/permission/role'),
        meta: {
          title: '角色管理',
          icon: 'user',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    children: [
      {
        path: 'user',
        name: 'UserPermission',
        component: () => import('@/views/permission/user'),
        meta: { title: '用户管理', icon: 'peoples' },
        roles: ['admin']
      }
    ]
  },
  {
    path: '/per',
    component: Layout,
    redirect: '/per/books',
    // alwaysShow: true, // will always show the root menu
    name: 'Books',
    meta: {
      title: '图书信息管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        component: () => import('@/views/permission/books'),
        name: 'Books',
        path: 'books',
        // alwaysShow: true, // will always show the root men
        meta: {
          title: '图书信息管理',
          icon: 'guide',
          roles: ['admin']
        }
      },
      {
        path: 'detail/:pkey',
        name: 'book',
        hidden: true,
        component: () => import('@/views/permission/book'),
        meta: {
          title: '图书详情',
          roles: ['admin', 'User']
        }
      },
      {
        path: '/shop',
        name: 'shop',
        hidden: true,
        component: () => import('@/views/permission/shop'),
        meta: {
          title: '购物车',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/ssion',
    component: Layout,
    redirect: '/ssion/order',
    children: [
      {
        name: 'Order',
        path: 'order',
        component: () => import('@/views/permission/order'),
        meta: {
          title: '订单管理',
          icon: 'icon',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  // {
  //   path: '/payment',
  //   component: Layout,
  //   redirect: '/ssion/payment',
  //   children: [
  //     {
  //       name: 'Payment',
  //       path: 'payment',
  //       component: () => import('@/views/permission/payment'),
  //       meta: {
  //         title: '支付管理',
  //         icon: 'example',
  //         roles: ['admin', 'editor']
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/sale',
  //   component: Layout,
  //   redirect: '/ssion/sale',
  //   children: [
  //     {
  //       name: 'Sale',
  //       path: 'sale',
  //       component: () => import('@/views/permission/sale'),
  //       meta: {
  //         title: '售后管理',
  //         icon: 'example',
  //         roles: ['admin', 'editor']
  //       }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
