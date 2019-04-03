
<template>
  <div class="CarAddPage-page">
    <MyTitle text = "配送车新增"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="配送车牌号" prop="truckNum">
        <el-input v-model="ruleForm.truckNum"></el-input>
      </el-form-item>
      <el-form-item label="gps设备号">
        <el-input v-model="ruleForm.gps"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.note"></el-input>
      </el-form-item>

      <el-form-item>
        <div class='submit--btn hover' @click="submitForm('ruleForm')">立即新增</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CarAddPage',
  data () {
    return {
      ruleForm: {
          truckNum: '',
          gps: '',
          note: '',
        },
        rules: {
          truckNum: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 10, message: '长度不能超过10', trigger: 'blur' }
          ],
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
      let params = ruleForm;

      let res = await this.$http.post('/logistics/truck/save.do', params);
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

  }
}
</script>

<style scoped lang='scss'>

</style>
