import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import layout from "../views/layout1/layout"

Vue.use(VueRouter);

const routes = [
  //首页
  {
    path:'/Home',
    redirect:'/'
  },
  {
    path: '',
    component: layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页'
        }
      }
    ]
  },
  //用户管理
  {
    path:'/users',
    redirect:'/users/users'
  },
  {
    path: '',
    component: layout,
    children: [
      {
        path: '/users/users',
        name: '/users',
        component: () => import("../views/users/users"),
        meta: {
          title: '用户管理',
        }
      }
    ]
  },
  //用户列表
  {
    path:'/rights',
    redirect:'/rights/roles'
  },
  {
    path: '',
    component: layout,
    children: [
      {
        path: '/rights/roles',
        name: '/rights',
        component: () => import("../views/roles/roles"),
        meta: {
          title: '用户列表',
        }
      }
    ]
  },
   //用户列表
   {
    path:'/rights',
    redirect:'/rights/roles'
  },
  {
    path: '',
    component: layout,
    children: [
      {
        path: '/rights/roles',
        name: '/rights',
        component: () => import("../views/roles/roles"),
        meta: {
          title: '用户列表',
        }
      }
    ]
  },
  rights
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/login")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
