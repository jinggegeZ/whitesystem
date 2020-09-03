import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from "dayjs"
import Vue from 'vue'

export default {
  // 开启命名空间 这个文件就是单独的一个vuex的模块
  namespaced: true,
  state: {
    goods: []
  },
  mutations: {
    setgoods()
  },
  actions: {
    
  },
}