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
      // console.log(this.Tabs);
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
        // 监听路由跳转
    "$route.path": {
      handler(val) {
        this.getlocal();
        console.log("菜单：", val);
        this.currentPath = val; //val是路由跳转的path
      },
      immediate: true, //立即执行
    },
  },
  computed: {

  }
};
</script>

<style scoped lang='scss'>
</style>