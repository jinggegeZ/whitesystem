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
          <div class="adduser" @click="addGoods">添加商品</div>
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <el-button
                    icon="el-icon-edit"
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-button
                    icon="el-icon-delete"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
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
                <el-form-item label="商品名称" prop="goodsName">
                  <el-input v-model="formLabelAlign1.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goodsPrice">
                  <el-input type="text" v-model="formLabelAlign1.goodsPrice"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goodsNum">
                  <el-input type="text" v-model="formLabelAlign1.goodsNum"></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goodsWeight">
                  <el-input type="text" v-model="formLabelAlign1.goodsWeight"></el-input>
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
              <el-button type="primary" @click="deleteGoods">确 定</el-button>
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
      id: 0,
      value: true,
      type: "tree",
      defaults: [],
      arrlist: [],
      tableData: [],
      dialogVisible: false,
     
      dialogVisible2: false,
      
      labelPosition: "right",
      formLabelAlign: {
        roleName: "",
        roleDesc: ""
      },
      formLabelAlign1: {
        goodsName: "",
        goodsPrice: "",
        goodsNum:"",
        goodsWeight:""
      },
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名", trigger: "change" },
          {
            message: "商品名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        goodsPrice: [
          { required: true, message: "请输入商品价格", trigger: "change" },
          {
            message: "价格不能为空",
            trigger: ["blur", "change"]
          }
        ],
        goodsNum: [
          { required: true, message: "请输入商品数量", trigger: "change" },
          {
            message: "数量不能为空",
            trigger: ["blur", "change"]
          }
        ],
        goodsWeight: [
          { required: true, message: "请输入商品重量", trigger: "change" },
          {
            message: "重量不能为空",
            trigger: ["blur", "change"]
          }
        ],
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
      "deletegoods"
    ]),
      // 分页
    handleSizeChange(val) {
      console.log(val);
      this.$store.dispatch("goods/getgoods", {
        pagenum: this.pagenum,
        pagesize: val,
        query: this.query
      });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pagenum = val;
      this.$store.dispatch("goods/getgoods", {
        pagenum: val,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    //diolog前往addgoods
    addGoods() {
      this.$router.push("/addGoods")
    },
    //点击编辑dialogVisible
    handleEdit(index, row) {
      
      //打开diolog
      this.dialogVisible = true;
      this.formLabelAlign1.roleName = row.roleName;
      this.formLabelAlign1.roleDesc = row.roleDesc;
      this.id = row.id;
      console.log(index, row);
    },
    //确定编辑dialogVisible
    changeorles() {
      this.dialogVisible = false;
      this.changeorles({
        id: this.id,
        roleName: this.formLabelAlign1.roleName,
        roleDesc: this.formLabelAlign1.roleDesc
      });
    },
    //点击删除dialogVisible2
    handleDelete(index, row) {
      console.log(index, row);
      this.dialogVisible2 = true;
      this.id =row.goods_id;
      console.log(this.id);

      
    },
    //确定点击确认删除
    deleteGoods() {
      this.dialogVisible2 = false;
      //编辑用户请求
      this.deletegoods({
        id: this.id,
        pagenum:this.pagenum,
        pagesize:this.pagesize,
        query:this.query
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