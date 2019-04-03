
<template>
  <div class="List-page">
    <MyTitle text = "仓货管理"></MyTitle>
    <div class="staff-manage white1">
      <div class="components-container">
        <split-pane split="horizontal">
          <template slot="paneL">
            <split-pane split="vertical">
              <template slot="paneL">
                <div class="left-container"></div>
              </template>
              <template slot="paneR">
                <div class="right-container"></div>
              </template>
            </split-pane>
          </template>
          <template slot="paneR">
            <div class="bottom-container"></div>
          </template>
        </split-pane>
      </div>
    </div>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'

export default {
  components: { splitPane },
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
.components-container {
  position: relative;
  height: 72vh;
}
.left-container {
  background-color: #F38181;
  width: 100%;
  height:100%;
}

.right-container {
  background-color: #FCE38A;
  width: 100%;
  height: 100%;
}
.bottom-container {
  width: 100%;
  background-color: #95E1D3;
  height: 100%;
}
</style>
