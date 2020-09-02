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
          <div class="adduser" @click="opendiolog">添加用户</div>
           <template>
                  <el-dialog
                    title="添加用户"
                    :visible.sync="dialogVisible1"
                    width="30%"
                    :before-close="handleClose1"
                  >
                    <span>
                      <el-form
                        :label-position="labelPosition"
                        label-width="80px"
                        :model="formLabelAlign1"
                        :rules="rules"

                      >
                        <el-form-item label="用户姓名" prop="name">
                          <el-input v-model="formLabelAlign1.name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码" prop="password">
                          <el-input type="password" v-model="formLabelAlign1.password"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                          <el-input v-model="formLabelAlign1.email"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="mobile">
                          <el-input v-model="formLabelAlign1.mobile"></el-input>
                        </el-form-item>
                        
                      </el-form>
                    </span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible1 = false">取 消</el-button>
                      <el-button type="primary" @click="addUser">确 定</el-button>
                    </span>
                  </el-dialog>
                </template>
        </div>
      </div>
      <div class="userListbox-nav">
        <!-- 用户表格 -->
        <div class="list_b">
          <el-table :data="userList" border stripe style="width: 100%">
            <!-- 下标 -->
            <el-table-column label="#" type="index" :index="indexMethod"></el-table-column>
            <!-- 下标 -->
            <el-table-column prop="username" label="姓名" width="200"></el-table-column>
            <!-- 姓名 -->
            <el-table-column prop="role_name" label="称号" width="330"></el-table-column>
            <!-- 角色 -->
            <el-table-column prop="email" label="邮箱" width="330"></el-table-column>
            <!-- 电话 -->
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <!-- 状态 -->
            <el-table-column label="状态" width="70">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" @change="change(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="330">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑角色" placement="top">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <template>
                  <el-dialog
                    title="编辑信息"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                  >
                    <span>
                      <el-form
                        :label-position="labelPosition"
                        label-width="80px"
                        :model="formLabelAlign"
                      >
                        <el-form-item label="用户名" disabled>
                          <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                          <el-input v-model="formLabelAlign.email"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="mobile">
                          <el-input v-model="formLabelAlign.mobile"></el-input>
                        </el-form-item>
                      </el-form>
                    </span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="changemsg">确 定</el-button>
                    </span>
                  </el-dialog>
                </template>
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
                    @click="handleshare(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <template>
                  <el-dialog
                    title="编辑信息"
                    :visible.sync="dialogVisible2"
                    width="30%"
                    :before-close="handleClose"
                  >
                    <span>
                    123
                    </span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible2 = false">取 消</el-button>
                      <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                    </span>
                  </el-dialog>
                </template>
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
      tableData: [],
      dialogVisible: false,
      dialogVisible1:false,
      dialogVisible2:false,
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        email: "",
        mobile: ""
      },
      formLabelAlign1: {
        name: "",
        password:"",
        email: "",
        mobile: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            
            message: "用户名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "请输入邮箱地址", trigger: "change" },
          {
            min:"6",
            message: "密码至少为6位",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          { required: false, message: "请输入邮箱地址", trigger: "change" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: false, message: "请输入电话", trigger: "change" },
          {
           min:"11",
           max:'11',
            message: "请输入正确的手机号码",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    //展开符运算
    ...mapActions(["getusers", "deleteUser", "changUsertype","addUsers","changeusermsg"]),
    // 分页
    handleSizeChange(val) {
      
      this.$store.dispatch("user/getusers", {
        pagenum: this.pagenum,
        pagesize: val,
        query: this.query
      });
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.$store.dispatch("user/getusers", {
        pagenum: val,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    //表格
    handleEdit(index, row) {
      console.log(index, row);
      //打开diolog
      this.dialogVisible = true;
      this.formLabelAlign.name = row.username
      this.formLabelAlign.email = row.email
      this.formLabelAlign.mobile = row.mobile
      this.id = row.id
    },
    changemsg(){
      this.dialogVisible = false
      //编辑用户请求
      this.changeusermsg({
        id: this.id,
        email: this.formLabelAlign.email,
        mobile: this.formLabelAlign.mobile,
         pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      })
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          this.formLabelAlign.name = "";
          this.formLabelAlign.email = "";
          this.formLabelAlign.email = "";
        })
        .catch(() => {});
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
      this.deleteUser({
        id: row.id,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    //分配角色
    handleshare(index, row){
       console.log(index, row);
       this.dialogVisible2 = true
    },
    //修改状态
    change(e) {
      console.log(e);
      this.changUsertype({
        uId: e.id,
        type: e.mg_state,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    //打开弹框
    opendiolog(){
      this.dialogVisible1 = true
    },
    //添加用户
    addUser(){
      
      this.dialogVisible1 = false
      this.addUsers({
        username:this.formLabelAlign1.name,
        password:this.formLabelAlign1.password,
        email:this.formLabelAlign1.email,
        mobile:this.formLabelAlign1.mobile,
         pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      })
    },
     handleClose1(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          this.formLabelAlign.name = "";
          this.formLabelAlign.email = "";
          this.formLabelAlign.email = "";
        })
        .catch(() => {});
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