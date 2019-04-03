
<template>
  <div class="InaddPage-page">
    <MyTitle text = "快递单分配"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="目标配送点" prop="toPointIds">
        <el-select filterable v-model="ruleForm.toPointIds" multiple placeholder="请选择配送站点" @change = "getTable">
          <el-option
            v-for="item in entrepotList"
            :key="item.id"
            :label="item.entrepotName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送车牌号" prop="truckId">
        <el-select filterable v-model="ruleForm.truckId" placeholder="请选择配送车牌号">
          <el-option
            v-for="item in truckList"
            :key="item.id"
            :label="item.truckNum"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="配送司机" prop="courierId">
        <el-select filterable v-model="ruleForm.courierId" placeholder="请选择配送司机">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送时间" prop="sendTime">
        <el-date-picker
          v-model="ruleForm.sendTime"
          type="date"
          @change = "changeTime"
          value-format = "yyyy-MM-dd"
          :default-value = "nowtime"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <div class='submit--btn hover' @click="submitForm('ruleForm')">立即新增</div>
      </el-form-item>
    </el-form>

    <el-table
        :data="tableData"
        stripe
        >
        <el-table-column
          type="index"
          align = "center"
          :index = "(i) => i >=9 ? (i + 1) : `0${ i + 1 }`"
          label = "序号"
          width="80">
        </el-table-column>
        <el-table-column
          label="目标配送点"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ getText(scope.row.sendPointId, 'entrepotList', 'entrepotName') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="配送快递数量"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ scope.row.expressNum }}</span>
          </template>
        </el-table-column>

      </el-table>
  </div>
</template>

<script>
function getDate(value) {
  if(!value) return '';
  var time = new Date(+value),
      year = time.getFullYear(),
      month = time.getMonth() + 1,
      date = time.getDate(),
      hour = time.getHours(),
      minute = time.getMinutes();
  return `${year}-${leftPad(month)}-${leftPad(date)}`; 
}
function leftPad(str) {
	return str >= 10 ? str : ("0" + str);
}

let nowtime = getDate(Date.now());

export default {
  name: 'InaddPage',
  data () {
    return {
      nowtime: Date.now(),
      tableData: [],
      truckList: [], //车辆
      userList: [], //司机
      entrepotList: [], //配送点
      ruleForm: {
        toPointIds: '',
        truckId: '',
        courierId: '',
        sendTime: nowtime,
      },
      rules: {
        toPointIds: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        truckId: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        sendTime: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        courierId: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    changeTime(time) {
      if(new Date(time).getTime() < new Date(nowtime).getTime()) {
        this.showWarn('不能小于当前时间')
        this.ruleForm.sendTime = nowtime
      }
    },
    getText(id, type, name) {
      if(!id) return '无';

      var lists = this[type];
      if(!lists) return '无';

      var obj = lists.filter(v => v.id == id)[0];

      var text = (obj && obj[name]) || '无'

      return text;
    },
    async initData() {
      let { data } = await this.$http.post('/logistics/express/initData.do', {});

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
      params.toPointIds = params.toPointIds.join(",")

      let res = await this.$http.post('/logistics/express/distribution.do', params);
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
    async getTable() {
      let params = {
        toPointIds: this.ruleForm.toPointIds.join(","),
      }

      let { data } = await this.$http.post('/logistics/express/getExpressList.do', params),
          result = data.result;

      if(data.code == 1) {
        this.tableData = result;
      } else {
        this.tableData = [];
      }
    }
  },
  created() {
    this.initData();
  }
}
</script>

<style scoped lang='scss'>

</style>
