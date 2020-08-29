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

     }
   },
   methods: {

   },
   mounted() {
       console.log(dayjs());
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>