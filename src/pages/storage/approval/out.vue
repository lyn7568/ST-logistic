
<template>
  <div class="List-page">
    <MyTitle text = "店铺列表"></MyTitle>
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
          label="店铺名称"
          align = "center"
          width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺编号"
          align = "center"
          width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺地址"
          align = "center"
          width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺描述"
          align = "center"
          width="240">
          <template slot-scope="scope">
            <span >{{ scope.row.describe || "无" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align = "center"
          >
          <template slot-scope="scope">
            <div class="option--btns flex-center">
              <div class="option--btn" @click  = "edit(scope.row, scope)">修改</div>
              <div class="option--btn" @click  = "delConfirm(scope.row)">删除</div>
            </div>
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
      <EditShop :show.sync = "show" :obj = "obj" @close = "close" :nowIndex = "nowIndex"></EditShop>
    </div>
  </div>
</template>

<script>
import EditShop from '@/components/modals/EditShop'

export default {
  components: {
    EditShop
  },
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
    },
    edit(obj, scope) {
      this.obj = Object.assign({}, obj);
      this.show = true;
      this.nowIndex = scope.$index;
    },
    close(obj) {
      this.show = false;
      if(obj) {
        let index = this.nowIndex,
            lists = [ ...this.tableData ];
        lists[index] = obj;
        this.tableData = lists;
      }

    },
    delConfirm(obj) {
      let { id } = obj;
      this.$confirm('此操作有风险, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(obj);
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    async del(obj) {
      let { id, roleId } = obj,
          { page, pageSize } = this;

      let params = { id, page, pageSize, roleId };

      let { data } = await this.$http.post('/logistics/user/delete.do', params);

      this.showMsg(data);

      if(data.code == 1) {
        this.getlists();
      }
    }
  },
  created() {
    this.getlists();
  }
}
</script>

<style scoped lang='scss'>
.foot--pagination {
  margin: .24rem 0;
}
</style>
