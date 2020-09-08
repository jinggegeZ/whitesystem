import service from './index'
import qs from "qs"

export default {
  //1.登录
  login({ username, password }) {
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
  getusers({ pagenum, pagesize, query }) {
    return service.get(`users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
  },
  //4.删除用户
  deleteUser(id) {
    return service.delete(`users/${id}`)
  },
  //5.修改用户状态
  changUsertype({ uId, type }) {
    return service.put(`users/${uId}/state/${type}`)
  },
  //6.添加用户
  addUsers({ username, password, email, mobile }) {
    return service.post('/users', {
      username,
      password,
      email,
      mobile
    })
  },
  //7.编辑用户
  changeusermsg({ id, email, mobile }) {
    return service.put(`users/${id}`, { email, mobile })
  },
  //8.reports/type/1获取折线图
  getreports() {
    return service.get('reports/type/1')
  },
  //9.获取orders
  getorders({ query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr }) {
    return service.get(`orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}&user_id=${user_id}&pay_status=${pay_status}&is_send=${is_send}&order_fapiao_title=${order_fapiao_title}&order_fapiao_company=${order_fapiao_company}&order_fapiao_content=${order_fapiao_content}&consignee_addr=${consignee_addr}`)
  },
  //10.获取roles
  getroles() {
    return service.get('roles')
  },
  //11.添加角色
  addroles({ roleName, roleDesc }) {
    return service.post('roles', {
      roleName, roleDesc
    })
  },
  //12.编辑修改角色
  changerolesmsg({ id, roleName, roleDesc }) {
    return service.put(`roles/${id}`, { roleName, roleDesc })
  },
  //13.删除角色
  deleterolesUser(id) {
    return service.delete(`roles/${id}`)
  },
  //14.获取rights
  getrights({ type }) {
    return service.get(`rights/${type}`)
  },
  //15.获取rights
  getRights({ type }) {
    return service.get(`rights/${type}`)
  },
  //16.编辑用户权限
  changeuserroles({ roleId, rids }) {
    return service.post(`roles/${roleId}/rights`, qs.stringify({ rids }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
  //17.获取商品
  getgoods({ pagenum, pagesize, query }) {
    return service.get(`goods?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
  },
  //18.删除商品
  deletegoods({ id }) {
    return service.delete(`goods/${id}`)
  },
  //19.获取分类
  getcategories({type,pagenum,pagesize}){
    return service.get(`categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
  },
  //20.添加商品
  addgoods({goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs}){
    return service.post(`goods`,{
      goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs
    })
  },
  //21.添加分类
  addcategories({cat_pid,cat_name,cat_level}){
    return service.post(`categories`,{
      cat_pid,cat_name,cat_level
    })
  },
  //22.编辑添加提交
  addCategories({id,cat_name}){
    return service.put(`categories/${id}`,{cat_name})
  },
  //23.删除分类
  deletecategories({id}){
    return service.delete(`categories/${id}`)
  },
  //24.获取参数列表
  getattributes({id,sel}){
    return service.get(`categories/${id}/attributes?sel=${sel}`)
  }
  

}