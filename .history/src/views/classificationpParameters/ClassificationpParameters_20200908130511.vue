<template>
  <div>
    <el-card :body-style="{ padding: '10px' }">
      <div class="top"><div class="ml"><i class="el-icon-warning"></i></div>注意:只允许为第三级分类设置相关参数!</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ClassificationpParameters",
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
.top {
  width: 100%;
  height: 37px;
  display: flex;
  font-size: 14px;
  color: #e6a23c;
  align-items: center;
  background:rgb(253,246,236);
  border-radius: 3px;
}
.ml {
  margin-left: 20px;
  margin-right:15px;
  font-size: 22px;
}
</style>