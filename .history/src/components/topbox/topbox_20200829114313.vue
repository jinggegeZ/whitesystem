<template>
  <div>
    <div class="top-Box">
      <div class="top-box">
        <div class="top-box-left">欢迎来到小白系统</div>
        <div class="top-box-right">
          <div>{{ nowDate }}{{ nowTime }}</div>
          <div></div>
          <div></div>
          <div></div>
        </div>
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
      nowDate: null, //存放年月日变量
      nowTime: null, //存放时分秒变量
      timer: "", //定义一个定时器的变量
      currentTime: new Date() // 获取当前时间
    };
  },
  methods: {
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
    }
  },
  mounted() {
    //获取时间
    this.timer = setInterval(this.getTime, 1000);
    //获取天气
    this.$axios
      .get("http://wthrcdn.etouch.cn/weather_mini?city=郑州")
      .then(function(response) {
        console.log(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });

  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除定时器
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>