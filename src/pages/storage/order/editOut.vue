<template>
  <el-dialog
    :title="(objId ? '修改': '添加')+ '出库信息'"
    :visible.sync="dialogFormVisible"
    :before-close="closeDialog" :close-on-click-modal="false">
    <form-lists :formItem="formItem" :formModel="formObj" ref="showForm" @changeIfUse="changeIfUse"
    :remoteOwnerName="this.$root.remoteSupplierList"></form-lists>
    <div class="dialog--foot flex">
      <div class="color--btn" @click="saveSubmitInfo">提交</div>
      <div class="nocolor--btn" @click="dialogFormVisible=false">取消</div>
    </div>
  </el-dialog>
</template>

<script>
import formLists from '@/components/Formlists'
import { slelectOutStorageType } from '@/util/dict'
export default {
  data () {
    return {
      objId: '',
      dialogFormVisible: false,
      formItem: [
        {
          prop: 'batch',
          tit: '批次',
          required: true
        },
        {
          prop: 'productId',
          tit: '货物名称',
          required: true,
          select: this.$root.productArrs
        },
        {
          prop: 'ckq',
          tit: '仓库/库区/库位',
          cascader: this.$root.wareHouseAreas,
          required: true
        },
        {
          prop: 'carrierId',
          tit: '承运商',
          select: this.$root.carrierArrs,
          required: true
        },
        {
          prop: 'type',
          tit: '出库类型',
          required: true,
          select: slelectOutStorageType
        },
        {
          prop: 'operationAmount',
          tit: '出库数量',
          required: true,
          number: true
        }
      ],
      formObj: {
        batch: '',
        ckq: [],
        supplierId: '',
        type: '',
        productId: '',
        operationAmount: 0
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
        val.ckq = []
        val.ckq.push(val.warehouseId)
        val.ckq.push(val.areaId)
        val.ckq.push(val.locationId)
        this.formObj = val
      } else {
        this.objId = ''
        this.formObj = {
          batch: '',
          ckq: [],
          supplierId: '',
          type: '',
          productId: '',
          operationAmount: 0
        }
      }
      setTimeout(() => {
        that.dialogFormVisible = true
      }, 1)
    },
    changeIfUse(val) {
      this.formObj.ifUse = Number(!val)
    },
    closeDialog() {
      this.$refs['showForm'].$refs['formObj'].clearValidate()
      this.dialogFormVisible = false
    },
    saveSubmitInfo() {
      var that = this
      this.$refs['showForm'].$refs['formObj'].validate(valid => {
        if (valid) {
          let wid = '', aid = ''
          if (this.formObj.ckq){
            wid = this.formObj.ckq[0]
            aid = this.formObj.ckq[1]
          }
          var params = {
            name: this.formObj.name,
            number: this.formObj.number,
            remark: this.formObj.remark,
            areaId: aid,
            type: this.formObj.type,
            ifUse: this.formObj.ifUse
          };
          if (that.objId) {
            params = Object.assign(params, {id: that.objId})
          }
          this.$http.post('/operation/outSave', params)
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
