import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import layout from "../views/layout1/layout"

Vue.use(VueRouter);

const routes = [
  {
    path: '/Home',
    redirect: '/'
  },
  {
    path: '',
    component: layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'users/users',
        name: 'UserList',
        component: () => import('../views/userList/UserList.vue'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'rights/roles',
        name: 'RoleList',
        component: () => import('../views/roleList/RoleList.vue'),
        meta: {
          title: '角色列表'
        }
      },
      {
        path: 'rights/rights',
        name: 'PermissionList',
        component: () => import('../views/permissionList/PermissionList.vue'),
        meta: {
          title: '权限列表'
        }
      },
      {
        path: '/goods',
        name: 'GoodsList',
        component: () => import('../views/goodsList/GoodsList.vue'),
        meta: {
          title: '商品列表'
        }
      },
      {
        path: '/params',
        name: 'ClassificationpParameters',
        component: () => import('../views/classificationpParameters/ClassificationpParameters.vue'),
        meta: {
          title: '分类参数'
        }
      },
      {
        path: '/categories',
        name: 'CommodityClassification',
        component: () => import('../views/commodityClassification/CommodityClassification.vue'),
        meta: {
          title: '商品分类'
        }
      },
      {
        path: '/orders',
        name: 'OrderList',
        component: () => import('../views/orderList/OrderList.vue'),
        meta: {
          title: '订单列表'
        }
      },
      {
        path: '/reports',
        name: 'DataReport',
        component: () => import('../views/dataReport/DataReport.vue'),
        meta: {
          title: '数据报表'
        }
      }

    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 路由懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login'),
    meta: {
      title: "登录页"
    }
  },

]


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
