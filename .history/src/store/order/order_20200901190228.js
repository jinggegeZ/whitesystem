import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
import Vue from 'vue'

export default{
    namespaced: true,
    state:{
        orders:[]
    },
    mutations:{
        setMenus(state, data) {
            state.orders = data
          },
    },
    actions: {
        async getorders({commit},{query,pagenum,pagesize,user_id,pay_status,is_send,order_fapiao_title,order_fapiao_company,order_fapiao_content,consignee_addr}) {
            try{
                let res = await api.getorders({
                  pagenum,
                  pagesize,
                  query,
                  user_id,pay_status,is_send,order_fapiao_title,order_fapiao_company,order_fapiao_content,consignee_addr
                })
                if (res.meta.status === 200) {
                  commit('orders', res.data)
                } else {
                  Message.error(res.meta.msg)
                }
               } catch(err) {
                 console.log(err);
               }
        }
    },
}