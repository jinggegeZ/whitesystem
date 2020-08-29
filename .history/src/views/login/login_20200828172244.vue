<template>
  <div class="login">
    <div class="loginbox">
      <img class="loginboximg" src="../../../public/image/bg.jpg" alt />
      <div class="msgbox">
        <div class="topbox">欢迎来到小白后台系统</div>
        <div class="topinpuit1">
          <div class="topinpuit1-1"><el-form
            :model="ruleFrom"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleFrom.username"></el-input>
            </el-form-item>
          </el-form></div>
        </div>
        <div class="topinpuit">
          <div class="topinpuit1-2"><el-form
            :model="ruleFrom"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleFrom.password"></el-input>
            </el-form-item>
          </el-form></div>
        </div>
        <div class="topinputfont">特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。</div>
        <div class="submit"><el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button></div>
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
       ruleFrom:{
         username: '',
          password:'',
       },
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '密码长度不低于5位', trigger: 'blur' }
          ],
          }
    };
  },
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(valid);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>