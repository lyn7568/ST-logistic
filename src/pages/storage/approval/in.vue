
<template>
  <div class="Add-page">
    <MyTitle text = "新增店铺"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="ruleForm.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="店铺编号" prop="number">
        <el-input v-model="ruleForm.number" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址" prop="address">
        <el-input v-model="ruleForm.address" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="店铺描述" prop="describe">
        <el-input type="textarea" :rows="6" v-model="ruleForm.describe" maxlength="3000"></el-input>
      </el-form-item>

      <el-form-item>
        <div class='submit--btn hover' @click="submitForm('ruleForm')">立即新增</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        number: '',
        address: '',
        describe: ''
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
      let params = {
        name: ruleForm.name,
        number: ruleForm.number,
        address: ruleForm.address,
        describe: ruleForm.describe
      }

      let res = await this.$http.post('/logistics/user/save.do', params);
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
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
