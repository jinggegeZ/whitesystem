import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
import Vue from 'vue'

export default {
  // 开启命名空间 这个文件就是单独的一个vuex的模块
  namespaced: true,
  state: {
    menus: [],
    City: [],
    userList: [],
    total:0,
    reports:[]
  },
  mutations: {
    setMenus(state, data) {
      state.menus = data
    },
    setuserList(state, data) {
      state.userList = data
    },
    settotal(state, data) {
      state.total = data
    },
    setreport(state, data) {
      state.reports = data
    },
    setroles(state, data) {
      state.roles = data
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
        // console.log(this.routes);
        //第一级加图片
        this.menus.forEach(item1 => {
          this.routes.forEach(item2 => {
            if (item1.authName === item2.name) {
              Vue.set(item1, "icon", item2.meta.icon)
            }
          })
        })
        //第二级加图片
        this.menus.forEach(item => {
          item.children.forEach(item1 => {
            this.routes.forEach(item2 => {
              if (item2.children && item2.children.length > 0) {
                item2.children.forEach(item3 => {
                  if (item3.meta) {
                    if (item1.authName === item3.meta.title) {
                      Vue.set(item1, "icon", item3.meta.icon)
                    }
                  }
                })
              }
            })
          })
        })
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
    //获取用户列表
    async getusers({ commit }, { pagenum, pagesize, query }) {
      console.log(commit);
     try{
      let res = await api.getusers({
        pagenum,
        pagesize,
        query
      })
      if (res.meta.status === 200) {
        commit('setuserList', res.data.users)
        commit('settotal', res.data.total)
      } else {
        Message.error(res.meta.msg)
      }
     } catch(err) {
       console.log(err);
     }
    },
    // 删除用户信息
    async deleteUser({dispatch},{id,pagenum,pagesize,query}) {
      let res = await api.deleteUser(id)
      if(res.meta.status === 200){
        Message.success('删除成功')
        dispatch('getusers',{
          pagenum,
        pagesize,
        query
        })
      }
    },
    //修改用户信息
    async changUsertype({dispatch},{uId,type,pagenum,pagesize,query}){
      let res = await api.changUsertype({uId,type})
      if(res.meta.status === 200){
         // 提示用户
        Message.success('设置状态成功')
        dispatch('getusers',{
          pagenum,
        pagesize,
        query
        })
      }
    },
    //新增用户信息
    async addUsers({dispatch},{username,password,email,mobile,pagenum,pagesize,query}){
      let res = await api.addUsers({username,password,email,mobile})
      if(res.meta.status === 201){
         // 提示用户
        Message.success('添加成功')
        dispatch('getusers',{
          pagenum,
        pagesize,
        query
        })
      }
    },
    //编辑用户信息
    async changeusermsg({dispatch},{id,email,mobile,pagenum,pagesize,query}){
      let res = await api.changeusermsg({id,email,mobile})
      if(res.meta.status === 200){
         // 提示用户
        Message.success('添加成功')
        dispatch('getusers',{
          pagenum,
        pagesize,
        query
        })
      }
    },
    //获取report
    async getreports({commit}) {
      console.log(commit);
      let res = await api.getreports()
      if(res.meta.status === 200){
        localStorage.setItem('reports',JSON.stringify(res.data))
        console.log(res.data);
        // 提交mutation
        commit('setreport', res.data)
      }
    },
    // roles部分
    //获取getroles
    async getroles({commit}){
      console.log(commit);
      let res = await api.getroles()
      if(res.meta.status === 200){
        
        console.log(res.data);
        // 提交mutation
        commit('setroles', res.data)
      }
    },
    //添加用户角色
    async addroles({dispatch},{roleName,roleDesc}){
      let res = await api.addUsers({roleName,roleDesc})
      if(res.meta.status === 201){
         // 提示用户
        Message.success('添加角色成功')
        dispatch('getroles')
      }
    }
  
  },
}