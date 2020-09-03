<template>
  <div class="UserListbox">
    <div class="userListbox">
      <div class="userListbox-serach">
        <div class="userListbox-serach1">
          <div class="adduser" @click="opendiolog">添加商品</div>
        </div>
      </div>
      <div class="userListbox-nav">
        <!-- 用户表格 -->
        <div class="list_b">
          <el-table :data="goods" border stripe style="width: 100%">
            <!-- 下标 -->
            <el-table-column label="#" type="index" :index="indexMethod" align="center"></el-table-column>
            <!-- 姓名 -->
            <el-table-column prop="goods_name" label="商品名称" align="center" width="800"></el-table-column>
            <!-- 角色 -->
            <el-table-column prop="goods_price" label="商品价格" align="center"  width="60"></el-table-column>
            <!-- 角色 -->
            <el-table-column prop="goods_weight" label="商品重量" align="center" width="60"></el-table-column>
            <!-- 角色 -->
            <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
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
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 添加商品 -->
          <el-dialog
            title="添加商品"
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
                <el-form-item label="角色姓名" prop="roleName">
                  <el-input v-model="formLabelAlign.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                  <el-input type="text" v-model="formLabelAlign.roleDesc"></el-input>
                </el-form-item>
              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="addrole">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 编辑商品 -->
          <el-dialog
            title="编辑商品"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose1">
            <span>
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="formLabelAlign1"
                :rules="rules"
              >
                <el-form-item label="角色姓名" prop="roleName">
                  <el-input v-model="formLabelAlign1.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                  <el-input type="text" v-model="formLabelAlign1.roleDesc"></el-input>
                </el-form-item>
              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="changeorles">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 删除商品 -->
          <el-dialog
            title="删除商品"
            :visible.sync="dialogVisible2"
            width="30%"
            :before-close="handleClose1">
            <span>
              <img class="attentonmsg" src="../../../public/image/msg.png" alt />该操作永久删除该信息！确认继续？
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="deleteorles">确 定</el-button>
            </span>
          </el-dialog>
           <div class="fenye">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 40, 80,100]"
              :page-size="20"
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
const userModule = createNamespacedHelpers("goods");
const { mapState, mapActions } = userModule;
export default {
  name: "GoodsList",
  props: {},
  components: {},
  data() {
    return {
      keyword: "",
      pagenum: 1,
      pagesize: 20,
      query: "",
      currentPage:1,
      id: "",
      value: true,
      type: "tree",
      defaults: [],
      arrlist: [],
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      
      labelPosition: "right",
      formLabelAlign: {
        roleName: "",
        roleDesc: ""
      },
      formLabelAlign1: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            message: "用户名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        description: [
          { required: false, message: "请选择角色", trigger: "change" },
          {
            min: "6",
            message: "密码至少为6位",
            trigger: ["blur", "change"]
          }
        ]
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    //
    checkChange(data) {
      console.log("节点：", data, this.defaults);
      let len = this.defaults.filter(item => {
        return item === data.id;
      }).length;
      if (len === 0) {
        this.defaults.push(data.id);
      } else {
        this.defaults = this.defaults.filter(item => {
          return item !== data.id;
        });
      }
      console.log(this.defaults);
    },
    //展开符运算
    ...mapActions([
      "getgoods",
     
    ]),
      // 分页
    handleSizeChange(val) {
      console.log(val);
      // this.$store.dispatch("user/getusers", {
      //   pagenum: this.pagenum,
      //   pagesize: val,
      //   query: this.query
      // });
    },
    handleCurrentChange(val) {
      console.log(val);
      // this.pagenum = val;
      // this.$store.dispatch("user/getusers", {
      //   pagenum: val,
      //   pagesize: this.pagesize,
      //   query: this.query
      // });
    },
    //diolog打开弹框dialogVisible1
    opendiolog() {
      this.dialogVisible1 = true;
    },
    //确认添加角色dialogVisible1
    addrole() {
      this.dialogVisible1 = false;
      this.addroles({
        roleName: this.formLabelAlign.roleName,
        roleDesc: this.formLabelAlign.roleDesc
      });
    },
    //点击编辑dialogVisible
    handleEdit(index, row) {
      console.log(index, row);
      //打开diolog
      this.dialogVisible = true;
      this.formLabelAlign1.roleName = row.roleName;
      this.formLabelAlign1.roleDesc = row.roleDesc;
      this.id = row.id;
    },
    //确定编辑dialogVisible
    changeorles() {
      this.dialogVisible = false;
      this.changerolesmsg({
        id: this.id,
        roleName: this.formLabelAlign1.roleName,
        roleDesc: this.formLabelAlign1.roleDesc
      });
    },
    //点击删除dialogVisible2
    handleDelete(index, row) {
      console.log(index, row);
      this.dialogVisible2 = true;
      this.id = row.id;
    },
    //确定点击确认删除
    deleteorles() {
      this.dialogVisible2 = false;
      //编辑用户请求
      this.deleterolesUser({
        id: this.id
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
    //获取下标
    indexMethod(index) {
      return index * 1;
    },
    //gettights
    getDoods() {
      this.getgoods({
        pagenum: this.pagenum,
      pagesize: this.pagesize,
      query: this.query,
      });
    }
  },
  mounted() {
    this.getDoods();
  },
  watch: {
    goods: {
      handler() {
        console.log("得到数据");
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(["goods", "total"])
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