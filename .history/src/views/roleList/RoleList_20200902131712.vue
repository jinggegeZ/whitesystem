<template>
  <div class="UserListbox">
    <div class="userListbox">
      <div class="userListbox-serach">
        <div class="userListbox-serach1">
          <div class="adduser" @click="opendiolog">添加用户</div>
           <template>
                  <el-dialog
                    title="添加角色"
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
                        <el-form-item label="角色姓名" prop="name" >
                          <el-input v-model="formLabelAlign1.name"></el-input>
                        </el-form-item>
                        <el-form-item label="角色描述" prop="description"  >
                          <el-input type="text" v-model="formLabelAlign1.description"></el-input>
                        </el-form-item>
                      </el-form>
                    </span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible1 = false">取 消</el-button>
                      <el-button type="primary" @click="addrole">确 定</el-button>
                    </span>
                  </el-dialog>
                </template>
        </div>
      </div>
      <div class="userListbox-nav">
        <!-- 用户表格 -->
        <div class="list_b">
          <el-table :data="roles" border stripe style="width: 100%">
          <!-- 展开符 -->
            <el-table-column label="" align="center" width="50"></el-table-column>
            <!-- 下标 -->
            <el-table-column label="#" type="index" :index="indexMethod" align="center"></el-table-column>
            <!-- 姓名 -->
            <el-table-column prop="roleName" label="姓名"  align="center"></el-table-column>     
            <!-- 角色 -->
            <el-table-column prop="roleDesc" label="描述"  align="center"></el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <el-button
                    size="mini"
                    type="primary"
                    
                    @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
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
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-button
                    size="mini"
                    type="danger"
                    
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
                  <el-button
                    size="mini"
                    type="warning"
                    @click="handleshare(scope.$index, scope.row)"
                  >分配权限</el-button>
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
        description:"",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            message: "用户名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        description: [
          { required: false, message: "请选择角色", trigger: "change" },
          {
            min:"6",
            message: "密码至少为6位",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    //展开符运算
    ...mapActions(["getroles","addroles"]),
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
    addrole(){
      this.dialogVisible1 = false
      this.addrole({
        roleName:this.formLabelAlign1.name,
        roleDesc:this.formLabelAlign1.description,
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
  },
  mounted() {
    this.getroles();
  },
  watch: {},
  computed: {
    ...mapState(["roles"])
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
  margin-left: 10px;
  border-radius: 5px;
}
.fenye {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>