<template>
  <div class="login">
    <div class="loginbox">
      <img class="loginboximg" src="../../../public/image/bg.jpg" alt />
      <div class="msgbox">
        <div class="topbox">欢迎来到小白后台系统</div>
        <div class="topinpuit1">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="请输入用户名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="topinpuit">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="请输入密码" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="topinputfont">特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。</div>
        <div class="submit"><el-button type="primary">立即登录</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
       ruleForm: {
          name: '',
      },
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          }
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>