<template>
  <div class="UserListbox">
    <div class="userListbox">
      <div class="userListbox-serach">
        <div class="userListbox-serach1">
          <div>
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="adduser">添加用户</div>
        </div>
      </div>
      <div class="userListbox-nav">
              <!-- 用户表格 -->
      <div class="list_b">
        <el-table :data="tableData"  border stripe style="width: 100%">
          <!-- 下标 -->
          <el-table-column prop="index" label="#" width="50"></el-table-column>
          <!-- 姓名 -->
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <!-- 角色 -->
          <el-table-column prop="role" label="角色" width="100"></el-table-column>
          <!-- 电话 -->
          <el-table-column prop="tel" label="电话" ></el-table-column>
          <!-- 邮箱 -->
          <el-table-column prop="name" label="邮箱" ></el-table-column>
          <!-- 状态 -->
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="value">{{ scope.row.date }}</el-switch>
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
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40">
    </el-pagination>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props: {},
  components: {},
  data() {
    return {
      input: "",
      input3:"",
      value: true,
        currentPage4: 4,
      tableData: [
        {
            index:'1',
            role:'teacher',
            tel:'1134112891',
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
            index:'2',
            role:'teacher',
            tel:'1134112891',
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
      ]

    };
  },
  methods: {
    // 分类
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //表格
    handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  },
  mounted() {},
  watch: {},
  computed: {}
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