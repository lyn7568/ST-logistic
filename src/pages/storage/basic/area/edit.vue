<template>
  <el-dialog
    :title="(objId ? '修改': '添加')+ '库区信息'"
    :visible.sync="dialogFormVisible"
    :before-close="closeDialog" :close-on-click-modal="false">
    <form-lists :formItem="formItem" :formModel="formObj" ref="showForm" @changeIfUse="changeIfUse"></form-lists>
    <div class="dialog--foot flex">
      <div class="color--btn" @click="saveSubmitInfo">提交</div>
      <div class="nocolor--btn" @click="cancelDialog">取消</div>
    </div>
  </el-dialog>
</template>

<script>
import formLists from '@/components/Formlists'
import { slelectAreaType } from '@/util/dict'
export default {
  data () {
    return {
      objId: '',
      dialogFormVisible: false,
      formItem: [
        {
          prop: 'name',
          tit: '库区名称',
          num: 20,
          required: true
        },
        {
          prop: 'number',
          tit: '库区编号',
          num: 50,
          required: true
        },
        {
          prop: 'warehouseId',
          tit: '所属仓库',
          required: true,
          select: this.$root.wareHouses
        },
        {
          prop: 'type',
          tit: '类型',
          required: true,
          select: slelectAreaType
        },
        {
          prop: 'ifUse',
          tit: '是否禁用',
          checkbox: true
        },
        {
          prop: 'remark',
          tit: '备注',
          num: 15
        }
      ],
      formObj: {
        name: '',
        number: '',
        remark: '',
        type: '',
        ifUse: 1,
        warehouseId: ''
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
          remark: '',
          type: '',
          ifUse: 1,
          warehouseId: ''
        }
      }
      setTimeout(() => {
        that.dialogFormVisible = true
      }, 1)
    },
    changeIfUse(val) {
      this.formObj.ifUse = Number(!val)
    },
    cancelDialog() {
      this.objId = ''
      this.formObj = {
        name: '',
        number: '',
        remark: '',
        type: '',
        ifUse: 1,
        warehouseId: ''
      }
      this.dialogFormVisible = false
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
            remark: this.formObj.remark,
            warehouseId: this.formObj.warehouseId,
            type: this.formObj.type,
            ifUse: this.formObj.ifUse
          };
          if (that.objId) {
            params = Object.assign(params, {id: that.objId})
          }
          this.$http.post('/warehouse/saveArea', params)
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
