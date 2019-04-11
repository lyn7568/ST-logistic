<template>
  <el-dialog
    title="选择承运商"
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
            prop: 'name',
            tit: '承运商名称'
          },
          {
            prop: 'number',
            tit: '承运商编号'
          },
          {
            prop: 'remark',
            tit: '备注'
          },
          {
            prop: 'des',
            tit: '描述'
          }
        ],
        oFun: []
      },
      formObject: {
        ref: 'formObject',
        model: {
          name: '',
          number: ''
        },
        arr: [
          {
            prop: 'name',
            tit: '承运商名称'
          },
          {
            prop: 'number',
            tit: '承运商编号'
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
      let params = {
        page: this.tableObject.pageNo,
        pageSize: this.tableObject.pageSize,
        name: this.formObject.model.name,
        number: this.formObject.model.number
      }

      let { data } = await this.$http.post('/carrier/list', params),
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
      this.templateRadio = val.id
    },
    getTemplateRowInfo(row) {
      this.radioSelectInfo = row
    },
    selectSureSave() {
      if (this.radioSelectInfo === '') {
        this.showWarning('请选择承运商')
        return
      }
      this.$emit('selectCarrierName', this.radioSelectInfo)
      this.selectDialogVisible = false
    }
  }
}
</script>
