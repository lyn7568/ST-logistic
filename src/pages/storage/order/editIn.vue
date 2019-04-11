<template>
<div>
  <el-dialog
    :title="(objId ? '修改': '添加')+ '入库信息'"
    :visible.sync="dialogFormVisible"
    :before-close="closeDialog" :close-on-click-modal="false">
    <form-lists :formItem="formItem" :formModel="formObj" ref="showForm" @changeIfUse="changeIfUse"
    @clickSelectGoods="clickSelectGoods" @clickSelectSupplier="clickSelectSupplier"></form-lists>
    <div class="dialog--foot flex">
      <div class="color--btn" @click="saveSubmitInfo">提交</div>
      <div class="nocolor--btn" @click="closeDialog">取消</div>
    </div>
  </el-dialog>
  <select-goods ref="selectGoodsDialog" @selectGoodsName="selectGoodsName"></select-goods>
  <select-supplier ref="selectSupplierDialog" @selectSupplierName="selectSupplierName"></select-supplier>
</div>
</template>

<script>
import formLists from '@/components/Formlists'
import selectGoods from '@/pages/storage/selectTem/selectGoods'
import selectSupplier from '@/pages/storage/selectTem/selectSupplier'
import { slelectInStorageType } from '@/util/dict'
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
          prop: 'productName',
          tit: '货物名称',
          dbclick: 'clickSelectGoods',
          required: true,
          eveWay: 'change'
        },
        {
          prop: 'ckq',
          tit: '仓库/库区/库位',
          cascader: this.$root.wareHouseAreasThree,
          required: true
        },
        {
          prop: 'supplierName',
          tit: '供应商',
          dbclick: 'clickSelectSupplier',
          required: true,
          eveWay: 'change'
        },
        {
          prop: 'type',
          tit: '入库类型',
          required: true,
          select: slelectInStorageType
        },
        {
          prop: 'operationAmount',
          tit: '入库数量',
          required: true,
          number: true
        }
      ],
      formObj: {
        batch: '',
        ckq: [],
        supplierId: '',
        supplierName: '',
        type: '',
        productId: '',
        productName: '',
        operationAmount: 0
      }
    }
  },
  components: {
    formLists,
    selectGoods,
    selectSupplier
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
          supplierName: '',
          type: '',
          productId: '',
          productName: '',
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
          let wid = '', aid = '', lid = ''
          if (this.formObj.ckq){
            wid = this.formObj.ckq[0]
            aid = this.formObj.ckq[1]
            lid = this.formObj.ckq[2]
          }
          var params = {
            batch: this.formObj.batch,
            supplierId: this.formObj.supplierId,
            type: this.formObj.type,
            productId: this.formObj.productId,
            operationAmount: this.formObj.operationAmount,
            warehouseId: wid,
            areaId: aid,
            locationId: lid
          };
          if (that.objId) {
            params = Object.assign(params, {id: that.objId})
          }
          this.$http.post('/operation/comeSave', params)
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
    },
    clickSelectGoods() {
      let sid = ''
      if (this.formObj.productId) {
        sid = this.formObj.productId
      }
      this.$refs.selectGoodsDialog.openDiag(sid)
    },
    selectGoodsName(val) {
      this.formObj.productName = val.name
      this.formObj.productId = val.id
    },
    clickSelectSupplier() {
      let sid = ''
      if (this.formObj.supplierId) {
        sid = this.formObj.supplierId
      }
      this.$refs.selectSupplierDialog.openDiag(sid)
    },
    selectSupplierName(val) {
      this.formObj.supplierName = val.name
      this.formObj.supplierId = val.id
    }
  }
}
</script>
