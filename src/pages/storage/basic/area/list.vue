
<template>
  <div class="List-page">
    <MyTitle text = "库区管理"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <filter-form ref="filterForm" :formObject="formObject"
        @addOpenDialogFun="addOpenDialogFun" @search="search"
        @remoteSearchSort="remoteSearchSort"></filter-form>
      </div>
      <complex-table ref="tableChildObj" v-loading="tableLoading"
            :tableObject="tableObjectFirst"
            @pageCurFun="currentPageChangeFirst"
            @editOpenDialogFun="editOpenDialogFun"
            @deleteEvent="deleteEvent"></complex-table>
      <edit-deport ref="infoEditDialog"></edit-deport>
    </div>
  </div>
</template>

<script>
import complexTable from '@/components/ComplexTable'
import filterForm from '@/components/FilterForm'
import editDeport from './edit'

import { slelectAreaType } from '@/util/dict'

export default {
  components: {
    editDeport,
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
            tit: '库区名称'
          },
          {
            prop: 'number',
            tit: '库区编号'
          },
          {
            prop: 'type',
            tit: '类型',
            aType: true
          },
          {
            prop: 'warehouseName',
            tit: '所属仓库'
          },
          {
            prop: 'ifUse',
            tit: '是否禁用',
            ifUse: true
          },
          {
            prop: 'remark',
            tit: '备注'
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
          number: '',
          type: ''
        },
        arr: [
          {
            prop: 'name',
            tit: '库区名称'
          },
          {
            prop: 'number',
            tit: '库区编号'
          },
          {
            prop: 'type',
            tit: '类型',
            select: slelectAreaType
          },
          {
            prop: 'warehouseId',
            tit: '所属仓库',
            selectSearch: true
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
        number: this.formObject.model.number,
        type: this.formObject.model.type,
        warehouseId: this.formObject.model.warehouseId
      }

      let { data } = await this.$http.post('/warehouse/areaList', params),
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
      let { data } = await this.$http.post('/waehouse/deleteArea', { id:id });

      this.showMsg(data);

      if(data.code == 1) {
        this.resetInfo();
      }
    },
    remoteSearchSort() {
      this.$refs.filterForm.backInfoArr = this.$root.wareHouseAreasOne
    }
  },
  created() {
    this.getlists();
  }
}
</script>
