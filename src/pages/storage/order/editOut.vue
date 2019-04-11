<template>
<div>
  <el-dialog
    :title="(objId ? '修改': '添加')+ '出库信息'"
    :visible.sync="dialogFormVisible"
    :before-close="closeDialog" :close-on-click-modal="false">
    <form-lists :formItem="formItem" :formModel="formObj" ref="showForm" @changeIfUse="changeIfUse"
    @clickSelectProduct="clickSelectProduct" @clickSelectCarrier="clickSelectCarrier"></form-lists>
    <div class="dialog--foot flex">
      <div class="color--btn" @click="saveSubmitInfo">提交</div>
      <div class="nocolor--btn" @click="dialogFormVisible=false">取消</div>
    </div>
  </el-dialog>
  <select-product ref="selectProductDialog" @selectProductName="selectProductName"></select-product>
  <select-carrier ref="selectCarrierDialog" @selectCarrierName="selectCarrierName"></select-carrier>
</div>
</template>

<script>
import formLists from '@/components/Formlists'
import selectProduct from '@/pages/storage/selectTem/selectProduct'
import selectCarrier from '@/pages/storage/selectTem/selectCarrier'
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
          prop: 'productName',
          tit: '货物名称',
          dbclick: 'clickSelectProduct',
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
          prop: 'carrierName',
          tit: '承运商',
          dbclick: 'clickSelectCarrier',
          required: true,
          eveWay: 'change'
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
        carrierId: '',
        carrierName: '',
        type: '',
        productId: '',
        productName: '',
        operationAmount: 0
      }
    }
  },
  components: {
    formLists,
    selectProduct,
    selectCarrier
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
          carrierId: '',
          carrierName: '',
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
            carrierId: this.formObj.carrierId,
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
    },
    clickSelectProduct() {
      let sid = ''
      if (this.formObj.productId) {
        sid = this.formObj.productId
      }
      this.$refs.selectProductDialog.openDiag(sid)
    },
    selectProductName(val) {
      this.formObj.productName = val.productName
      this.formObj.productId = val.productId
    },
    clickSelectCarrier() {
      let sid = ''
      if (this.formObj.carrierId) {
        sid = this.formObj.carrierId
      }
      this.$refs.selectCarrierDialog.openDiag(sid)
    },
    selectCarrierName(val) {
      this.formObj.carrierName = val.name
      this.formObj.carrierId = val.id
    }
  }
}
</script>
