<template>
  <el-dialog
    title="修改店铺信息"
    :visible.sync="show"
    :before-close="close">
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
        <div class="dialog--foot flex">
          <div class="color--btn" @click = "edit">提交</div>
          <div class="nocolor--btn" @click = "close">取消</div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {},
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
  watch: {
    obj() {
      this.ruleForm = Object.assign({}, this.obj);
    }
  },
  mounted() {

  },
  methods: {
    close() {
      this.$emit('close')
    },
    edit() {
      var params = { ...this.ruleForm };
      delete params.createTime;
      delete params.updateTime;
      delete params.latitude;
      delete params.longitude;
      delete params.status

      this.$http.post('/logistics/entrepot/save.do', params)
      .then(({ data }) => {
        this.showMsg(data);

        if(data.code == 1) {
          this.$emit('close', this.ruleForm);
        }
      }).catch(err => {
        // this.close()
      });
    }
  }
}
</script>
