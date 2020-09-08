<template>
  <div>
    <el-card :body-style="{ padding: '10px' }">
      <div class="top">
        <div class="ml">
          <i class="el-icon-warning"></i>
        </div>注意:只允许为第三级分类设置相关参数!
      </div>
      <div>
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="商品分类" prop="goodsclass">
            <el-cascader
              :options="Goodslist"
              :props="prop"
              v-model="prop.label"
              clearable
              @change="changelabel"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.cat_name }}</span>
                <span v-if="!node.isLeaf">{{ data.children.cat_name }}</span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first">
            <div>
              <div>
                <el-button type="primary" size="medium">添加参数</el-button>
              </div>
              <div>
                <el-table :data="roles1" border stripe style="width: 100%">
                  <!-- 下标 -->
                  <el-table-column label="#" type="index" :index="indexMethod" align="center"></el-table-column>
                  <!-- 展开符 -->
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <div class="cloumnbox2" v-for="item in props.row.children" :key="item.id">
                        <!-- 一级权限 -->
                        <div v-if="item.children" class="cloumnbox2-left">
                          <el-tag type="danger" closable>{{item.authName}}</el-tag>
                        </div>
                      </div>
                    </template>
                  </el-table-column>

                  <!-- 姓名 -->
                  <el-table-column prop="roleName" label="姓名" align="center"></el-table-column>
                  <!-- 操作 -->
                  <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <el-button
                          size="mini"
                          type="primary"
                          @click="handleEditd(scope.$index, scope.row)"
                        >编辑</el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDeleted(scope.$index, scope.row)"
                        >删除</el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 编辑角色 -->
                <el-dialog
                  title="编辑角色"
                  :visible.sync="dialogVisibled1"
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
                <!-- 删除角色 -->
                <el-dialog
                  title="删除角色"
                  :visible.sync="dialogVisibled2"
                  width="30%"
                  :before-close="handleClose1"
                >
                  <span>
                    <img class="attentonmsg" src="../../../public/image/msg.png" alt />该操作永久删除该信息！确认继续？
                  </span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="deleteorles">确 定</el-button>
                  </span>
                </el-dialog>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="second">
            <div>
              <div>
                <el-button type="primary" size="medium">添加属性</el-button>
              </div>
              <div>
                <el-table :data="roles2" border stripe style="width: 100%">
                  <!-- 下标 -->
                  <el-table-column label="#" type="index" :index="indexMethod" align="center"></el-table-column>
                  <!-- 展开符 -->
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <div class="cloumnbox2" v-for="item in props.row.children" :key="item.id">
                        <!-- 一级权限 -->
                        <div v-if="item.children" class="cloumnbox2-left">
                          <el-tag type="danger" closable>{{item.authName}}</el-tag>
                        </div>
                      </div>
                    </template>
                  </el-table-column>

                  <!-- 姓名 -->
                  <el-table-column prop="roleName" label="姓名" align="center"></el-table-column>
                  <!-- 操作 -->
                  <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <el-button
                          size="mini"
                          type="primary"
                          @click="handleEditj(scope.$index, scope.row)"
                        >编辑</el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDeletej(scope.$index, scope.row)"
                        >删除</el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 编辑角色 -->
                <el-dialog
                  title="编辑角色"
                  :visible.sync="dialogVisiblej1"
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
                <!-- 删除角色 -->
                <el-dialog
                  title="删除角色"
                  :visible.sync="dialogVisiblej2"
                  width="30%"
                  :before-close="handleClose1"
                >
                  <span>
                    <img class="attentonmsg" src="../../../public/image/msg.png" alt />该操作永久删除该信息！确认继续？
                  </span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="deleteorles">确 定</el-button>
                  </span>
                </el-dialog>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("goods");
const { mapState, mapActions } = userModule;
export default {
  name: "ClassificationpParameters",
  props: {},
  components: {},
  data() {
    return {
      type: "",
      pagenum: "",
      pagesize: "",
      dialogVisibled1: false,
      dialogVisibled2: false,
      dialogVisiblej1: false,
      dialogVisiblej2: false,
      labelPosition: "right",
      prop: {
        value: "cat_id",
        label: "cat_name"
      },
      activeName: "second",
      roles1:[],
      roles2:[],
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
    };
  },
  methods: {
    //展开符
    ...mapActions(["getCateGories",""]),
    //点击选中
    changelabel() {
      console.log(this.prop.label);
      
    },
    //获取goodslist
    getgoodslist() {
      this.getCateGories({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    //点击事件
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //获取下标
    indexMethod(index) {
      return index * 1;
    },
    //点击编辑dialogVisible
    handleEditd(index, row) {
      console.log(index, row);
      //打开diolog
      this.dialogVisibled1 = true;
      this.formLabelAlign1.roleName = row.roleName;
      this.formLabelAlign1.roleDesc = row.roleDesc;
      this.id = row.id;
    },
    handleEditj(index, row) {
      console.log(index, row);
      //打开diolog
      this.dialogVisiblej1 = true;
      this.formLabelAlign1.roleName = row.roleName;
      this.formLabelAlign1.roleDesc = row.roleDesc;
      this.id = row.id;
    },
    //点击删除dialogVisible2
    handleDeleted(index, row) {
      console.log(index, row);
      this.dialogVisibled2 = true;
      this.id = row.id;
    },
    handleDeletej(index, row) {
      console.log(index, row);
      this.dialogVisiblej2 = true;
      this.id = row.id;
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
      //确定编辑dialogVisible
    changeorles() {
      this.dialogVisible = false;
      this.changerolesmsg({
        id: this.id,
        roleName: this.formLabelAlign1.roleName,
        roleDesc: this.formLabelAlign1.roleDesc
      });
    },
      //确定点击确认删除
    deleteorles() {
      this.dialogVisible2 = false;
      //编辑用户请求
      this.deleterolesUser({
        id: this.id
      });
    },
  },
  mounted() {
    this.getgoodslist();
  },
  watch: {},
  computed: {
    ...mapState(["Goodslist"])
  }
};
</script>

<style scoped lang='scss'>
.top {
  width: 100%;
  height: 37px;
  display: flex;
  font-size: 14px;
  color: #e6a23c;
  align-items: center;
  background: rgb(253, 246, 236);
  border-radius: 3px;
  margin-bottom: 20px;
}
.ml {
  margin-left: 20px;
  margin-right: 15px;
  font-size: 22px;
}
</style>