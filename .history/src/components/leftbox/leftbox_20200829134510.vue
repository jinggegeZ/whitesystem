<template>
  <div>
    <el-menu
        :default-active="$route.path"
        unique-opened
        router>
      <template v-for="item in menus">
        <el-submenu
            :index="item.path"
            :key="item.id"
            v-if="item.children && item.children.length > 0"
        >
          <template slot="title">
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
                :index="children.path"
                v-for="children in item.children"
                :key="children.path"
            >
              <span slot="title">{{ children.authName }}</span>
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
      Menus:[],

    };
  },
  methods: {
    ...userActions(["getMenus"])
  },
  mounted() {
    this.getMenus();
    this.Menus = this.menus
    this.Msnus = this.Menus.unshift({authName:"首页" ,path:"/index",id:"001"})
    console.log(this.Menus);
  },
  watch: {},
  computed: {
    ...userState(["menus"])
  }
};
</script>

<style scoped lang='scss'>
</style>