<template>
  <el-dialog
    title="选择所属店铺"
    :visible.sync="selectDialogVisible"
    :close-on-click-modal="false">
    <div class="flex between search--wrap">
      <filter-form :formObject="formObject" @search="search"></filter-form>
    </div>
    <complex-table ref="tableChildObj" v-loading="tableLoading"
      :tableObject="tableObject"
      @pageCurFun="currentPageChangeFirst"></complex-table>
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
        arr: [
          {
            prop: 'name',
            tit: '店铺名称'
          },
          {
            prop: 'number',
            tit: '店铺编号'
          },
          {
            prop: 'address',
            tit: '地址'
          },
          {
            prop: 'des',
            tit: '描述'
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
            tit: '店铺名称'
          },
          {
            prop: 'number',
            tit: '店铺编号'
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
    openDiag() {
      var that = this
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

      let { data } = await this.$http.post('/product/shopList', params),
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
    selectSureSave() {
      console.log(111)
    }
  }
}
</script>
