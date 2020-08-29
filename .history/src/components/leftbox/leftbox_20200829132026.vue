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
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
                :index="child.path"
                v-for="child in item.children"
                :key="child.path"
            >
              <span slot="title">{{ child.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.path" :key="item.path" v-else>
          <span slot="title">{{ item.name }}</span>
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
    return {};
  },
  methods: {
    ...userActions(["getMenus"])
  },
  mounted() {
    this.getMenus();
    console.log(this.menus);
  },
  watch: {},
  computed: {
    ...userState(["menus"])
  }
};
</script>

<style scoped lang='scss'>
</style>