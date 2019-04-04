<template>
  <el-dialog
    :title="objId ? '修改仓库信息': '添加仓库信息'"
    :visible.sync="show"
    :before-close="close">
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="所属仓库/库区" prop="pid">
        <el-cascader v-model="selectedOptions"
          placeholder="请选择所属仓库/库区"
          :options="fatherList"
          :props="props"
          filterable
          change-on-select
          @change="selectedChange"
        ></el-cascader>
        <!-- <el-select placeholder="">
          <el-option
            v-for="item in fatherList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select> -->
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
      show: false,
      objId: '',
      ruleForm: {
        name: '',
        pid: ''
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        pid: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      selectedOptions: [],
      fatherList: [
        {
          id: 0,
          name: '默认为仓库'
        },
        {
          id: 1,
          name: "1号仓库",
          pid: 0
        },
        {
          id: 2,
          name: "2号仓库",
          pid: 0,
          children: [
            {
              id: 3,
              pid: 2,
              name: "库区1"
            }
          ]
        }
      ],
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      }
    }
  },
  // watch: {
  //   obj() {
  //     this.ruleForm = Object.assign({}, this.obj);
  //   }
  // },
  mounted() {

  },
  methods: {
    openDialog(row) {
      var that = this
      if (row) {
        console.log(row)
        this.objId = row.id
        this.ruleForm = row
        if (row._parent) {
          this.selectedOptions.push(row._parent.pid)
        }
        this.selectedOptions.push(row.pid)
      } else {
        this.objId = ''
        this.ruleForm = {
          name: '',
          pid: ''
        }
      }
      setTimeout(function() {
        that.show = true
      }, 0)
    },
    selectedChange(val) {
      console.log(val)
      this.ruleForm.pid = val[val.length - 1]
    },
    close() {
      this.show = false
    },
    edit() {
      // var params = { ...this.info };
      // if(params.loginPassword == '*********') {
      //   delete params.loginPassword;
      // }
      // this.$http.post('/logistics/user/updateUser.do', params)
      // .then(({ data }) => {
      //   this.showMsg(data);

      //   if(data.code == 1) {
      //     this.$emit('close', this.info);
      //   } else {
      //     this.close()
      //   }
      // }).catch(err => {
      //   this.close()
      // });
      
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
