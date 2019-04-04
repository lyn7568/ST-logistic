
<template>
  <div class="List-page">
    <MyTitle text = "入库管理"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <el-input v-model="searchText" placeholder="请输入内容" clearable class="search--input" @change="getlists"></el-input>
      </div>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.tab" :key="item.index">
          <complex-table ref="tableChildObj" v-loading="tableLoading"
            :tableObject="tableObjectFirst"
            @pageCurFun="currentPageChangeFirst"
            @pageSizeFun="pageSizeChangeFirst"
            @deleteFun="deleteFun"
            @editOpenDialogFun="editOpenDialogFun"></complex-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import complexTable from '@/components/ComplexTable'
export default {
  data () {
    return {
      show: false,
      obj: {},
      tableData: [],

      page: 1,
      pageSize: 10,
      total: 0,
      searchText: '',
      nowIndex: 0,

      activeName: '1',
      tabList: [
        {
          tab: '1',
          name: '所有'
        },
        {
          tab: '2',
          name: '待审批'
        },
        {
          tab: '3',
          name: '已通过'
        },
        {
          tab: '4',
          name: '未通过'
        }
      ],
      tableLoading: false,
      tableObjectFirst: {
        el: 'tableArea',
        data: [],
        pageNo: 1,
        total: 0,
        pageSize: 10,
        arr: [
          {
            prop: 'id',
            tit: '入库单号'
          },
          {
            prop: 'name',
            tit: '区域名称'
          },
          {
            prop: 'imageUrl',
            tit: '区域图片Url'
          },
          {
            prop: 'imageParam',
            tit: '配置参数'
          },
          {
            prop: 'type',
            tit: '区域类别'
          },
          {
            prop: 'qkSn',
            tit: '所属区域'
          },
          {
            prop: 'description',
            tit: '备注'
          },
          {
            operate: 'edit',
            tit: '操作',
            width: '100'
          }
        ],
        oFun: [
          {
            icon: 'edit',
            event: 'editOpenDialogFun'
          },
          {
            icon: 'delete',
            event: 'deleteFun'
          }
        ]
      }
    }
  },
  components: {
    complexTable
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.getlists();
    },
    async getlists() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.searchText,
      }

      let { data } = await this.$http.post('/logistics/user/getUserPageList.do', params),
          result = data.result;

      if(data.code == 1) {
        this.tableData = result.result;
        this.total = result.total_page * this.pageSize;
      } else {
        this.tableData = [];
      }
    },
    deleteFun(val){
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
    this.getlists();
  }
}
</script>

<style scoped lang='scss'>

</style>
