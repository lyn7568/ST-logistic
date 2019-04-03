
<template>
  <div class="Add-page">
    <MyTitle text = "新增货物"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="number">
        <el-input v-model="ruleForm.number" maxlength="520"></el-input>
      </el-form-item>
      <el-form-item label="所属分类" prop="classificationId">
        <el-select filterable v-model="ruleForm.classificationId" placeholder="请选择所属分类">
          <el-option
            v-for="item in $root.classifications"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属店铺" prop="shopId">
        <el-select filterable v-model="ruleForm.shopId" placeholder="请选择所属店铺">
          <el-option
            v-for="item in $root.shops"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="ruleForm.price" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="standard">
        <el-input type="textarea" :rows="6" v-model="ruleForm.standard" maxlength="3000"></el-input>
      </el-form-item>
      <el-form-item label="产地" prop="place">
        <el-input v-model="ruleForm.place" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="amount">
        <el-input-number v-model="ruleForm.amount" @change="handleAmountChange" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="图片" prop="fileIds">
      </el-form-item>
      <el-form-item label="存放位置" prop="number">
        <el-input v-model="ruleForm.number" maxlength="520"></el-input>
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
          classificationId: '',
          shopId: '',
          price: '',
          amount: 0
        },
        rules: {
          name: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          classificationId: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          shopId: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '必填', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    handleAmountChange(val) {
      this.ruleForm.amount = val
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
      let params = {
        name: ruleForm.name,
        number: ruleForm.number,
        classificationId: ruleForm.classificationId,
        shopId: ruleForm.shopId,
        price: ruleForm.price,
        amount: ruleForm.amount
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
    // this.getClassificationss();
    // this.getShops()
  }
}
</script>

<style scoped lang='scss'>

</style>
