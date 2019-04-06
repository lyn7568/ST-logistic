<template>
  <el-dialog
    :title="(objId ? '修改': '添加')+ '仓库信息'"
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
          tit: '仓库名称',
          num: 20,
          required: true
        },
        {
          prop: 'number',
          tit: '仓库编号',
          num: 50,
          required: true
        },
        {
          prop: 'type',
          tit: '类型',
          required: true,
          select: [
            {
              id: '0',
              name: '成品仓库'
            },
            {
              id: '1',
              name: '原料仓库'
            },
            {
              id: '2',
              name: '半成品仓库'
            }
          ]
        },
        {
          prop: 'ifUse',
          tit: '是否禁用',
          checkbox: true,
        },
        {
          prop: 'address',
          tit: '地址',
          num: 15
        },
        {
          prop: 'acreage',
          tit: '面积',
          num: 20
        },
        {
          prop: 'phone',
          tit: '联系方式'
        },
        {
          prop: 'contacter',
          tit: '联系人',
          num: 20
        },
        {
          prop: 'leaseDateTime',
          tit: '租赁时间',
          date: true
        }
      ],
      formObj: {
        name: '',
        number: '',
        address: '',
        acreage: '',
        phone: '',
        contacter: '',
        type: '',
        leaseDateTime: '',
        ifUse: 0
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
          acreage: '',
          phone: '',
          contacter: '',
          type: '',
          leaseDateTime: '',
          ifUse: 0
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
            acreage: this.formObj.acreage,
            phone: this.formObj.phone,
            contacter: this.formObj.contacter,
            type: this.formObj.type,
            leaseDateTime: this.formObj.leaseDateTime,
            ifUse: this.formObj.ifUse
          };
          if (that.objId) {
            params = Object.assign(params, {id: that.objId})
          }
          this.$http.post('/warehouse/save', params)
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
