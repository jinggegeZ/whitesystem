<template>
  <div>
    <el-menu :default-active="$route.path" unique-opened router>
      <template v-for="item in menus">
        <el-submenu :index="item.path" :key="item.id" v-if="item.children">
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
      activeIndex: "/index",
      addresslist: []
    };
  },
  methods: {
    ...userActions(["getMenus"]),
    //选择子元素
    chose(children) {
      let msgs = [];
      this.addresslist = localStorage.getItem("msgs");
      if (this.addresslist) {
         this.addresslist.map(item => {
        if (item.path != children.path) {
          msgs.push({
        path: children.path,
        name: children.authName
      });
          localStorage.setItem("msgs", msgs);
        }
      });
      }
      
      
      console.log(msgs);
     
    }
  },
  mounted() {
    this.getMenus();
    this.addresslist = localStorage.getItem("msgs");
    if (this.addresslist) {
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