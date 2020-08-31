import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
import axios from 'axios'

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
    },
    setTianQi(state, data){
      state.City = data
    }
  },
  actions: {
    // 所有的请求都写在actions里面
    // action里面的方法可以传两个参数 第一个参数是整个store(vuex对象) 第二个参数是请求的参数
    async getMenus({ commit }) {
      let res = await api.getMenus()
      if (res.meta.status === 200) {
        this.menus = res.data
        this.menus.unshift({
          authName: '首页',
          children: [],
          id: '005',
          path: '/'
        })
        console.log(this.menus);
        
        this.routes = router.options.routes
        console.log(this.routes);
        //加图片
        this.menus.map(item1 => {
          this.routes.map(item2 => {
            if(item1.authName === item2.name){
              this.$set("item1",icon ,"item2.icon")
            }
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
    //获取当地城市及天气
    async getTianQi({commit}) {
      var res = await axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + '成都市')
      // console.log(result.data.data.forecast)
      // this.City = res.data.forecast[0]
      this.City = res.data.data.forecast
      console.log(this.City);
      // 提交mutation
      commit('setTianQi', this.City)
    }
  },
}