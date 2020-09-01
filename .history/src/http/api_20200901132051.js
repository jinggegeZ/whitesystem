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
  getusers({pagenum,pagesize,query}){
    return service.get(`users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
  },
  //4.删除用户
  deleteUser(id){
    return service.delete(`users/${id}`)
  },
  //5.修改用户状态
  changUsertype({uId,type}){
    return service.put(`users/${uId}/state/${type}`)
  },
  //6.添加用户
  addUsers({username,password}){
    return service.post('/users',{

    })
  }
  
}