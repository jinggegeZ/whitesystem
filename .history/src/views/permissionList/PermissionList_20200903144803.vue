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
            <el-table-column prop="authName" label="权限列表" width="180" align="center"></el-table-column>
            <!-- 角色 -->
            <el-table-column prop="level" label="权限等级" width="180" align="center">
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.pay_statuss == '已付款'"
                  :type="scope.row.tag === '已付款' ? 'primary' : 'success'"
                  disable-transitions
                >{{scope.row.pay_statuss}}</el-tag>
                <el-tag
                 v-if="scope.row.pay_statuss == '未付款'"
                  :type="scope.row.tag === '未付款' ? 'primary' : 'danger'"
                  disable-transitions
                >{{scope.row.pay_statuss}}</el-tag>
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
  name: "OrderList",
  props: {},
  components: {},
  data() {
    return {
  type:"list"
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
     getRights() {
      this.getrights({
        type: this.type
      });
    }
  },
  mounted() {
    this.getRights();
  },
  watch: {},
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