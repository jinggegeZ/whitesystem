<template>
  <div>
    <div class="top-Box">
      <div class="top-box">
        <div class="top-box-left">欢迎来到小红帽后台系统</div>
        <div class="top-box-right">
          <div>{{ nowDate }}{{ nowTime }}</div>
          <div>天气:</div>
          <div v-if="this.adminUser">亲爱的：{{adminUser.username}}</div>
          <div v-else>很抱歉您还没有登录哦</div>
          <div @click="logout" class="logout">退出</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      nowDate: null, //存放年月日变量
      nowTime: null, //存放时分秒变量
      timer: "", //定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
      adminUser:[], //获取用户信息
      adminToken:"", //获取令牌
      Citys:{}
    };
  },
  methods: {
    //获取时间
    getTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      this.month = check(month);
      this.day = check(day);
      this.hour = check(hour);
      this.minute = check(minute);
      this.second = check(second);
      function check(i) {
        const num = i < 10 ? "0" + i : i;
        return num;
      }
      this.nowDate = year + "年" + this.month + "月" + this.day + "日";
      this.nowTime =
        this.hour + ":" + this.minute + ":" + this.second ;
    },
    //退出登录
    logout(){
      localStorage.removeItem('adminUser')
      this.$router.push('/login')
    },
    ...userActions(["setTianQi"])
  },
  mounted() {
    //获取时间
    this.timer = setInterval(this.getTime, 1000);
    //获取个人信息
    this.adminUser = JSON.parse(localStorage.getItem('adminUser'))
    this.adminToken = localStorage.getItem('adminToken')

    //获取天气
   this.getTianQi();
   console.log(this.City);
   
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除定时器
    }

  },
  watch: {},
  computed: {
    ...userState(["City"])
  }
};
</script>

<style scoped lang='scss'>
</style>