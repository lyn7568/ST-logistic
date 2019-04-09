
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
            prop: 'name',
            tit: '货物名称'
          },
          {
            prop: 'number',
            tit: '货物编号'
          },
          {
            prop: 'classificationName',
            tit: '所属分类'
          },
          {
            prop: 'factoryNumber',
            tit: '厂商编码'
          },
          {
            prop: 'shopName',
            tit: '所属店铺'
          },
          {
            prop: 'price',
            tit: '单价'
          },
          {
            prop: 'standard',
            tit: '规格'
          },
          {
            prop: 'place',
            tit: '产地'
          },
          {
            prop: 'amount',
            tit: '数量'
          },
          {
            prop: 'totalPrice',
            tit: '总价'
          },
          {
            prop: 'createDateTime',
            tit: '创建时间'
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
            tit: '货物名称'
          },
          {
            prop: 'number',
            tit: '货物编号'
          },
          {
            prop: 'ckq',
            tit: '仓库/库区',
            cascader: this.$root.wareHouseAreas
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
      this.tableObjectFirst.pageNo = val
      this.getlists()
    },
    async getlists() {
      this.tableLoading = true
      let wid = '', aid = ''
      if (this.formObject.model.ckq){
        wid = this.formObject.model.ckq[0]
        aid = this.formObject.model.ckq[1]
      }
      let params = {
        page: this.tableObjectFirst.pageNo,
        pageSize: this.tableObjectFirst.pageSize,
        name: this.formObject.model.name,
        number: this.formObject.model.number,
        warehouseId: wid,
        areaId: aid
      }

      let { data } = await this.$http.post('/product/list', params),
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
