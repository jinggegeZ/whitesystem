<template>
  <div>
    <el-menu :default-active="$route.path" unique-opened router>
      <template v-for="item in Arr">
        <el-submenu
          :index="item.path"
          :key="item.id"
          v-if="item.children && item.children.length > 0"
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
      Arr: [],
      firstIcon:[
        {
          icon:"el-icon-s-home"
        },
        {
          icon:"el-icon-user"
        },
        {
          icon:"el-icon-folder"
        },
        {
          icon:"el-icon-goods"
        },
        {
          icon:"el-icon-s-order"
        },
        {
          icon:"el-icon-message"
        }
      ],
      secondIcon:[
        {

        }
      ]
    };
  },
  methods: {
    ...userActions(["getMenus"])
  },
  mounted() {
    this.getMenus();
    if (this.menus) {
      this. Arr = this.menus;
      this.Arr.unshift({
        authName: "首页",
        path: "/index",
        children:[],
        id: "001"
      });
      this.Arr.map((item,index) => {
        this.firstIcon.map((item1,index1) => {
          if(index === index1){
            this.$set(item,"icon",item1)
          }
        })
      })
      console.log(this.Arr);
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