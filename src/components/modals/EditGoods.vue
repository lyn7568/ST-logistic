<template>
  <el-dialog
    title="修改货物信息"
    :visible.sync="show"
    :before-close="close">
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
  name: 'EditGoods',
  props: {
    obj: { default() { return {} } },
    show: { default: false, }
  },
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
    },
    handleAmountChange(val) {
      this.ruleForm.amount = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit--form__title {
  font-size: .18rem;
  padding: .06rem 0 .2rem ;
  border-bottom: 1px solid #ccc;
}
.extra.edit--form__title {
  padding-top: .24rem;
}
.dialog--input {
  width: 300px;
  height: 60px;
  line-height: 60px;
  display: inline-flex;
  align-items: center; 
  font-size: 20px;
  margin-right: .12rem;
}
.dialog--label {
  font-size: 20px;
  color: #666;
  padding-left: .32rem;
  width: 120px;
  display: inline-flex;
}
.dialog--field {
  margin-top: .3rem;
}
.dialog--foot {
  padding: .24rem 1.4rem;
}
.nocolor--btn {
  margin-left: .24rem;
}
</style>
