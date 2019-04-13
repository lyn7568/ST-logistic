
<template>
  <div class="List-page">
    <MyTitle text = "入库管理"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <filter-form :formObject="formObject" @addOpenDialogFun="addOpenDialogFun" @search="search"></filter-form>
      </div>
      <!-- <el-radio-group v-model="activeName" @change="tabClickFun">
        <el-radio-button v-for="item in tabList" :label="item.tab" :key="item.index">{{item.name}}</el-radio-button>
      </el-radio-group> -->
      <el-tabs v-model="activeName" type="border-card" @tab-click="tabClickFun">
        <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.tab" :key="item.index">
        </el-tab-pane>
        <complex-table ref="tableChildObj" v-loading="tableLoading"
          :tableObject="tableObjectFirst"
          @pageCurFun="currentPageChangeFirst"
          @editOpenDialogFun="editOpenDialogFun"
          @approveEvent="approveEvent"
          @deleteEvent="deleteEvent"
          @exportExcel="exportExcel"></complex-table>
      </el-tabs>
      <edit-in-storage ref="infoEditDialog"></edit-in-storage>
      <approve-in ref="approveDialog"></approve-in>
    </div>
  </div>
</template>

<script>
import complexTable from '@/components/ComplexTable'
import filterForm from '@/components/FilterForm'
import editInStorage from './editIn'
import approveIn from './approveIn'
import { slelectInStorageType } from '@/util/dict'
export default {
  data () {
    return {
      activeName: '4',
      tabList: [
        {
          tab: '4',
          name: '所有'
        },
        {
          tab: '0',
          name: '待审批'
        },
        {
          tab: '1',
          name: '已通过'
        },
        {
          tab: '2',
          name: '未通过'
        }
      ],
      tableLoading: false,
      tableObjectFirst: {
        data: [],
        pageNo: 1,
        total: 0,
        pageSize: 10,
        arr: [
          {
            prop: 'orderNumber',
            tit: '入库单号'
          },
          {
            prop: 'batch',
            tit: '批次'
          },
          {
            prop: 'productName',
            tit: '货物名称'
          },
          {
            prop: 'operationAmount',
            tit: '数量'
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
            prop: 'type',
            tit: '入库类型',
            ISType: true
          },
          {
            prop: 'supplierName',
            tit: '供应商'
          },
          {
            prop: 'supplierNumber',
            tit: '供应商编号'
          },
          {
            prop: 'supplierPhone',
            tit: '供应商联系方式'
          },
          {
            prop: 'status',
            tit: '状态',
            sTag: true
          },
          {
            prop: 'approverName',
            tit: '审批人'
          },
          {
            prop: 'approverDate',
            tit: '审批时间'
          },
          {
            prop: 'reason',
            tit: '操作理由'
          },
          {
            prop: 'operationDate',
            tit: '入库时间'
          },
          {
            operate: true,
            tit: '操作',
            width: 200,
            fixed: 'right'
          }
        ],
        hFun: [
          {
            text: '编辑',
            event: 'editOpenDialogFun'
          },
          {
            text: '审批',
            event: 'approveEvent'
          }
        ],
        oFun: [
          {
            text: '删除',
            event: 'deleteEvent'
          },
          {
            text: '导出',
            event: 'exportExcel'
          }
        ]
      },
      formObject: {
        ref: 'formObject',
        model: {
          orderNumber: '',
          type: ''
        },
        arr: [
          {
            prop: 'orderNumber',
            tit: '入库单号'
          },
          {
            prop: 'type',
            tit: '入库类型',
            select: slelectInStorageType
          }
        ],
        oFun: [
          {
            name: '新增',
            event: 'addOpenDialogFun'
          },
          {
            name: '查询',
            event: 'search'
          }
        ]
      }
    }
  },
  watch: {
    // activeName(val) {
    //   this.resetInfo()
    // }
  },
  components: {
    editInStorage,
    complexTable,
    filterForm,
    approveIn
  },
  methods: {
    currentPageChangeFirst(val) {
      this.tableObjectFirst.pageNo = val
      this.getlists()
    },
    editOpenDialogFun(val) {
      this.$refs.infoEditDialog.openDiag(val)
    },
    addOpenDialogFun() {
      this.$refs.infoEditDialog.openDiag()
    },
    async getlists() {
      let sta = parseInt(this.activeName)
      let params = {
        page: this.tableObjectFirst.pageNo,
        pageSize: this.tableObjectFirst.pageSize,
        orderNumber: this.formObject.model.orderNumber,
        type: this.formObject.model.type,
        status: (sta !== 4) ? sta : ''
      }

      let { data } = await this.$http.post('/operation/comeList', params),
          result = data.result;

      if(data.code == 1) {
        this.tableObjectFirst.data = result.result;
        this.tableObjectFirst.total = result.total;
      } else {
        this.tableObjectFirst.data = [];
      }
    },
    tabClickFun(val) {
      this.resetInfo()
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
      let { data } = await this.$http.post('/operation/deleteCome', { id:id });

      this.showMsg(data);

      if(data.code == 1) {
        this.resetInfo();
      }
    },
    approveEvent(val) {
      this.$refs.approveDialog.openDiag(val)
    },
    exportExcel(row) {
      import('@/vendor/Export2Excel').then(excel => {
        const arr = this.tableObjectFirst.arr
        const tHeader = []
        const filterVal = []
        arr.map(item => {
          tHeader.push(item.tit)
          filterVal.push(item.prop)
        })
        let list = []
        list.push(row)
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: new Date().Format('yyyyMMddhhmmss') + '_入库单'
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

<style scoped lang='scss'>

</style>
