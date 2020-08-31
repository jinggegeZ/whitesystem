import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
import Vue from 'vue'
export default {
  // 开启命名空间 这个文件就是单独的一个vuex的模块
  namespaced: true,
  state: {
    menus: [],
    City:[]
  },
  mutations: {
    setMenus(state, data) {
      state.menus = data
    }
    
  },
  actions: {
    // 所有的请求都写在actions里面
    // action里面的方法可以传两个参数 第一个参数是整个store(vuex对象) 第二个参数是请求的参数
    async getMenus({ commit }) {
      let res = await api.getMenus()
      if (res.meta.status === 200) {
        this.menus = res.data
        res.data.unshift({
          authName: '首页',
          children: [],
          id: '005',
          path: '/'
        })
        this.routes = router.options.routes
        console.log(this.routes);
        //第一级加图片
        this.menus.map(item1 => {
          
          this.routes.map(item2 => {
            
            if(item1.authName === item2.name){
              
              Vue.set(item1,"icon" ,item2.meta.icon)
              
            }
          })
        })
        //第二级加图片
       this.menus.map(item => {
         item.children.map(item1 => {
           this.routes.map(item2 => {
             item2.children.map(item3 => {
               console.log(item3.meta.title);
               if(item1.authName === item3.meta.title){
                Vue.set(item1,"icon" ,item3.meta.icon)
               }
             })
           })
         })
       })
        console.log(this.menus);
        //配路径
        this.menus.map(item1 => {
          
          item1.children.map(item2 => {
            item2.path = `/${item1.path}/${item2.path}`
          })
        })
        // 提交mutation
        commit('setMenus', res.data)
      }
    },
    //登录
    async login({ commit }, { username, password }) {
      console.log(commit);
      let res = await api.login({
        username,
        password
      })
      if (res.meta.status === 200) {
        // 存储信息
        localStorage.setItem('adminToken', res.data.token)
        localStorage.setItem('adminUser', JSON.stringify(res.data))
        // 跳转路由
        router.push('/')
        // 提示用户
        Message.success('登录成功')
      } else {
        Message.error(res.meta.msg)
      }
    },

  },
}