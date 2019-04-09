<template>
<div>
  <el-dialog
    :title="(objId ? '修改': '添加')+ '货物信息'"
    :visible.sync="dialogFormVisible"
    :before-close="closeDialog" :close-on-click-modal="false">
    <form-lists :formItem="formItem" :formModel="formObj" ref="showForm"
      @clickSelectShops="clickSelectShops"></form-lists>
    <div class="dialog--foot flex">
      <div class="color--btn" @click="saveSubmitInfo">提交</div>
      <div class="nocolor--btn" @click="dialogFormVisible=false">取消</div>
    </div>
  </el-dialog>
  <select-shops ref="selectShopsDialog"></select-shops>
</div>
</template>

<script>
import formLists from '@/components/Formlists'
import selectShops from '@/pages/storage/selectTem/selectShops'
export default {
  data () {
    return {
      objId: '',
      dialogFormVisible: false,
      formItem: [
        {
          prop: 'name',
          tit: '货物名称',
          num: 20,
          required: true
        },
        {
          prop: 'number',
          tit: '货物编号',
          num: 50,
          required: true
        },
        {
          prop: 'factoryNumber',
          tit: '厂商编码',
          required: true
        },
        {
          prop: 'shopId',
          tit: '所属店铺',
          // select: this.$root.shopArrs,
          dbclick: 'clickSelectShops',
          required: true
        },
        {
          prop: 'classificationId',
          tit: '所属分类',
          select: this.$root.classifications,
          required: true
        },
        {
          prop: 'price',
          tit: '单价',
          num: 15,
          required: true
        },
        {
          prop: 'standard',
          tit: '规格',
          num: 3000
        },
        {
          prop: 'place',
          tit: '产地',
          num: 15
        },
        {
          prop: 'amount',
          tit: '数量',
          number: true,
          required: true
        }
      ],
      formObj: {
        name: '',
        number: '',
        classificationId: '',
        factoryNumber: '',
        shopId: '',
        price: '',
        standard: '',
        place: '',
        amount: 0
      }
    }
  },
  components: {
    formLists,
    selectShops
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
          classificationId: '',
          factoryNumber: '',
          shopId: '',
          price: '',
          standard: '',
          place: '',
          amount: 0
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
            classificationId: this.formObj.classificationId,
            factoryNumber: this.formObj.factoryNumber,
            shopId: this.formObj.shopId,
            price: this.formObj.price,
            standard: this.formObj.standard,
            place: this.formObj.place,
            amount: this.formObj.amount
          };
          if (that.objId) {
            params = Object.assign(params, {id: that.objId})
          }
          this.$http.post('/product/save', params)
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
    clickSelectShops() {
      this.$refs.selectShopsDialog.openDiag()
    }
  }
}
</script>
