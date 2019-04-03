
<template>
  <div class="List-page">
    <MyTitle text = "配送点列表"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex search--wrap">
        <el-input 
          v-model="search.entrepotCode" 
          placeholder="请输入配送点编码" 
          clearable 
          class="search--input" 
          @change="getlists"></el-input>
        <el-input 
          v-model="search.entrepotName" 
          placeholder="请输入配送点名称" 
          clearable 
          class="search--input" 
          @change="getlists"></el-input>
      </div>
      
      <el-table
        :data="tableData"
        stripe
        >
        <el-table-column
          type="index"
          align = "center"
          :index = "(i) => i >=9 ? (i + 1) : `0${ i + 1 }`"
          label = "序号"
          width="80">
        </el-table-column>
        <el-table-column
          label="配送点编码"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ scope.row.entrepotCode || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="配送点名称"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ scope.row.entrepotName || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="配送点联系电话"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ scope.row.entrepotTel | tel }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单个快件收费额度"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ scope.row.charge }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="管理员"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ getManagerName(scope.row.entrepotManagerId) }}</span>
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
      <EditPei :show.sync = "show" :obj = "obj" @close = "close" :nowIndex = "nowIndex"></EditPei>
    </div>
  </div>
</template>

<script>
import EditPei from '@/components/modals/EditPei'

export default {
  name: 'ListPage',
  components: {
    EditPei
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
      managers: [],
      search: {
        entrepotName: '',
        entrepotCode: '',
      }
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
        entrepotCode: this.search.entrepotCode,
        entrepotName: this.search.entrepotName,
      }

      let { data } = await this.$http.post('/logistics/entrepot/getEntrepotPageList.do', params),
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

      let params = { id, status: 2, };

      let { data } = await this.$http.post('/logistics/entrepot/save.do', params);

      this.showMsg(data);

      if(data.code == 1) {
        this.getlists();
      }
    },
    async getManagers() {
    
      let { data } = await this.$http.post('/logistics/user/getEntrepotManagerListByCdtn.do', { status: 1 });

      if(data.code == 1) {
        this.managers = data.result;
      }
    },
    getManagerName(id) {
      var item = this.managers.filter(v => v.id === id) || [{}];
      return item[0] && item[0].name || '无';
    }
  },
  created() {
    this.getManagers();
    this.getlists();
  }
}
</script>

<style scoped lang='scss'>
.foot--pagination {
  margin: .24rem 0;
}
.search--wrap .el-input {
  width: 180px;
  margin-right: 24px;
}
</style>
