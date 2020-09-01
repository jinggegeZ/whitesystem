<template>
  <div class="layout-homebox">
    <div class="layout-topbox"><topbox></topbox></div>
    <div class="layout-navbox">
      <div class="layout-leftbox"><leftbox></leftbox></div>
      <div class="layout-sonbox">
        <div class="layout-sonbox-top"></div>
        <div>
          <template>
        <router-view />
      </template>
        </div>
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