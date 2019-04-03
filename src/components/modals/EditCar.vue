<template>
  <el-dialog
    title="修改车辆信息"
    :visible.sync="show"
    :before-close="close">
    <div class="dialog--field">
      <label class="dialog--label">配送车牌号:</label>
      <el-input
        placeholder="请输入配送车牌号"
        class = "dialog--input"
        v-model="info.truckNum">
      </el-input>
    </div>
    <div class="dialog--field">
      <label class="dialog--label">gps设备号:</label>
      <el-input
        placeholder="请输入gps设备号"
        class = "dialog--input"
        v-model="info.gPS_SN">
      </el-input>
    </div>
    <div class="dialog--field">
      <label class="dialog--label">备注:</label>
      <el-input
        placeholder="请输入备注"
        class = "dialog--input"
        v-model="info.noteInfo">
      </el-input>
    </div>
      
    <div class="dialog--foot flex">
      <div class="color--btn" @click = "edit">提交</div>
      <div class="nocolor--btn" @click = "close">取消</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
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
      rules: {
        truckNum: [
          { required: true, message: '请输入配送车牌号', trigger: 'blur' }
        ],
        gPS_SN: [
          { required: true, message: '请输入gps设备号', trigger: 'blur' }
        ],
      }
    }
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

      if(!params.truckNum) {
        this.showMsg({ message: '请输入配送车牌号', code: 10, })
        return ;
      }
      if(!params.gPS_SN) {
        this.showMsg({ message: '请输入gps设备号', code: 10, })
        return ;
      }

      this.$http.post('/logistics/truck/save.do', params)
      .then(({ data }) => {
        this.showMsg(data);

        if(data.code == 1) {
          this.$emit('close', this.info);
        }
      }).catch(err => {
        // this.close()
      });
      
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
