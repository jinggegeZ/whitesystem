<template>
  <div class="UserListbox">
    <div class="userListbox">
      <div class="userListbox-serach">
        <div class="userListbox-serach1">
          <div class="adduser" @click="opendiolog">添加用户</div>
        </div>
      </div>
      <div class="userListbox-nav">
        <!-- 用户表格 -->
        <div class="list_b">
          <el-table :data="roles" border stripe style="width: 100%">
            <!-- 展开符 -->
            <el-table-column label prop="arrow" align="center" width="50"></el-table-column>
            <!-- 下标 -->
            <el-table-column label="#" type="index" :index="indexMethod" align="center"></el-table-column>
            <!-- 姓名 -->
            <el-table-column prop="roleName" label="姓名" align="center"></el-table-column>
            <!-- 角色 -->
            <el-table-column prop="roleDesc" label="描述" align="center"></el-table-column>
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
                <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
                  <el-button
                    size="mini"
                    type="warning"
                    @click="handleshare(scope.$index, scope.row)"
                  >分配权限</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
            <!-- 添加角色 -->
            <el-dialog
              title="添加角色"
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
           <!-- 分配权限 -->
              <el-dialog
                  title="分配权限"
                  :visible.sync="dialogVisible3"
                  width="60%"
                  :before-close="handleClose">
                  <span>
                    <el-tree
                      :data="data"
                      node-key="id"
                      default-expand-all
                      @node-drag-start="handleDragStart"
                      @node-drag-enter="handleDragEnter"
                      @node-drag-leave="handleDragLeave"
                      @node-drag-over="handleDragOver"
                      @node-drag-end="handleDragEnd"
                      @node-drop="handleDrop"
                      draggable
                      :allow-drop="allowDrop"
                      :allow-drag="allowDrag"
                    ></el-tree>
                  </span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
                  </span>
              </el-dialog>
            <!-- 编辑角色 -->
              <el-dialog
                    title="编辑角色"
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
              <!-- 删除角色 -->
              <el-dialog
                    title="删除角色"
                    :visible.sync="dialogVisible2"
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
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
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
      // 树状图内容
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2",
              children: [
                {
                  id: 11,
                  label: "三级 3-2-1"
                },
                {
                  id: 12,
                  label: "三级 3-2-2"
                },
                {
                  id: 13,
                  label: "三级 3-2-3"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    //展开符运算
    ...mapActions([
      "getroles",
      "addroles",
      "changerolesmsg",
      "deleterolesUser"
    ]),
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
    //点击分配角色dialogVisible3
    handleshare(index, row) {
      console.log(index, row);
      this.dialogVisible3 = true;
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
    // 树状图事件部分
    handleDragStart(node, ev) {
      console.log("drag start", node, ev);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label, ev);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label, ev);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label, ev);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType, ev);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType, ev);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    }
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
.attentonmsg {
  width: 25px;
  height: 25px;
}
</style>