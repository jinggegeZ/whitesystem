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
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
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
      activeName: 'second'
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
       handleClick(tab, event) {
        console.log(tab, event);
      }
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