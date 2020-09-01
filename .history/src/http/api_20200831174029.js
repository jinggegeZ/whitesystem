import service from './index'

export default {
  //1.登录
  login({username, password}) {
    return service.post('/login', {
      username,
      password
    })
  },
  //2.获取menus
  getMenus() {
    return service.get('menus')
  },
  //3.获取用户列表
  getusers(){
    return service.get(`users?pagenum=${pagenum}&pagesize=${pagesize}`)
  }
}