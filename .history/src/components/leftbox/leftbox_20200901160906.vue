<template>
  <div>
    <el-menu :default-active="$route.path" unique-opened router>
      <template v-for="item in menus">
        <el-submenu
          :index="item.path"
          :key="item.id"
          v-if="item.children"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="children.path"
              v-for="children in item.children"
              :key="children.path"
            >
              <i :class="children.icon"></i>
              <span slot="title" @click="chose(children)">{{ children.authName }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.path" :key="item.path" v-else>
          <span slot="title">{{ item.authName }}</span>
        </el-menu-item>
      </template>
    </el-menu>
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
      activeIndex:'/index',
      addresslist:[]
    };
  },
  methods: {
    
    ...userActions(["getMenus"]),
   //选择子元素
   chose(children){
     
     console.log(children);
     let address = children
     let msgs = []
     if(this.addresslist.authname != address.authname){
       msgs.push(address)
       localStorage.setItem("msgs",msgs)
     }
   }
  },
  mounted() {
    this.getMenus();
    if(localStorage){
      this.addresslist = localStorage.getItem('msgs')
    console.log(this.addresslist);
    }
    
  },
  watch: {},
  computed: {
    ...userState(["menus"])
  }
};
</script>

<style scoped lang='scss'>
</style>