<template>
  <el-dialog
    title="修改配送点信息"
    :visible.sync="show"
    :before-close="close">
    <el-form 
      :model="info" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="配送点编码" prop="entrepotCode">
        <el-input v-model="info.entrepotCode"></el-input>
      </el-form-item>
      <el-form-item label="配送点名称" prop="entrepotName">
        <el-input v-model="info.entrepotName"></el-input>
      </el-form-item>
      
      <el-form-item label="配送点联系电话" prop="entrepotTel">
        <el-input v-model="info.entrepotTel"></el-input>
      </el-form-item>
      <el-form-item label="单个快件收费额度" prop="charge">
        <el-input v-model="info.charge"></el-input>
      </el-form-item>
      <el-form-item label="管理员" prop="entrepotManagerId">
        <el-select v-model="info.entrepotManagerId" placeholder="请选择管理员">
          <el-option
            v-for="item in managers"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
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
  name: 'EditPei',
  props: {
    obj: { default() { return {} } },
    show: { default: false, }
  },
  data () {
    return {
      info: {},
      options: [{
        value: 1,
        label: '男'
      }, {
        value: 2,
        label: '女'
      }],
      managers: [],
      rules: {

      },
    }
  },
  created() {
    this.getManagers();
  },
  watch: {
    obj() {
      this.info = Object.assign({}, this.obj);
    }
  },
  mounted() {

  },
  methods: {
    close() {
      this.$emit('close')
    },
    edit() {
      var params = { ...this.info };
      delete params.createTime;
      delete params.updateTime;
      delete params.latitude;
      delete params.longitude;
      delete params.status

      this.$http.post('/logistics/entrepot/save.do', params)
      .then(({ data }) => {
        this.showMsg(data);

        if(data.code == 1) {
          this.$emit('close', this.info);
        }
      }).catch(err => {
        // this.close()
      });
    },
    async getManagers() {
    
      let { data } = await this.$http.post('/logistics/user/getEntrepotManagerListByCdtn.do', { status: 1 });

      if(data.code == 1) {
        this.managers = data.result;
      }
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
