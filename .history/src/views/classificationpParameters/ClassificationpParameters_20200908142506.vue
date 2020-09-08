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
                <el-table :data="roles" border stripe style="width: 100%">
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
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="second">
            <div>
              <div>
                <el-button type="primary" size="medium">添加属性</el-button>
              </div>
              <div>
                <el-table :data="roles" border stripe style="width: 100%">
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
      prop: {
        value: "cat_id",
        label: "cat_name"
      },
      activeName: "second"
    };
  },
  methods: {
    //展开符
    ...mapActions(["getCateGories"]),
    //点击选中
    changelabel() {
      console.log(this.prop);
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
    handleEdit(index, row) {
      console.log(index, row);
      //打开diolog
      this.dialogVisible = true;
      this.formLabelAlign1.roleName = row.roleName;
      this.formLabelAlign1.roleDesc = row.roleDesc;
      this.id = row.id;
    },
      //点击删除dialogVisible2
    handleDelete(index, row) {
      console.log(index, row);
      this.dialogVisible2 = true;
      this.id = row.id;
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