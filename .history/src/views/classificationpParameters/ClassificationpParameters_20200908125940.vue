<template>
  <div>
    <el-card :body-style="{ padding: '10px' }">
      <div class="top">注意:只允许为第三级分类设置相关参数!</div>
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
  height: 40px;
  display: flex;
  font-size: 14px;
  color: #e6a23c;
  align-items: center;
  background:rgb(253,246,236);
}
</style>