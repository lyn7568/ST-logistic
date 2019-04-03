
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

      <el-form-item label="快件数量" prop="expressNum">
        <el-input v-model="ruleForm.expressNum" ></el-input>
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
      ruleForm: {
        sendPointId: '',
        expressNum: '',
        fromCompanyId: '',
      },
      rules: {
        sendPointId: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        expressNum: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        fromCompanyId: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
      },
      truckList: [], //车辆
      userList: [], //司机
      entrepotList: [], //配送点
      companyList: [],
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
          this.showWarn('参数不正确')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async add() {
      let ruleForm = this.ruleForm;
      let params = { ...ruleForm };

      let res = await this.$http.post('/logistics/express/save.do', params);
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
  },
  created() {
    this.initData();
    this.getCompany();
  }
}
</script>

<style scoped lang='scss'>

</style>
