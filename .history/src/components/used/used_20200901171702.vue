<template>
  <div>
    <div class="layout-sonbox-top" >
      <div class="layout-sonbox-top-item" v-for="item in Tabs" :key="item.path">
        <span class="vis">●</span> <span class="layout-sonbox-top-item2">{{item.name}}</span><span class="vis" @click="deletes(item)">X</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "used",
  props: {},
  components: {},
  data() {
    return {
      Tabs: []
    };
  },
  methods: {
    //获取local
    getlocal(){
      if (localStorage.getItem("uesdTabs")) {
      this.Tabs = JSON.parse(localStorage.getItem("uesdTabs"))
      console.log(this.Tabs);
    }
    },
    //删除元素
    deletes(item){
      console.log(item);
    }
  },
  mounted() {
  this.getlocal()
  },
  watch: {
    
  },
  computed: {

  }
};
</script>

<style scoped lang='scss'>
</style>