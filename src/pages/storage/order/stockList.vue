
<template>
  <div class="List-page">
    <MyTitle text = "库存盘点"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <filter-form :formObject="formObject" @exportExcel="exportExcel" @search="search"></filter-form>
      </div>
      <complex-table ref="tableChildObj" v-loading="tableLoading"
            :tableObject="tableObjectFirst"
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
      tableObjectFirst: {
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
        oFun: [
          {
            name: '导出',
            event: 'exportExcel'
          }
        ]
      }
    }
  },
  methods: {
    currentPageChangeFirst(val) {
      this.tableObjectFirst.pageNo = val
      this.getlists()
    },
    async getlists() {
      this.tableLoading = true
      let params = {
        page: this.tableObjectFirst.pageNo,
        pageSize: this.tableObjectFirst.pageSize
      }

      let { data } = await this.$http.post('/operation/warehouseProductList', params),
          res = data.result;
      if(data.code == 1) {
        this.tableLoading = false
        this.tableObjectFirst.data = res.result;
        this.tableObjectFirst.total = res.total;
      } else {
        this.tableLoading = false
        this.tableData = [];
      }
    },
    search(){
      this.resetInfo()
    },
    resetInfo() {
      this.tableObjectFirst.data = []
      this.tableObjectFirst.pageNo = 1
      this.tableObjectFirst.total = 0
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
        const arr = this.tableObjectFirst.arr
        const tHeader = []
        const filterVal = []
        arr.map(item => {
          tHeader.push(item.tit)
          filterVal.push(item.prop)
        })
        const list = this.tableObjectFirst.data
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
    }
  },
  created() {
    this.getlists();
  }
}
</script>
