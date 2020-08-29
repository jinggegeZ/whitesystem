<template>
  <div>
    <div class="top-Box">
      <div class="top-box">
        <div class="top-box-left">欢迎来到小白系统</div>
        <div class="top-box-right">
          <div>{{ nowDate }}{{ nowTime }}</div>
          <div id="he-plugin-simple"></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
<script>
WIDGET = {
  CONFIG: {
    "modules": "01234",
    "background": 1,
    "tmpColor": "FFFFFF",
    "tmpSize": 16,
    "cityColor": "FFFFFF",
    "citySize": 16,
    "aqiSize": 16,
    "weatherIconSize": 24,
    "alertIconSize": 18,
    "padding": "10px 10px 10px 10px",
    "shadow": "1",
    "language": "auto",
    "borderRadius": 5,
    "fixed": "false",
    "vertical": "middle",
    "horizontal": "center",
    "key": "09e5c20e78984345b2805cb502fb79cc"
  }
}
</script>
<script src="https://widget.heweather.net/simple/static/js/he-simple-common.js?v=1.1"></script>
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