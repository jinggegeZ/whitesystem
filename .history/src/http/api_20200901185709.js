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
  addUsers({username,password,email,mobile}){
    return service.post('/users',{
      username,
      password,
      email,
      mobile
    })
  },
  //7.编辑用户
  changeusermsg({id,email,mobile}){
    return service.put(`users/${id}`,{email,mobile})
  },
  //8.reports/type/1获取折线图
  getreports(){
    return service.get('reports/type/1')
  },
  //9.获取orders
  getorders({query,pagenum,pagesize,user_id,pay_status,is_send,order_fapiao_title,order_fapiao_company,order_fapiao_content,consignee_addr}){
    return service.get(`orders`,{
      query,
      pagenum,
      pagesize,
      user_id,
      pay_status,
      is_send,
      order_fapiao_title,
      order_fapiao_company,
      order_fapiao_content,
      consignee_addr
    })
  }
}