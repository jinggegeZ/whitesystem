<template>
  <div>
    <el-card class="box-card">
      <el-steps :active="1">
        <el-step title="步骤 1" description="基本信息"></el-step>
        <el-step title="步骤 2" description="商品参数"></el-step>
        <el-step title="步骤 3" description="商品属性"></el-step>
        <el-step title="步骤 4" description="商品照片"></el-step>
        <el-step title="步骤 5" description="商品内容"></el-step>
        <el-step title="步骤 6" description="完成"></el-step>
        
      </el-steps>
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
</style>