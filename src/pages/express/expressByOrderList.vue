
<template>
  <div class="List-page">
    <MyTitle text = "快递单号查询"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <filter-form :formObject="formObject" @search="search"></filter-form>
      </div>
      <complex-table ref="tableChildObj" v-loading="tableLoading"
        :tableObject="tableObjectFirst"
        @pageCurFun="currentPageChangeFirst"
        @updateStatusEvent="updateStatusEvent"></complex-table>
      <update-status ref="updateStatusDialoag"></update-status>
    </div>
  </div>
</template>

<script>
import complexTable from '@/components/ComplexTable'
import filterForm from '@/components/FilterForm'
import updateStatus from './updateExpressStatus'
import { statusbyOrderArr } from '@/util/dict'
export default {
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
            prop: 'expressNumber',
            tit: '快递单号'
          },
          {
            prop: 'fromCompanyName',
            tit: '快递公司'
          },
          {
            prop: 'sendPointName',
            tit: '配送点'
          },
          {
            prop: 'truckNum',
            tit: '车牌号'
          },
          {
            prop: 'courierName',
            tit: '司机'
          },
          {
            prop: 'statusValue',
            tit: '状态'
          },
          {
            operate: true,
            tit: '操作',
            width: 200,
            fixed: 'right'
          }
        ],
        oFun: [
          {
            text: '修改状态',
            event: 'updateStatusEvent'
          }
        ]
      },
      formObject: {
        ref: 'formObject',
        model: {
          expressNumber: '',
          truckId: '',
          fromCompanyId: '',
          sendPointId: '',
          status: ''
        },
        arr: [
          {
            prop: 'expressNumber',
            tit: '快递单号'
          },
          {
            prop: 'truckId',
            tit: '快递车辆',
            select: this.$root.truckList,
            name: 'truckNum'
          },
          {
            prop: 'fromCompanyId',
            tit: '快递公司',
            select: this.$root.companyList
          },
          {
            prop: 'sendPointId',
            tit: '配送点',
            select: this.$root.entrepotList,
            name: 'entrepotName'
          },
          {
            prop: 'status',
            tit: '状态',
            select: statusbyOrderArr
          }
        ],
        oFun: [
          {
            name: '查询',
            event: 'search'
          }
        ]
      }
    }
  },
  components: {
    complexTable,
    filterForm,
    updateStatus
  },
  methods: {
    currentPageChangeFirst(val) {
      this.tableObjectFirst.pageNo = val
      this.getlists()
    },
    async getlists() {
      let params = {
        page: this.tableObjectFirst.pageNo,
        pageSize: this.tableObjectFirst.pageSize,
        expressNumber: this.formObject.model.expressNumber,
        truckId: this.formObject.model.truckId,
        fromCompanyId: this.formObject.model.fromCompanyId,
        sendPointId: this.formObject.model.sendPointId,
        status: this.formObject.model.status
      }

      let { data } = await this.$http.post('/logistics/express/getExpressInfoByOrder', params),
          result = data.result;

      if(data.code == 1) {
        this.tableObjectFirst.data = result.result;
        this.tableObjectFirst.total = result.total;
      } else {
        this.tableObjectFirst.data = [];
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
    updateStatusEvent(row) {
      this.$refs.updateStatusDialoag.openDiag(row)
    },
    async initData() {
      let { data } = await this.$http.post('/logistics/express/initDataForExpressInput.do', {});

      if(data.code == 1) {
        let result = data.result;
        this.truckList = result.truckList;
        this.userList = result.userList;
        this.entrepotList = result.entrepotList;
      } else {
        this.truckList = [];
        this.userList = [];
        this.entrepotList = [];
      }
    },
    async getCompany() {
      let { data } = await this.$http.post('/logistics/expressCompany/getExpressCompanyList.do', { status: 1 });

      if(data.code == 1) {
        this.companyList = data.result;
      }
    }
  },
  created() {
    this.initData();
    this.getCompany();
    this.getlists();
  }
}
</script>

<style scoped lang='scss'>

</style>
