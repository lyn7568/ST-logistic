
<template>
  <div class="ExpressAddPage-page">
    <MyTitle text = "新增配送点"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="配送点编码" prop="entrepotCode">
        <el-input v-model="ruleForm.entrepotCode"></el-input>
      </el-form-item>
      <el-form-item label="配送点名称" prop="entrepotName">
        <el-input v-model="ruleForm.entrepotName"></el-input>
      </el-form-item>
      
      <el-form-item label="配送点联系电话" prop="entrepotTel">
        <el-input v-model="ruleForm.entrepotTel"></el-input>
      </el-form-item>
      <el-form-item label="单个快件收费额度" prop="charge">
        <el-input v-model="ruleForm.charge"></el-input>
      </el-form-item>
      <el-form-item label="管理员" prop="entrepotManagerId">
        <el-select v-model="ruleForm.entrepotManagerId" placeholder="请选择管理员">
          <el-option
            v-for="item in managers"
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
  name: 'ExpressAddPage',
  data () {
    return {
      ruleForm: {
          entrepotCode: '',
          entrepotName: '',
          charge: '',
          entrepotTel: '',
          entrepotManagerId: '',
        },
        rules: {
          entrepotCode: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 20, message: '长度不能超过20', trigger: 'blur' }
          ],
          entrepotName: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 20, message: '长度不能超过20', trigger: 'blur' }
          ],
          charge: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 5, message: '长度不能超过5', trigger: 'blur' }
          ],
          entrepotTel: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          entrepotManagerId: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
        },
        managers: [],
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
      let params = ruleForm;

      let res = await this.$http.post('/logistics/entrepot/save.do', params);
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
    async getManagers() {
    
      let { data } = await this.$http.post('/logistics/user/getEntrepotManagerListByCdtn.do', { status: 1 });

      if(data.code == 1) {
        this.managers = data.result;
      }
    }
  },
  created() {
    this.getManagers();
  }
}
</script>

<style scoped lang='scss'>

</style>
