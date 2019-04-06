
<template>
  <div class="List-page">
    <MyTitle text = "承运商管理"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <filter-form :formObject="formObject" @addOpenDialogFun="addOpenDialogFun" @search="search"></filter-form>
      </div>
      <complex-table ref="tableChildObj" v-loading="tableLoading"
            :tableObject="tableObjectFirst"
            @pageCurFun="currentPageChangeFirst"
            @editOpenDialogFun="editOpenDialogFun"
            @deleteEvent="deleteEvent"></complex-table>
      <edit-carrier ref="infoEditDialog"></edit-carrier>
    </div>
  </div>
</template>

<script>
import complexTable from '@/components/ComplexTable'
import filterForm from '@/components/FilterForm'
import editCarrier from './edit'

export default {
  components: {
    editCarrier,
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
          },
          {
            prop: 'createDateTime',
            tit: '创建时间'
          },
          {
            operate: true,
            tit: '操作',
            fixed: 'right'
          }
        ],
        oFun: [
          {
            text: '编辑',
            event: 'editOpenDialogFun'
          },
          {
            text: '删除',
            event: 'deleteEvent'
          }
        ]
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
      this.tableLoading = true
      let params = {
        page: this.tableObjectFirst.pageNo,
        pageSize: this.tableObjectFirst.pageSize,
        name: this.formObject.model.name,
        number: this.formObject.model.number
      }

      let { data } = await this.$http.post('/carrier/list', params),
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
      let { data } = await this.$http.post('/carrier/delete', { id:id });

      this.showMsg(data);

      if(data.code == 1) {
        this.resetInfo();
      }
    }
  },
  created() {
    this.getlists();
  }
}
</script>
