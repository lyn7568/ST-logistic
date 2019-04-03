
<template>
  <div class="StaffAdd-page">
    <MyTitle text = "新增配送员"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="配送员账号" prop="loginName">
        <el-input v-model="ruleForm.loginName"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="loginPassword">
        <el-input v-model="ruleForm.loginPassword"  type = "password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confpwd">
        <el-input v-model="ruleForm.confpwd"  type = "password"></el-input>
      </el-form-item>
      <el-form-item label="配送员姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="配送员电话" prop="tel">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="配送员角色" prop="roleId">
        <el-select filterable v-model="ruleForm.roleId" placeholder="请选择角色">
          <el-option
            v-for="item in $root.roles"
            :key="item.id"
            :label="item.roleName"
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
  data () {
    return {
      ruleForm: {
          loginName: '',
          loginPassword: '',
          confpwd: '',
          name: '',
          tel: '',
          roleId: '',
        },
        rules: {
          loginName: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 20, message: '长度不能超过20', trigger: 'blur' }
          ],
          loginPassword: [
            { required: true, message: '必填', trigger: 'blur' },
            { min: 6, max: 16, message: '长度: 6-16', trigger: 'blur' }
          ],
          confpwd: [
            { required: true, message: '必填', trigger: 'blur' },
            { min: 6, max: 16, message: '长度: 6-16', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 20, message: '长度不能超过20', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          roleId: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
        },
        roles: []
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
    async getRoles() {
      let { data } = await this.$http.post('/logistics/role/getRoleList.do', { status: 1 });
      if(data.code == 1) {
        this.roles = data.result;
      }
    },
    async add() {
      let ruleForm = this.ruleForm;
      let params = {
        loginName: ruleForm.loginName,
        loginPassword: ruleForm.loginPassword,
        name: ruleForm.name,
        tel: ruleForm.tel,
        roleId: ruleForm.roleId,
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
  },
  created() {
    // this.getRoles();
  }
}
</script>

<style scoped lang='scss'>

</style>
