<template>
  <el-dialog
    title="修改员工信息"
    :visible.sync="show"

    :before-close="close">
    <div class="edit--form">
      <h4 class="edit--form__title">员工信息</h4>
      <div class="flex wrap">
        <div class="dialog--field">
          <label class="dialog--label">员工姓名：</label>
          <el-input
            placeholder="请输入员工姓名"
            class = "dialog--input"
            v-model="info.name">
          </el-input>
        </div>
        <div class="dialog--field">
          <label class="dialog--label">员工电话：</label>
          <el-input
            placeholder="请输入员工电话"
            class = "dialog--input"
            v-model="info.tel">
          </el-input>
        </div>
        <div class="dialog--field">
          <label class="dialog--label">员工性别：</label>
          <el-select v-model="info.sex" placeholder="请输入员工性别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <!-- <el-input
            placeholder="请输入员工性别"
            class = "dialog--input"
            v-model="info.sex">
          </el-input> -->
        </div>
        <div class="dialog--field">
          <label class="dialog--label">员工年龄：</label>
          <el-input
            placeholder="请输入员工年龄"
            class = "dialog--input"
            v-model="info.age">
          </el-input>
        </div>
      </div>

      <div class="edit--form">
        <h4 class="edit--form__title extra">账号信息</h4>
        <div class="flex wrap">
          <div class="dialog--field">
            <label class="dialog--label">员工账号：</label>
            <el-input
              placeholder="请输入员工姓名"
              class = "dialog--input"
              v-model="info.loginName">
            </el-input>
          </div>
          <div class="dialog--field">
            <label class="dialog--label">登录密码：</label>
            <el-input
              placeholder="请输入员工电话"
              class = "dialog--input"
              type = "password"
              v-model="info.loginPassword">
            </el-input>
          </div>
          <div class="dialog--field">
            <label class="dialog--label">入职时间：</label>
            <el-input
              placeholder="请输入员工性别"
              class = "dialog--input"
              v-model="info.createTime">
            </el-input>
          </div>
        </div>
      </div>
      
      <div class="dialog--foot flex">
        <div class="color--btn" @click = "edit">提交</div>
        <div class="nocolor--btn" @click = "close">取消</div>
      </div>
      
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditStaff',
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
      if(params.loginPassword == '*********') {
        delete params.loginPassword;
      }
      this.$http.post('/logistics/user/updateUser.do', params)
      .then(({ data }) => {
        this.showMsg(data);

        if(data.code == 1) {
          this.$emit('close', this.info);
        } else {
          this.close()
        }
      }).catch(err => {
        this.close()
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
  width: 3rem;
  height: .6rem;
  line-height: .6rem;
  display: inline-flex;
  align-items: center; 
  font-size: .2rem;
  margin-right: .12rem;
}
.dialog--label {
  font-size: .2rem;
  color: #666;
  padding-left: .32rem;
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
