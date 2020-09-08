import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from "dayjs"
import Vue from 'vue'

export default {
    // 开启命名空间 这个文件就是单独的一个vuex的模块
    namespaced: true,
    state: {
        goods: [],
        total: 0,
        goodslist: [],
        totals:0
    },
    mutations: {
        setgoods(state, data) {
            state.goods = data
        },
        settotal(state, data) {
            state.total = data
        },
        setgoodstotal(state, data) {
            state.goodslist = data
        },
        setcatetotal(state,data){
            state.totals = data
        }
    },
    actions: {
        //获取商品列表
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
                    commit("setgoods", res.data.goods)
                    commit("settotal", res.data.total)
                }
            } catch{
                err => {
                    console.log(err);
                }
            }
        },
        //删除商品
        async deletegoods({ dispatch }, { id, query, pagenum, pagesize }) {
            let res = await api.deletegoods({ id })
            try {
                if (res.meta.status === 200) {
                    Message.success('删除成功')
                    dispatch('getgoods', {
                        query, pagenum, pagesize
                    })
                }

            } catch (err) {
                console.log(err);
            }

        },
        //获取商品分类
        async getcategories({ commit }, { type, pagenum, pagesize }) {
            let res = await api.getcategories({
                type, pagenum, pagesize
            })
            try {
                if (res.meta.status === 200) {
                    console.log(res.data);
                    res.data.result.map(item => {
                        if(item.cat_level === 0){
                            Vue.set(item,"first","一级")
                            if(item.children)
                        }
                    })
                    commit("setgoodstotal", res.data.result)
                    commit("setcatetotal", res.data.total)
                }
            } catch (err) {
                console.log(err);
            }
        },
        //添加商品
        async addgoods({commit},{goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs}){
            console.log(commit);
            let res = await api.addgoods({
                goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs
            })
            if(res.meta.status === 201){
                Message.success(res.meta.msg)
            }
        }
    },

}