import api from '../../http/api'
import router from '../../router'
import {Message} from 'element-ui'

export default {
  // 开启命名空间 这个文件就是单独的一个vuex的模块
  namespaced: true,
  state: {
    menus: []
  },
  mutations: {
    setMenus(state, data) {
      state.menus = data
    }
  },
  actions: {
    // 所有的请求都写在actions里面
    // action里面的方法可以传两个参数 第一个参数是整个store(vuex对象) 第二个参数是请求的参数
    async getMenus({commit}) {
      let res = await api.getMenus()
      if (res.meta.status === 200) {
        this.menus = res.data
        this.menus.unshift({
          authName:'首页',
          children:[],
          id:'005',
          path:'/'
        })
        // 提交mutation
        commit('setMenus', res.data)
        
    
      }
    },
    async login({commit}, {username, password}) {
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
 async getTianQi(){
  var result = await axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+this.city)
  console.log(result.data.data.forecast)
  this.City = result.data.data.forecast[0]
  console.log(this.City)
}
  },
}