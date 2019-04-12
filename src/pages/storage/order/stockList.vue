
<template>
  <div class="List-page">
    <MyTitle text = "库存盘点"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <filter-form ref="filterForm" :formObject="formObject" @exportExcel="exportExcel" @search="search"
        @remoteSearchCascader="remoteSearchCascader"></filter-form>
      </div>
      <complex-table ref="tableChildObj" v-loading="tableLoading"
            :tableObject="tableObject"
            @pageCurFun="currentPageChangeFirst"></complex-table>
    </div>
  </div>
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
      tableLoading: false,
      tableObject: {
        data: [],
        pageNo: 1,
        total: 0,
        pageSize: 10,
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
            tit: '数量'
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
            cascader: true
          }
        ],
        oFun: [
          {
            name: '导出',
            event: 'exportExcel'
          },
          {
            name: '查询',
            event: 'search'
          }
        ]
      }
    }
  },
  methods: {
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
    deleteEvent(val) {
      this.$confirm('此操作有风险, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.del(val.id)
      }).catch()
    },
    async del(id) {
      let { data } = await this.$http.post('/product/delete', { id:id });

      this.showMsg(data);

      if(data.code == 1) {
        this.resetInfo();
      }
    },
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const arr = this.tableObject.arr
        const tHeader = []
        const filterVal = []
        arr.map(item => {
          tHeader.push(item.tit)
          filterVal.push(item.prop)
        })
        const list = this.tableObject.data
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: new Date().Format('yyyyMMddhhmmss') + '_库存盘点'
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    remoteSearchCascader() {
      this.$refs.filterForm.cascaderList = this.$root.wareHouseAreasThree
    }
  },
  created() {
    this.getlists();
  }
}
</script>
