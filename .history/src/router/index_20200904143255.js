import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import layout from "../views/layout1/layout"

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name:"首页",
    component: layout,
    meta: {
      icon: "el-icon-s-home"
    },
    children:[
      {
        path:'/Home',
        name:"Home",
        component:Home
      },
      
    ]
    
  },
  // 用户列表
  {
    path: '/users',
    name:'用户管理',
    meta:{
      icon:"el-icon-user"
    },
    component: layout,

    children: [
      {
        path: 'users',
        name: 'UserList',
        component: () => import('../views/userList/UserList.vue'),
        meta: {
          title: '用户列表',
          icon: "el-icon-folder"
        }
      },
    ]
  },
  // 权限列表
  {
    path: '/rights',
    name:'权限管理',
    meta:{
      icon:"el-icon-folder"
    },
    component: layout,
    children: [
      {
        path: 'roles',
        name: 'RoleList',
        component: () => import('../views/roleList/RoleList.vue'),
        meta: {
          title: '角色列表',
          icon: "el-icon-setting"
        }
      },
      {
        path: 'rights',
        name: 'PermissionList',
        component: () => import('../views/permissionList/PermissionList.vue'),
        meta: {
          title: '权限列表',
          icon: 'el-icon-c-scale-to-original'
        }
      },
    ]
  },
  //商品管理
  {
    path: '/goods',
    component: layout,
    name:'商品管理',
    meta:{
      icon:"el-icon-goods"
    },
    children: [
      {
        path: 'goods',
        name: 'GoodsList',
        component: () => import('../views/goodsList/GoodsList.vue'),
        meta: {
          title: '商品列表',
          icon: 'el-icon-help'
        },
        children:[
          {
            path: 'addGoods',
            name: 'addGoods',
            component: () => import('../views/addGoods/addGoods.vue'),
            
          },
        ]
      },
      {
        path: 'params',
        name: 'ClassificationpParameters',
        component: () => import('../views/classificationpParameters/ClassificationpParameters.vue'),
        meta: {
          title: '分类参数',
          icon: 'el-icon-bell'
        }
      },
      {
        path: 'categories',
        name: 'CommodityClassification',
        component: () => import('../views/commodityClassification/CommodityClassification.vue'),
        meta: {
          title: '商品分类',
          icon: 'el-icon-date'
        }
      },
      
    ]
  },
  //订单管理
  {
    path: '/orders',
    component: layout,
    name:'订单管理',
    meta:{
      icon:"el-icon-s-order"
    },
    children: [
      {
        path: 'orders',
        name: 'OrderList',
        component: () => import('../views/orderList/OrderList.vue'),
        meta: {
          title: '订单列表',
          icon: 'el-icon-folder-add'
        }
      },

    ]
  },
  //订单管理
  {
    path: '/reports',
    component: layout,
    name:"数据统计",
    meta:{
      icon:"el-icon-message"
    },
    children: [

      {
        path: 'reports',
        name: 'DataReport',
        component: () => import('../views/dataReport/DataReport.vue'),
        meta: {
          title: '数据报表',
          icon: 'el-icon-position'
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
