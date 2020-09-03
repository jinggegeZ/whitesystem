<template>
  <div class="UserListbox">
    <div class="userListbox">
      <div class="userListbox-nav">
        <!-- 用户表格 -->
        <div class="list_b">
          <el-table :data="Rights" border stripe style="width: 100%">
            <!-- 下标 -->
            <el-table-column label="#" type="index" :index="indexMethod"></el-table-column>
            <!-- 姓名 -->
            <el-table-column prop="authName" label="权限列表" align="center"></el-table-column>
            <!-- 角色 -->
            <el-table-column prop="level" label="权限等级" align="center">
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.levels == '一级'"
                  :type="scope.row.tag === '一级' ? 'primary' : 'success'"
                  disable-transitions
                >{{scope.row.levels}}</el-tag>
                <el-tag
                  v-if="scope.row.levels == '二级'"
                  :type="scope.row.tag === '二级' ? 'primary' : 'danger'"
                  disable-transitions
                >{{scope.row.levels}}</el-tag>
                <el-tag
                  v-if="scope.row.levels == '三级'"
                  :type="scope.row.tag === '三级' ? 'primary' : 'primary'"
                  disable-transitions
                >{{scope.row.levels}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState, mapActions } = userModule;
export default {
  name: "PermissionList",
  props: {},
  components: {},
  data() {
    return {
      type: "list"
    };
  },
  methods: {
    //展开符运算
    ...mapActions(["getRights"]),
    //获取下标
    indexMethod(index) {
      return index * 1;
    },
    //获取用户列表
    getRightss() {
      this.getRights({
        type: this.type
      });
    }
  },
  mounted() {
    this.getRightss();
  },
  watch: {
     Rights: {
      handler() {
        console.log("得到数据");
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(["Rights"])
  }
};
</script>

<style scoped lang='scss'>
.UserListbox {
  padding: 5px;
}
.userListbox {
  width: 100%;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 5px;
}
.list_b {
  width: 95%;
  height: 95%;
}
.userListbox-nav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.userListbox-serach {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.userListbox-serach1 {
  width: 95%;
  display: flex;
  align-items: center;
}
.serachbox {
  width: 47px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.adduser {
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
  background: rgb(64, 158, 255);
  margin-left: 30px;
  border-radius: 5px;
}
.fenye {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>