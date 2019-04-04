
<template>
  <div class="InlistPage-page">
    <MyTitle text = "快递单分配记录"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <div>
          <el-select filterable v-model="ruleForm.toPointIds" multiple placeholder="请选择配送站点">
            <el-option
              v-for="item in entrepotList"
              :key="item.id"
              :label="item.entrepotName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select filterable v-model="ruleForm.courierId" placeholder="请选择配送司机">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </div>
        <div class = "flex between list--btn__wrap">
          <div class="list--btn color--btn" @click = "getlists">搜索</div>
          <div class="list--btn color--btn" @click = "toExcel">导出</div>
        </div>
        
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
          label="目标配送点"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ getText(scope.row.sendPointId, 'entrepotList', 'entrepotName') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="配送车牌号"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ getText(scope.row.truckId, 'truckList', 'truckNum') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="配送司机"
          align = "center"
          >
          <template slot-scope="scope">
            <span >{{ getText(scope.row.courierId, 'userList', 'name') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="配送时间"
          align = "center"
          width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.sendTime || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align = "center"
          width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.status | status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="录入时间"
          align = "center"
          width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最新修改时间"
          align = "center"
          width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.updateTime  }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          align = "center"
          >
          <template slot-scope="scope">
            <div class="option--btns flex-center">
              <div class="option--btn" @click  = "edit(scope.row, scope)">修改</div>
              <div class="option--btn" @click  = "delConfirm(scope.row)">删除</div>
            </div>
          </template>
        </el-table-column> -->
      </el-table>

    </div>

    <form :action="`${url}/logistics/express/export.do`" method = "POST" class = "hide-form">
      <input type="text" name = "pIds" :value = "pIds" class="pIds">
      <input type="text" name = "trId" :value = "trId" class="trId">
      <input type="submit" id ="form-btn">
    </form>
  </div>
</template>

<script>
import EditStaff from '@/components/modals/EditStaff'

export default {
  name: 'InlistPage',
  components: {
    EditStaff
  },
  computed: {
    pIds() {
      return this.ruleForm.toPointIds.join(",")
    },
    trId() {
      return this.ruleForm.courierId
    }
  },
  data () {
    return {
      show: false,
      obj: {},
      tableData: [],
      truckList: [], //车辆
      userList: [], //司机
      entrepotList: [], //配送点
      ruleForm: {
        toPointIds: [],
        courierId: ''
      },
      url: window.cfg.baseurl,

    }
  },
  filters: {
    status(value) {
      var obj = {
        1: '已接收',
        2: '已分配未发放',
        3: '已分配配送中',
        4: '已分配已送达',
      }
      return obj[value];
    }
  },
  methods: {
    getText(id, type, name) {
      if(!id) return '无';

      var lists = this[type];
      if(!lists) return '无';

      var obj = lists.filter(v => v.id == id)[0];

      var text = (obj && obj[name]) || '无'

      return text;
    },
    async initData() {
      let { data } = await this.$http.post('/logistics/express/initData.do', {});

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
    async getlists() {
      let params = {
        toPointIds: this.ruleForm.toPointIds.join(","),
        truckId: this.ruleForm.courierId,
      }

      let { data } = await this.$http.post('/logistics/express/getExpressList4Show.do', params),
          result = data.result;

      if(data.code == 1) {
        // let courierId = this.ruleForm.courierId;
        // if(courierId) {
        //   result = result.filter(v => v.courierId == courierId);
        // }

        this.tableData = result;
      } else {
        this.tableData = [];
      }
    },
    toExcel() {
      document.querySelector("#form-btn").click();
    }
    
  },
  created() {
    this.initData();
    this.getlists();
  },
  mounted() {
    
  },
}
</script>

<style scoped lang='scss'>
.foot--pagination {
  margin: .24rem 0;
}
</style>
