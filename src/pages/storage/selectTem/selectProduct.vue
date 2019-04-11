<template>
  <el-dialog
    title="选择入库货物"
    :visible.sync="selectDialogVisible"
    :close-on-click-modal="false">
    <div class="flex between search--wrap">
      <filter-form :formObject="formObject" @search="search"></filter-form>
    </div>
    <complex-table ref="tableChildObj" v-loading="tableLoading"
      :tableObject="tableObject"
      :templateRadioFather="templateRadio"
      @pageCurFun="currentPageChangeFirst"
      @getTemplateRowInfo="getTemplateRowInfo" @getChangeRadio="getChangeRadio"></complex-table>
    <div class="dialog--foot flex">
      <div class="color--btn" @click="selectSureSave">提交</div>
      <div class="nocolor--btn" @click="selectDialogVisible=false">取消</div>
    </div>
  </el-dialog>
</template>
<script>
import complexTable from '@/components/ComplexTable'
import filterForm from '@/components/FilterForm'

export default {
  components: {
    complexTable,
    filterForm
  },
  data () {
    return {
      selectDialogVisible: false,
      tableLoading: false,
      tableObject: {
        data: [],
        pageNo: 1,
        total: 0,
        pageSize: 10,
        checked: true,
        arr: [
          {
            prop: 'id',
            tit: '选择',
            width: '50',
            radio: true
          },
          {
            prop: 'productName',
            tit: '货物名称'
          },
          {
            prop: 'productNumber',
            tit: '货物编号'
          },
          {
            prop: 'warehouseName',
            tit: '所属仓库'
          },
          {
            prop: 'areaName',
            tit: '所属库区'
          },
          {
            prop: 'locationName',
            tit: '所属货位'
          },
          {
            prop: 'amount',
            tit: '库存数量'
          }
        ],
        oFun: []
      },
      formObject: {
        ref: 'formObject',
        model: {
          productName: '',
          productNumber: '',
          ckq: []
        },
        arr: [
          {
            prop: 'productName',
            tit: '货物名称'
          },
          {
            prop: 'productNumber',
            tit: '货物编号'
          },
          {
            prop: 'ckq',
            tit: '仓库/库区/货位',
            cascader: this.$root.wareHouseAreasThree
          }
        ],
        oFun: [
          {
            name: '查询',
            event: 'search'
          }
        ]
      },
      radioSelectInfo: '',
      templateRadio: ''
    }
  },
  methods: {
    openDiag(id) {
      var that = this
      this.templateRadio = id
      this.radioSelectInfo = ''
      this.getlists();
      setTimeout(() => {
        that.selectDialogVisible = true
      }, 1)
    },
    currentPageChangeFirst(val) {
      this.tableObject.pageNo = val
      this.getlists()
    },
    async getlists() {
      this.tableLoading = true
      let wid = '', aid = '', lid = ''
      if (this.formObject.model.ckq){
        wid = this.formObject.model.ckq[0]
        aid = this.formObject.model.ckq[1]
        lid = this.formObject.model.ckq[2]
      }
      let params = {
        page: this.tableObject.pageNo,
        pageSize: this.tableObject.pageSize,
        productName: this.formObject.model.productName,
        productNumber: this.formObject.model.productNumber,
        warehouseId: wid,
        areaId: aid,
        locationreaId: lid
      }

      let { data } = await this.$http.post('/operation/warehouseProductList', params),
          res = data.result;
      if(data.code == 1) {
        this.tableLoading = false
        this.tableObject.data = res.result;
        this.tableObject.total = res.total;
      } else {
        this.tableLoading = false
        this.tableData = [];
      }
    },
    search(){
      this.resetInfo()
    },
    resetInfo() {
      this.tableObject.data = []
      this.tableObject.pageNo = 1
      this.tableObject.total = 0
      this.getlists()
    },
    getChangeRadio(val) {
      this.templateRadio = val.productId
    },
    getTemplateRowInfo(row) {
      this.radioSelectInfo = row
    },
    selectSureSave() {
      if (this.radioSelectInfo === '') {
        this.showWarning('请选择入库货物')
        return
      }
      this.$emit('selectProductName', this.radioSelectInfo)
      this.selectDialogVisible = false
    }
  }
}
</script>
