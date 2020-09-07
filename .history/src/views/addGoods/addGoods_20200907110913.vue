<template>
  <div>
    <el-card class="box-card">
      <div class="contaner">
        <div class="leftbox">
          <div>
            <div class="itembox" v-for="(item,index) in tablist" :key="index" :class="[activeindex=idnex?'activeclass':'']" >{{item.title}}</div>
          </div>
        </div>
        <div class="rightbox">
          <!-- 设置商品属性 -->
          <div class="titlebox">设置商品属性</div>
          <!-- 步骤条 -->
          <div>
            <el-steps :active="0" finish-status="success" align-center>
              <el-step title="基本信息"></el-step>
              <el-step title="商品参数"></el-step>
              <el-step title="商品属性"></el-step>
              <el-step title="商品照片"></el-step>
              <el-step title="商品内容"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </div>
          <!-- 基本信息 -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      activeindex:"0",
      tablist:[
        {
          title:"基本信息",
          id:"tab-0"
        },
         {
          title:"商品参数",
          id:"tab-1"
        },
         {
          title:"商品属性",
          id:"tab-2"
        },
         {
          title:"商品照片",
          id:"tab-3"
        },
         {
          title:"商品内容",
          id:"tab-4"
        }
      ]
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.contaner {
  display: flex;
  min-height: 500px;
  justify-content: space-between;
}
.leftbox {
  font-size: 14px;
  width: 10%;
  height: 350px;
  margin-top: 120px;
 
}
.itembox {
  height: 50px;
  border-right: 1px solid rgb(224,224,224);
  line-height: 50px;
  margin-left: 10px;
}
.rightbox {
  width: 85%;
}
.activeclass {
  color: rgb(64,158,255);
  border-right: 1px solid rgb(64,158,255);
}
.titlebox {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  background: rgb(244,244,245);
}
.msgbox {
  margin-top: 30px;
}
</style>