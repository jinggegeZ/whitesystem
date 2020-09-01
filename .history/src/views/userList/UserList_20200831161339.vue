<template>
  <div class="UserListbox">
    <div class="userListbox">
      <div class="userListbox-serach">
        <div><el-input v-model="input" placeholder="请输入内容"></el-input></div>
        <div class="serachbox"><i class="el-icon-search"></i></div>
      </div>
      <div class="userListbox-nav"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props: {},
  components: {},
  data() {
    return {
       input: ''
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.UserListbox {
  padding: 5px;
}
.userListbox {
  width: 100%;
  border: 1px solid rgb(224,224,224);
}
.userListbox-serach {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}
.serachbox {
  width: 48px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgb();
}
</style>