<template>
  <div>
    <el-card class="box-card">
      <div class="contaner">
        <div class="leftbox">
          <div>
            <div
              class="itembox"
              v-for="(item,index) in tablist"
              :key="index"
              :class="[activeindex == index ? 'activeclass' : '']"
              @click="choseindex(index)"
            >{{item.title}}</div>
          </div>
        </div>
        <div class="rightbox">
          <!-- 设置商品属性 -->
          <div class="titlebox">设置商品属性</div>
          <!-- 步骤条 -->
          <div>
            <el-steps :active="activeindex" finish-status="success" align-center>
              <el-step title="基本信息"></el-step>
              <el-step title="商品参数"></el-step>
              <el-step title="商品属性"></el-step>
              <el-step title="商品照片"></el-step>
              <el-step title="商品内容"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </div>
          <!-- 基本信息 -->
          <div v-if="activeindex === 0">
            <div class="msgbox1">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="商品名称" prop="goodsname">
                  <el-input v-model="ruleForm.goodsname"></el-input>
                </el-form-item>
                 <el-form-item label="商品价格" prop="goodsprice">
                  <el-input v-model="ruleForm.goodsprice" :disabled="ruleForm.goodsname === '' ? true : false"></el-input>
                </el-form-item>
                 <el-form-item label="商品重量" prop="goodsweight">
                  <el-input v-model="ruleForm.goodsweight" :disabled="ruleForm.goodsprice === '' ? true : false"></el-input>
                </el-form-item>
                 <el-form-item label="商品数量" prop="goodsnumber">
                  <el-input v-model="ruleForm.goodsnumber" :disabled="ruleForm.goodsweight === '' ? true : false"></el-input>
                </el-form-item>
                 <el-form-item label="商品分类" prop="goodsclass">
                  <el-input v-model="ruleForm.goodsclass" :disabled="ruleForm.goodsnumber === '' ? true : false"></el-input>
                  
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div v-if="activeindex === 1">2</div>
          <div v-if="activeindex === 2">3</div>
          <div v-if="activeindex === 3">4</div>
          <div v-if="activeindex === 4">5</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("goods");
const { mapState, mapActions } = userModule;
export default {
  name: "addGoods",
  props: {},
  components: {},
  data() {
    return {
      type:"",
      activeindex: 0,
      tablist: [
        {
          title: "基本信息",
          id: "tab-0"
        },
        {
          title: "商品参数",
          id: "tab-1"
        },
        {
          title: "商品属性",
          id: "tab-2"
        },
        {
          title: "商品照片",
          id: "tab-3"
        },
        {
          title: "商品内容",
          id: "tab-4"
        }
      ],
      ruleForm: {
        goodsname: "",
        goodsprice:"",
        goodsweight:"",
        goodsnumber:"",
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        goodsprice: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { min: 1, message: "价至少大于1", trigger: "blur" }
        ],
        goodsweight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
          { message: "商品重量不能为空", trigger: "blur" }
        ],
        goodsnumber: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { message: "商品数量不能为空", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
     //展开符运算
    ...mapActions([
      "getcategories"
    ]),
    //选中index
    choseindex(index) {
      this.activeindex = index;
    },
    //获取goodslist
    getgoodslist(){
      this.getcategories({
        type, pagenum, pagesize
      })
    }
  },
  mounted() {},
  watch: {},
  computed:{
    ...mapState(["goodslist"])
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.contaner {
  display: flex;
  min-height: 500px;
  justify-content: space-between;
}
.leftbox {
  font-size: 14px;
  width: 10%;
  height: 350px;
  margin-top: 120px;
}
.itembox {
  height: 50px;
  border-right: 2px solid rgb(224, 224, 224);
  line-height: 50px;
  margin-left: 10px;
}
.rightbox {
  width: 85%;
}
.activeclass {
  color: rgb(64, 158, 255);
  border-right: 2px solid rgb(64, 158, 255);
}
.titlebox {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  background: rgb(244, 244, 245);
}
.msgbox {
  margin-top: 30px;
}
.msgbox1 {
  width: 100%;
  margin-top: 20px;
}
</style>