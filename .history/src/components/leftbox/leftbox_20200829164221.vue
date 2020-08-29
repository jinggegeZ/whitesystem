<template>
  <div>
    <el-menu :default-active="$route.path" unique-opened router>
      <template v-for="item in arr">
        <el-submenu
          :index="item.path"
          :key="item.id"
          v-if="item.children"
        >
          <template slot="title">
            <i :class="item.icon.icon"></i>
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
      arr: [],
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
          icon:'el-icon-folder-opened'
        },
        //权限管理
        {
          icon:'el-icon-setting'
        },
        {
          icon:'el-icon-c-scale-to-original'
        },
        //商品管理
        {
          icon:'el-icon-help'
        },
        {
          icon:'el-icon-bell'
        },
        {
          icon:'el-icon-date'
        },
        //订单管理
        {
          icon:'el-icon-folder-add'
        },
        //数据统计
        {
          icon:'el-icon-position'
        },
        
        
      ]
    };
  },
  methods: {
    ...userActions(["getMenus"])
   
  },
  mounted() {
    this.getMenus();
    console.log(this.menus);
    if (this.menus) {
      this.menus.unshift({
        authName: "首页",
        path: "/index",
        children:[],
        id: "001"
      });
      this.arr = this.menus
      this.arr.map((item,index) => {
        
        this.firstIcon.map((item1,index1) => {
          if(index === index1){
            this.$set(item,"icon",item1)
          }
        })
      })
      
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