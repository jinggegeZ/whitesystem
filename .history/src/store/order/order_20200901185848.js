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
    actions:{
        async get
    },
}