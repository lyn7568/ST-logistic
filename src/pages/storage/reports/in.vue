
<template>
  <div class="List-page">
    <MyTitle text = "入库记录"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <el-input v-model="searchText" placeholder="请输入内容" clearable class="search--input" @change="getlists"></el-input>
      </div>
      <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        align = "center"
        :index = "(i) => i >=9 ? (i + 1) : `0${ i + 1 }`"
        label = "序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="wareHouse"
        label="区域仓库">
        <template slot-scope="scope">
          <span >{{ scope.row.wareHouse }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="150">
        <template slot-scope="scope">
          <span >{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库明细">
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="number"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="standard"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="place"
          label="产地">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="合计数量">
        <template slot-scope="scope">
          <span >{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="总金额">
        <template slot-scope="scope">
          <span >{{ scope.row.amount * scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        prop="approverName"
        label="审批人">
        <template slot-scope="scope">
          <span >{{ scope.row.approverName }}</span>
        </template>
      </el-table-column>
    </el-table>
      <div class="flex-center foot--pagination">
        <el-pagination
          background
          @current-change = "changePage"
          :current-page = "page"
          layout='prev, pager, next, jumper, ->'
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

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
    }
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
    }
  },
  created() {
    this.getlists();
  }
}
</script>

<style scoped lang='scss'>

</style>
