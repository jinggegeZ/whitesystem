<template>
  <div class="UserListbox">
    <div class="userListbox">
      <div class="userListbox-serach">
        <div class="userListbox-serach1">
          <div class="adduser" @click="opendiolog">添加分类</div>
        </div>
      </div>
      <div class="userListbox-nav">
        <!-- 用户表格 -->
        <div class="list_b">
          <el-table :data="goodslist" border stripe style="width: 100%" row-key="cat_id">
            <!-- 下标 -->
            <el-table-column label="#" type="index" :index="indexMethod" align="center"></el-table-column>
            <!-- 分类 -->
            <el-table-column prop="cat_name" label="分类名称" align="center"></el-table-column>
            <!-- 排序 -->
            <el-table-column prop="cat_deleted" label="是否有效" align="center">
               <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.cat_deleted == false"
                 
                ><i class="el-icon-success"></i>
                </el-tag>
                 <el-tag
                  v-if="scope.row.cat_deleted == true"
                  
                ><i class="el-icon-close"></i>
                </el-tag>
              </template>
            </el-table-column>
          <!-- 排序 -->
            <el-table-column prop="cat_levels" label="排序" align="center">
               <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.cat_levels == '一级'"
                  :type="scope.row.tag === '一级' ? 'primary' : 'success'"
                  disable-transitions
                >{{scope.row.cat_levels}}</el-tag>
                <el-tag
                  v-if="scope.row.cat_levels == '二级'"
                  :type="scope.row.tag === '二级' ? 'primary' : 'danger'"
                  disable-transitions
                >{{scope.row.cat_levels}}</el-tag>
                <el-tag
                  v-if="scope.row.cat_levels == '三级'"
                  :type="scope.row.tag === '三级' ? 'primary' : 'primary'"
                  disable-transitions
                >{{scope.row.cat_levels}}</el-tag>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" align="center">
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
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="fenye">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10,20,30,40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totals"
            ></el-pagination>
          </div>
          <!-- 添加分类 -->
          <el-dialog
            title="添加分类"
            :visible.sync="dialogVisible1"
            width="30%"
            :before-close="handleClose1">
            <span>
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="formLabelAlign1"
                :rules="rules"
              >
                <el-form-item label="分类名称" prop="name">
                  <el-input v-model="formLabelAlign1.name"></el-input>
                </el-form-item>
                <el-form-item label="父类名称" prop="password">
                  <el-cascader
                    :options="goodslist"
                    :props="prop"
                    v-model="prop.label"
                    clearable
                    @change="changelabel"
                    :disabled="ruleForm.goodsnumber === '' ? true : false"
                  >
                    <template slot-scope="{ node, data }">
                      <span>{{ data.cat_name }}</span>
                      <span v-if="!node.isLeaf">{{ data.children.cat_name }}</span>
                    </template>
                  </el-cascader>
                </el-form-item>
              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 编辑信息 -->
          <el-dialog
            title="编辑信息"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
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
       
          <!-- 删除角色 -->
          <el-dialog
              title="删除角色"
              :visible.sync="dialogVisible3"
              width="30%"
              :before-close="handleClose1">
              <span>
                <img class="attentonmsg" src="../../../public/image/msg.png" alt />该操作永久删除该信息！确认继续？
              </span>
              <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="deleteuser">确 定</el-button>
              </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("goods");
const { mapState, mapActions } = userModule;
export default {
  name: "CommodityClassification",
  props: {},
  components: {},
  data() {
    return {
      keyword: "",
      pagenum: 1,
      pagesize: 10,
      query: "",
      id: "",
      value: true,
      type:3,
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      currentPage4: 1,
      dialogVisible3: false,
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        email: "",
        mobile: ""
      },
      formLabelAlign1: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            message: "用户名不能为空",
            trigger: ["blur", "change"]
          }
        ]
      },
      prop: {
        value: "cat_id",
        label: "cat_name"
      },
    };
  },
  methods: {
    //展开符运算
    ...mapActions([
      "getcategories",
    ]),
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
      this.formLabelAlign.name = row.username;
      this.formLabelAlign.email = row.email;
      this.formLabelAlign.mobile = row.mobile;
      this.id = row.id;
    },
    changemsg() {
      this.dialogVisible = false;
      //编辑用户请求
      this.changeusermsg({
        id: this.id,
        email: this.formLabelAlign.email,
        mobile: this.formLabelAlign.mobile,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
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
      this.dialogVisible3 = true
      console.log(index, row);
      this.id = row.id
    },
    deleteuser(){
      this.dialogVisible3 = false
      this.deleteUser({
        id:this.id,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
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
    opendiolog() {
      this.dialogVisible1 = true;
    },
    //添加用户
    addUser() {
      this.dialogVisible1 = false;
      this.addUsers({
        username: this.formLabelAlign1.name,
        password: this.formLabelAlign1.password,
        email: this.formLabelAlign1.email,
        mobile: this.formLabelAlign1.mobile,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
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
    //获取所有分类
    getCategories(){
      this.getcategories({
        type:this.type,
        pagenum:this.pagenum,
        pagesize:this.pagesize
      })
    }
 
  },
  mounted() {
   this.getCategories()
  },
  watch: {},
  computed: {
    ...mapState(["goodslist","totals"])
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