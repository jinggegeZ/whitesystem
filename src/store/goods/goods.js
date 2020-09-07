import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from "dayjs"
// import Vue from 'vue'

export default {
    // 开启命名空间 这个文件就是单独的一个vuex的模块
    namespaced: true,
    state: {
        goods: [],
        total:0
    },
    mutations: {
        setgoods(state, data) {
            state.goods = data
        },
        settotal(state, data) {
            state.total = data
        }
    },
    actions: {
        async getgoods({ commit }, { query, pagenum, pagesize }) {
            try {
                let res = await api.getgoods({
                    pagenum,
                    pagesize,
                    query,
                })
                if (res.meta.status === 200) {
                    console.log(res.data);
                    res.data.goods.map(item => {
                        item.create_time = dayjs(item.create_time).format("YYYY-MM-DD/HH-mm-ss")
                    })
                    commit("setgoods",res.data.goods)
                    commit("settotal",res.data.total)
                }
            } catch{
                err => {
                    console.log(err);
                }
            }
        },
        //删除商品
    async deletegoods({dispatch},{id,query, pagenum, pagesize}) {
        let res = await api.deletegoods({id})
        try{
            if(res.meta.status === 200){
                Message.success('删除成功')
                dispatch('getgoods',{
                    query, pagenum, pagesize
                })
            }

        }catch (err) {
            console.log(err);
        }
    }
    },
    
}