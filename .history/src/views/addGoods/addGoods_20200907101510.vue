<template>
  <div>
    <el-card class="box-card">
     <div class="contaner">
       <div class="leftbox">
        <el-steps direction="vertical" :active="1">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </div>
     <div class="rightbox">
         <div class="titlebox">设置商品属性</div>
      <div>
        <el-steps :active="1">
          <el-step title="基本信息">123</el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品照片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
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
    return {};
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
    min-height: 400px;
    justify-content: space-between;
  }
  .leftbox {
    width: 15%;
    height: 300px;
    margin-top: 100px;
  }
  .rightbox {
    width: 85%;
  }
.titlebox {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
}
.msgbox {
  
  margin-top: 30px;
}
</style>