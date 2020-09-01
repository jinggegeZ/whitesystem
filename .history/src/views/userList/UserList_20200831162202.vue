<template>
  <div class="UserListbox">
    <div class="userListbox">
      <div class="userListbox-serach">
        <div class="userListbox-serach1">
          <div>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="serachbox">
            <i class="el-icon-search"></i>
          </div>
          <div class="adduser">添加用户</div>
        </div>
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
      input: ""
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.UserListbox {
  padding: 5px;
}
.userListbox {
  width: 100%;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 5px;
}
.userListbox-serach {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.userListbox-serach1 {
  width: 90%;
  display: flex;
  align-items: center;
}
.serachbox {
  width: 47px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgb(220, 223, 230);
  border-right: 1px solid rgb(220, 223, 230);
  border-bottom: 1px solid rgb(220, 223, 230);
}
.adduser {
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
  background: rgb(64,158,255);
  margin-left: 30px;
  border-radius: 5px;
}
</style>