<template>
  <div class="UserListbox">
    <div class="userListbox">
      <div class="userListbox-serach">
        <div class="userListbox-serach1">
          <div>
            <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="adduser">添加用户</div>
        </div>
      </div>
      <div class="userListbox-nav">
        <!-- 用户表格 -->
        <div class="list_b">
          <el-table :data="userList" border stripe style="width: 100%">
            <!-- 下标 -->
            <el-table-column label="#" type="index" :index="indexMethod"></el-table-column>
            <!-- 下标 -->
            <el-table-column prop="username" label="姓名" width="100"></el-table-column>
            <!-- 姓名 -->
            <el-table-column prop="role_name" label="称号" width="230"></el-table-column>
            <!-- 角色 -->
            <el-table-column prop="email" label="邮箱" width="230"></el-table-column>
            <!-- 电话 -->
            <el-table-column prop="create_time" label="时间"></el-table-column>
            <!-- 状态 -->
            <el-table-column label="状态" width="80">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" @change="changeState(row)"></el-switch>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑角色" placement="top">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                  <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-setting"
                    @click="handleDelete(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="fenye">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[5, 10,15, 20]"
              :page-size="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
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
  name: "UserList",
  props: {},
  components: {},
  data() {
    return {
      keyword: "",
      pagenum: 1,
      pagesize: 5,
      query: "",
      id: "",
      value: true,
      currentPage4: 4,
      tableData: []
    };
  },
  methods: {
    //展开符运算
    ...mapActions(["getusers", "deleteUser"]),
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      console.log("每页条数" + this.pagesize);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log("当前页码" + this.pagenum);
    },
    //表格
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.deleteUser({
        id: row.id,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    //修改状态
    changeState(row){
      console.log(row);
    },
    //获取下标
    indexMethod(index) {
      return index * 1;
    },
    //获取用户列表
    getuserlist() {
      this.$store.dispatch("user/getusers", {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
      // console.log(this.tableData );
    }
  },
  mounted() {
    this.getuserlist();
  },
  watch: {},
  computed: {
    ...mapState(["userList", "total"])
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