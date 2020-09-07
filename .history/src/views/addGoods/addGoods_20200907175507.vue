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
                  <el-input
                    v-model="ruleForm.goodsprice"
                    :disabled="ruleForm.goodsname === '' ? true : false"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goodsweight">
                  <el-input
                    v-model="ruleForm.goodsweight"
                    :disabled="ruleForm.goodsprice === '' ? true : false"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goodsnumber">
                  <el-input
                    v-model="ruleForm.goodsnumber"
                    :disabled="ruleForm.goodsweight === '' ? true : false"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
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
            </div>
            <div
              v-if="ruleForm.goodsname&&ruleForm.goodsprice&&ruleForm.goodsweight&&ruleForm.goodsnumber&&prop.label"
            >
              <div>
                <el-button type="success" @click="gonext(activeindex)">下一步</el-button>
              </div>
            </div>
          </div>
          <div v-if="activeindex === 1">
            <div class="nextbox">
              <el-button type="success" @click="gonext(activeindex)">下一步</el-button>
            </div>
          </div>
          <div v-if="activeindex === 2">
            <div class="nextbox1">
              <div class="nbx1-1">暂无属性</div>
              <div>
                <el-button type="success" @click="gonext(activeindex)">下一步</el-button>
              </div>
            </div>
          </div>
          <div v-if="activeindex === 3">
            <div class="nextbox1">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <div class="nbx2-2">
                <el-button type="success" @click="gonext(activeindex)">下一步</el-button>
              </div>
            </div>
          </div>
          <div v-if="activeindex === 4">
            <div class="nextbox3">
              <div id="main">
              <mavon-editor v-model="value" />
            </div>
            </div>
            <div class="nbx2-2">
                <el-button type="success" @click="submit">提交</el-button>
              </div>
          </div>
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
      type: "",
      value: "",
      pagenum: "",
      pagesize: "",
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
        goodsprice: "",
        goodsweight: "",
        goodsnumber: ""
      },
      //规则
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
        ]
      },
      options: [],

      prop: {
        vallue: "cat_id",
        label: "cat_name"
      },
    };
  },
  methods: {
    //展开符运算
    ...mapActions(["getcategories","addgoods"]),
    //选中index
    choseindex(index) {
      this.activeindex = index;
    },
    //获取goodslist
    getgoodslist() {
      this.getcategories({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    //点击选中
    changelabel(){
      console.log(this.prop.label);
    },
    // 点击下一步
    gonext(activeindex) {
      console.log(activeindex);
      this.activeindex = this.activeindex + 1;
      console.log(this.prop.label);
    },
    //监听markdown变化
    change(value, render) {
      this.html = render;
      this.blogInfo.blogMdContent = value;
      this.blogInfo.blogContent = render;
    },
   //提交信息
   submit(){
     this.addgoods({
       goods_name:this.ruleForm.goodsname,
       goods_cat:this.prop.label,
       goods_price:this.ruleForm.goodsprice,
       goods_number:this.ruleForm.goodsnumber,
       goods_weight:this.ruleForm.goodsweight,
       goods_introduce:this.goods_introduce,
       pics:this.pics,
       attrs:this.attrs
     })
   }
  },
  mounted() {
    this.getgoodslist();
  },
  watch: {},
  computed: { ...mapState(["goodslist"]) }
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
.openinput {
  width: 30%;
  display: flex;
  align-items: center;
}
.nextbox {
  margin-top: 50px;
  margin-left: 20px;
}
.nextbox1 {
  margin-top: 40px;
  margin-left: 20px;
}
.nbx1-1 {
  margin-bottom: 10px;
  font-size: 14px;
}
.nbx2-2 {
  margin-left: 20px;
  margin-top: 20px;
}
.nextbox3 {
  margin-top: 20px;
}
</style>