<template>
  <el-dialog
    :title="(objId ? '修改': '添加')+ '供应商信息'"
    :visible.sync="dialogFormVisible"
    :before-close="closeDialog" :close-on-click-modal="false">
    <form-lists :formItem="formItem" :formModel="formObj" ref="showForm"></form-lists>
    <div class="dialog--foot flex">
      <div class="color--btn" @click="saveSubmitInfo">提交</div>
      <div class="nocolor--btn" @click="dialogFormVisible=false">取消</div>
    </div>
  </el-dialog>
</template>

<script>
import formLists from '@/components/Formlists'
export default {
  data () {
    return {
      objId: '',
      dialogFormVisible: false,
      formItem: [
        {
          prop: 'name',
          tit: '供应商名称',
          num: 20,
          required: true
        },
        {
          prop: 'number',
          tit: '供应商编号',
          num: 50,
          required: true
        },
        {
          prop: 'address',
          tit: '地址',
          num: 15,
          required: true
        },
        {
          prop: 'email',
          tit: '邮箱',
          num: 20
        },
        {
          prop: 'phone',
          tit: '联系方式'
        },
        {
          prop: 'contacter',
          tit: '联系人',
          num: 20,
          required: true
        },
        {
          prop: 'type',
          tit: '类型',
          required: true,
          select: [
            {
              id: '0',
              name: '合作供应商'
            },
            {
              id: '1',
              name: '虚拟供应商'
            }
          ]
        },
        {
          prop: 'des',
          tit: '描述',
          textarea: true,
          num: 3000
        }
      ],
      formObj: {
        name: '',
        number: '',
        address: '',
        email: '',
        phone: '',
        contacter: '',
        type: '',
        des: ''
      }
    }
  },
  components: {
    formLists
  },
  methods: {
    openDiag(val) {
      var that = this
      if (val) {
        this.objId = val.id
        this.formObj = val
      } else {
        this.objId = ''
        this.formObj = {
          name: '',
          number: '',
          address: '',
          email: '',
          phone: '',
          contacter: '',
          type: '',
          des: ''
        }
      }
      setTimeout(() => {
        that.dialogFormVisible = true
      }, 1)
    },
    closeDialog() {
      this.$refs['showForm'].$refs['formObj'].clearValidate()
      this.dialogFormVisible = false
    },
    saveSubmitInfo() {
      var that = this
      this.$refs['showForm'].$refs['formObj'].validate(valid => {
        if (valid) {
          var params = {
            name: this.formObj.name,
            number: this.formObj.number,
            address: this.formObj.address,
            email: this.formObj.email,
            phone: this.formObj.phone,
            contacter: this.formObj.contacter,
            type: this.formObj.type,
            des: this.formObj.des
          };
          if (that.objId) {
            params = Object.assign(params, {id: that.objId})
          }
          this.$http.post('/supplier/save', params)
          .then(({ data }) => {
            this.showMsg(data);
            if(data.code == 1) {
              this.$refs['showForm'].$refs['formObj'].resetFields()
              this.closeDialog()
              this.$parent.resetInfo()
              this.successCb(data.message);
            } else {
              this.$message({
                message: data.message,
                type: data.code == 1 ? 'success' : 'error'
              });
            }
          })
        }
      })
    }
  }
}
</script>
