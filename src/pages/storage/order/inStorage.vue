
<template>
  <div class="List-page">
    <MyTitle text = "入库管理"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <div>
          <el-input v-model="searchText" placeholder="请输入入库单号内容" clearable class="search--input"></el-input>
        </div>
        <div class = "flex between list--btn__wrap">
          <div class="list--btn color--btn">搜索</div>
          <div class="list--btn color--btn" @click="addEvent">添加</div>
        </div>
      </div>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.tab" :key="item.index">
        </el-tab-pane>
        <complex-table ref="tableChildObj" v-loading="tableLoading"
            :tableObject="tableObjectFirst"
            @pageCurFun="currentPageChangeFirst"
            @pageSizeFun="pageSizeChangeFirst"></complex-table>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import complexTable from '@/components/ComplexTable'
export default {
  data () {
    return {
      searchText: '',
      activeName: '3',
      tabList: [
        {
          tab: '3',
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
            prop: 'id',
            tit: '入库单号',
            fixed: 'left'
          },
          {
            prop: 'name',
            tit: '货物名称'
          },
          {
            prop: 'number',
            tit: '货物编号'
          },
          {
            prop: 'classify',
            tit: '货物类别'
          },
          {
            prop: 'shop',
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
            prop: 'fileIds',
            tit: '图片'
          },
          {
            prop: 'status',
            tit: '状态'
          },
          {
            prop: 'approverName',
            tit: '审批人'
          },
          {
            prop: 'operationDate',
            tit: '审批时间'
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
            event: 'editEvent'
          },
          {
            text: '审批',
            event: 'approveEvent'
          },
          {
            text: '删除',
            event: 'deleteEvent'
          }
        ]
      }
    }
  },
  components: {
    complexTable
  },
  methods: {
    async queryInfoList() {
      let params = {
        page: this.tableObjectFirst.page,
        pageSize: this.tableObjectFirst.pageSize,
        name: this.searchText,
      }

      let { data } = await this.$http.post('/logistics/user/getUserPageList.do', params),
          result = data.result;

      if(data.code == 1) {
        this.tableObjectFirst.data = result.result;
        this.tableObjectFirst.total = result.total_page * this.tableObjectFirst.pageSize;
      } else {
        this.tableObjectFirst.data = [];
      }
    },
    addEvent() {

    },
    deleteEvent(val){
      var that=this
      this.$http.post('/user/delete', {
        id: val.id
      }, function(res) {
        if (res.success) {
          that.$message({
            message: "删除成功",
            type: 'success'
          })
          that.resetInfo()
        }
      })
    },
    pageSizeChangeFirst(val) {
      this.tableObjectFirst.pageSize = val
      this.queryInfoList()
    },
    currentPageChangeFirst(val) {
      this.tableObjectFirst.pageNo = val
      this.queryInfoList()
    },
    editOpenDialogFun(val) {
      this.$refs.openUserUpdateDialog.openDiag(val)
    },
    addOpenDialogFun() {
      this.$refs.openUserAreaDialog.openDiag()
    }
  },
  created() {
    this.queryInfoList();
  }
}
</script>

<style scoped lang='scss'>

</style>
