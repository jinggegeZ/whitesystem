<template>
 <div>
    <div class="top-Box">
        <div class="top-box">
            <div class="top-box-left">欢迎来到小白系统</div>
            <div class="top-box-right">
                <div>{{date}}</div>
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
   name: '',
   props: {
   },
   components: {

   },
   data () {
     return {
  date: new Date()
     }
   },
   methods: {

   },
   mounted() {
         let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>