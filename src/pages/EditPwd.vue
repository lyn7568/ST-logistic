
<template>
  <div class="StaffAdd-page">
    <MyTitle text = "修改密码"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="原始密码" prop="oldPassword">
        <el-input v-model="ruleForm.oldPassword" type = "password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPassword">
        <el-input v-model="ruleForm.loginPassword" type = "password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="surePwd">
        <el-input v-model="ruleForm.surePwd" type = "password"></el-input>
      </el-form-item>

      <el-form-item>
        <div class='submit--btn hover' @click="submitForm('ruleForm')">立即修改</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddPage',
  data () {
    return {
      ruleForm: {
          oldPassword: '',
          loginPassword: '',
          surePwd: '',
        },
        rules: {
          oldPassword: [
            { required: true, message: '必填', trigger: 'blur' },
            { min: 6, max: 16, message: '长度: 6-16', trigger: 'blur' }
          ],
          loginPassword: [
            { required: true, message: '必填', trigger: 'blur' },
            { min: 6, max: 16, message: '长度: 6-16', trigger: 'blur' }
          ],
          surePwd: [
            { required: true, message: '必填', trigger: 'blur' },
            { min: 6, max: 16, message: '长度: 6-16', trigger: 'blur' }
          ],
        }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.edit();
        } else {
          this.showWarn('参数不正确')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async edit() {
      let userinfo = this.$root.userinfo,
          ruleForm = this.ruleForm;
      let params = {
        id: userinfo.id,
        loginName: userinfo.loginName,
        roleId: userinfo.roleId,
        oldPassword: ruleForm.oldPassword,
        loginPassword: ruleForm.oldPassword,
      }

      let res = await this.$http.post('/logistics/user/updatePwd.do', params);
      let { data } = res;

      if(data.code == 1) {
        this.resetForm('ruleForm');
        this.successCb(data.message);
        window.localStorage.removeItem('userinfo');
        this.$root.logout();
      } else {
        this.$message({
          message: data.message,
          type: data.code == 1 ? 'success' : 'error'
        });
      }
    }
  },
  created() {

  }
}
</script>

<style scoped lang='scss'>

</style>
