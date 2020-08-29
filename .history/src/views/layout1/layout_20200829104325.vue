<template>
  <div class="homebox">
    <div class="leftbox">
      <leftbox></leftbox>
    </div>
    <div class="topbox">
      <topbox></topbox>
      <div class="sonbox">
      <template>
        <router-view />
      </template>
    </div>
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