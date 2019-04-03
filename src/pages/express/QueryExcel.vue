
<template>
  <div class="AllotPage-page">
    <MyTitle text = "快递查询"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="目标配送点" prop="toPointId">
        <el-select filterable v-model="ruleForm.toPointId" placeholder="请选择配送站点" clearable
          :disabled = "ruleForm.driverId != '' || ruleForm.companyId != ''">
          <el-option
            v-for="item in $root.entrepotList"
            :key="item.id"
            :label="item.entrepotName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="配送司机" prop="driverId">
        <el-select filterable v-model="ruleForm.driverId" placeholder="请选择配送司机" clearable
          :disabled = "ruleForm.toPointId != '' || ruleForm.companyId != ''">
          <el-option
            v-for="item in $root.userList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递公司" prop="companyId">
        <el-select filterable v-model="ruleForm.companyId" placeholder="请选择快递公司" clearable
          :disabled = "ruleForm.toPointId != '' || ruleForm.driverId != ''">
          <el-option
            v-for="item in companyList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="配送时间">
        <el-date-picker
          v-model="ruleForm.time"
          type="daterange"
          value-format = "yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      

      <el-form-item>
        <div class='submit--btn hover' @click="submitForm('ruleForm')">导出报表</div>
      </el-form-item>
    </el-form>

    <form :action="`${url}/logistics/express/exportListByCdtn.do`" method = "POST" class = "hide-form">
      <input type="text" name = "companyId" :value = "ruleForm.companyId">
      <input type="text" name = "toPointId" :value = "ruleForm.toPointId">
      <input type="text" name = "driverId" :value = "ruleForm.driverId">
      <input type="text" name = "startTime" :value = "ruleForm.time[0]">
      <input type="text" name = "endTime" :value = "ruleForm.time[1]">
      <input type="submit" id ="form-btn">
    </form>
  </div>
</template>

<script>

export default {
  name: 'AllotPage',
  data () {
    return {
      ruleForm: {
        companyId: '',
        toPointId: '',
        driverId: '',
        time: ''
      },
      url: window.cfg.baseurl,
      rules: {

      },
      truckList: [], //车辆
      userList: [], //司机
      entrepotList: [], //配送点
      companyList: [],
    }
  },
  methods: {
    async getCompany() {
      let { data } = await this.$http.post('/logistics/expressCompany/getExpressCompanyList.do', { status: 1 });

      if(data.code == 1) {
        this.companyList = data.result;
      }
    },
    submitForm(formName) {
      this.toExcel();
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.toExcel();
      //   } else {
      //     this.showWarn('参数不正确')
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toExcel() {
      document.querySelector("#form-btn").click();
    },
  },
  created() {
    this.getCompany();
  }
}
</script>

<style scoped lang='scss'>

</style>
