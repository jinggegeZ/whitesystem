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
        </div>
      </div>
      <div class="userListbox-nav">
        <!-- 用户表格 -->
        <div class="list_b">
          <el-table :data="orders" border stripe style="width: 100%">
            <!-- 下标 -->
            <el-table-column label="#" type="index" :index="indexMethod"></el-table-column>
            <!-- 下标 -->
            <el-table-column prop="order_number" label="订单编号" width="300" align="center"></el-table-column>
            <!-- 姓名 -->
            <el-table-column prop="order_price" label="订单价格" width="180" align="center"></el-table-column>
            <!-- 角色 -->
            <el-table-column prop="pay_statuss" label="是否付款" width="180" align="center">
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
            <!-- 电话 -->
            <el-table-column prop="is_send" label="是否发货" width="180" align="center"></el-table-column>
            <!-- 下单时间 -->
            <el-table-column prop="create_time" label="下单时间" width="330" align="center"></el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="180">
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
                    <span>编辑信息</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="changemsg">确 定</el-button>
                    </span>
                  </el-dialog>
                </template>
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
                    <span>123</span>
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
              :page-sizes="[20, 40,60, 80]"
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
const userModule = createNamespacedHelpers("order");
const { mapState, mapActions } = userModule;
export default {
  name: "OrderList",
  props: {},
  components: {},
  data() {
    return {
      keyword: "",
      pagenum: 1,
      pagesize: 27,
      query: "",
      user_id: "",
      pay_status: "",
      is_send: "",
      order_fapiao_title: [],
      order_fapiao_company: "",
      order_fapiao_content: "",
      consignee_addr: "",
      id: "",
      value: true,
      currentPage4: 1,
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      labelPosition: "right"
    };
  },
  methods: {
    //展开符运算
    ...mapActions(["getorders"]),
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
    //分配角色
    handleshare(index, row) {
      console.log(index, row);
      this.dialogVisible2 = true;
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
      return (index+1) * 1;
    },
    //获取用户列表
    getOrders() {
      this.$store.dispatch("order/getorders", {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query,
        user_id: this.user_id,
        pay_status: this.pay_status,
        is_send: this.is_send,
        order_fapiao_title: this.order_fapiao_title,
        order_fapiao_company: this.order_fapiao_company,
        order_fapiao_content: this.order_fapiao_content,
        consignee_addr: this.consignee_addr
      });
      // console.log(this.tableData );
    }
  },
  mounted() {
    this.getOrders();
  },
  watch: {},
  computed: {
    ...mapState(["orders", "total"])
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