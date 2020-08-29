<template>
  <div class="homebox">
    <div class="topbox"><topbox></topbox></div>
    <div class="navbox">
      <div class="leftbox"><leftbox></leftbox></div>
      <div></div>
    </div>
    
  </div>
</template>

<script>
import topbox from "../../components/topbox/topbox";
import leftbox from "../../components/leftbox/leftbox";
 export default {
   name: '',
   props: {
   },
   components: {
     topbox,
    leftbox
   },
   data () {
     return {

     }
   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>