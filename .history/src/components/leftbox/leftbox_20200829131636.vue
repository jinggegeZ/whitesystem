<template>
  <div>
    <el-menu
        :default-active="$route.path"
        unique-opened
        router>
      <template v-for="item in menus">
        <el-submenu
            :index="item.url"
            :key="`${_uid}_${item.url}`"
            v-if="item.children && item.children.length > 0"
        >
          <template slot="title">
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
                :index="child.url"
                v-for="child in item.children"
                :key="child.url"
            >
              <span slot="title">{{ child.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.url" :key="item.url" v-else>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
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