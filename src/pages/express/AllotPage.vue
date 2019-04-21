
<template>
  <div class="AllotPage-page">
    <MyTitle text = "快递单录入"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="目标配送点" prop="sendPointId">
        <el-select filterable v-model="ruleForm.sendPointId" placeholder="请选择目标配送点">
          <el-option
            v-for="item in entrepotList"
            :key="item.id"
            :label="item.entrepotName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="快递单号" prop="orders" class="is-required" style="vertical-align: top">
        <div class="tag-box">
          <div class="tag-btn">
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="medium"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="medium" @click="showInput">+ {{tagInfo.placeholder}}</el-button>
          </div>
          <div class="tag-show" :class="tagInfo.tagblock ? 'tag-block' : ''">
            <div class="tag-item" :key="tag" v-for="(tag,tagIndex) in dynamicTags">
              <el-tag
                closable
                :disable-transitions="false"
                @close="handleClose(tagIndex)">
                {{tag}}
              </el-tag>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="快递数量" prop="expressNum">
        <el-input v-model="ruleForm.expressNum" disabled placeholder="由订单号决定"></el-input>
      </el-form-item>

      <el-form-item label="快递公司" prop="fromCompanyId">
        <el-select filterable v-model="ruleForm.fromCompanyId" placeholder="请选择目标配送点">
          <el-option
            v-for="item in companyList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      

      <el-form-item>
        <div class='submit--btn hover' @click="submitForm('ruleForm')">立即新增</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AllotPage',
  data () {
    return {
      tagInfo: {
        lableTit: '快递单号',
        placeholder: '请填写快递单号'
      },
      dynamicTags: [],
      inputValue: '',
      inputVisible: false,
      ruleForm: {
        sendPointId: '',
        expressNum: 0,
        fromCompanyId: '',
      },
      rules: {
        sendPointId: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        fromCompanyId: [
          { required: true, message: '必填', trigger: 'blur' },
        ]
      },
      truckList: [], //车辆
      userList: [], //司机
      entrepotList: [], //配送点
      companyList: []
    }
  },
  methods: {
    async initData() {
      let { data } = await this.$http.post('/logistics/express/initDataForExpressInput.do', {});

      if(data.code == 1) {
        let result = data.result;
        this.truckList = result.truckList;
        this.userList = result.userList;
        this.entrepotList = result.entrepotList;
      } else {
        this.truckList = [];
        this.userList = [];
        this.entrepotList = [];
      }
    },
    async getCompany() {
      let { data } = await this.$http.post('/logistics/expressCompany/getExpressCompanyList.do', { status: 1 });

      if(data.code == 1) {
        this.companyList = data.result;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async add() {
      let ruleForm = this.ruleForm;
      let params = {
        orders: this.dynamicTags.join(','),
        expressInfo: {
          sendPointId: ruleForm.sendPointId,
          expressNum: ruleForm.expressNum,
          fromCompanyId: ruleForm.fromCompanyId
        }
      };

      let res = await this.$http.post('/logistics/express/save', params);
      let { data } = res;

      if(data.code == 1) {
        this.resetForm('ruleForm');
        this.successCb(data.message);
      } else {
        this.$message({
          message: data.message,
          type: data.code == 1 ? 'success' : 'error'
        });
      }
    },
    handleClose(index) {
      this.dynamicTags.splice(index, 1)
      this.ruleForm.expressNum--
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(value) {
      const inputValue = this.inputValue
      if (inputValue) {
        if (inputValue.length > this.tagInfo.limitCount) {
          this.$alert(`${this.tagInfo.lableTit}不得超过${this.tagInfo.limitCount}个字，添加失败！`, '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          })
          return false
        }
        for (var i = 0; i < this.dynamicTags.length; i++) {
          if (inputValue === this.dynamicTags[i]) {
            this.$alert('添加的内容不能重复', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              center: true
            })
            this.inputValue = ''
            return false
          }
        }
        this.dynamicTags.push(inputValue)
        this.ruleForm.expressNum++
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  created() {
    this.initData();
    this.getCompany();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tag-show {
    overflow: hidden;
    padding:5px 0 0;
    margin-bottom:-5px;
    .tag-item{
      float:left;
      .el-tag {
        margin-right:10px;
        margin-bottom:5px;
        min-height: 32px;
        padding: 6px 10px;
        line-height: 20px;
        height:auto;
      }
    }
  }
  .tag-block{
    .tag-item{
      float:none;
      display: block;
      .el-tag {
        margin-left: 0;
        white-space: normal;
      }
    }
  }
  .button-new-tag{
    width:100%;
    height: 38px;
    line-height: 36px;
    padding-top: 0;
    text-align: left;
    padding-bottom: 0;
    color: #c0c4cc;
    overflow:hidden;
  }
  .el-input.input-new-tag{
    width: 100%;
    vertical-align: bottom;
    margin-left: 0;
    overflow:hidden;
  }
</style>
