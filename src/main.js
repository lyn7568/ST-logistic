import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui';

import './assets/normal.scss';
import './assets/index.scss';

Vue.config.productionTip = false;

// import 'element-ui/lib/theme-chalk/index.css';

import './util/importCmp';
import './util/rem';
import './util/http';

import mixin from './util/mixin'
Vue.mixin(mixin)

// Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data() {
    return {
      iframeUrl: '',
      userinfo: {},
      baseurl: window.cfg.baseurl,
      roles: [],
      classifications: [],
      wareHouseAreasOne: [],
      wareHouseAreasTwo: [],
      wareHouseAreasThree: [],
      truckList: [], //车辆
      userList: [], //司机
      entrepotList: [], //配送点
      companyList: []
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem('userinfo');
      this.userinfo = {};
      this.$router.replace('/')
    },
    clear() {
      if(window.cfg.isDev) return ;
      window.addEventListener('unload', function() {
        window.localStorage.removeItem('userinfo');
      })
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
    async getCompany() {
      let { data } = await this.$http.post('/logistics/expressCompany/getExpressCompanyList.do', { status: 1 });

      if(data.code == 1) {
        this.companyList = data.result;
      }
    },
    async getRoles() {
      let { data } = await this.$http.post('/logistics/role/getRoleList.do', { status: 1 });
      if(data.code == 1) {
        this.roles = data.result;
      }
    },
    async getClassificationss() {
      let { data } = await this.$http.get('/product/getProClassify', { });
      if(data.code == 1) {
        this.classifications = data.result;
      }
    },
    // 一级仓库
    async getWareHousesOne() {
      let { data } = await this.$http.get('/warehouse/getAllWarehouse', { });
      if(data.code == 1) {
        var obj = data.result;
        this.wareHouseAreasOne = obj;
      }
    },
    // 俩级联动
    async getWareHousesTwo() {
      let { data } = await this.$http.get('/warehouse/getAllWarehouse', { });
      if(data.code == 1) {
        var obj = data.result;
        for(let i = 0; i < obj.length; ++i) {
          this.getWareHousesAreaTwo(obj[i])
        }
        this.wareHouseAreasTwo = obj;
      }
    },
    async getWareHousesAreaTwo(obj) {
      let { data } = await this.$http.post('/warehouse/getAreaByWarehouseId', {
        warehouseId: obj.id
      });
      if(data.code == 1) {
        obj.result = data.result
      }
    },
    // 三级联动
    async getWareHousesThree() {
      let { data } = await this.$http.get('/warehouse/getAllWarehouse', { });
      if(data.code == 1) {
        var obj = data.result;
        for(let i = 0; i < obj.length; ++i) {
          this.getWareHousesAreaThree(obj[i])
        }
        this.wareHouseAreasThree = obj;
      }
    },
    async getWareHousesAreaThree(obj) {
      let { data } = await this.$http.post('/warehouse/getAreaByWarehouseId', {
        warehouseId: obj.id
      });
      if(data.code == 1) {
        obj.result = data.result
        var mm =  data.result
        for(let i = 0; i < mm.length; ++i) {
          this.getAreasLocation(mm[i])
        }
      }
    },
    async getAreasLocation(obj) {
      let { data } = await this.$http.post('/warehouse/getLocationByAreaId', {
        areaId: obj.id
      });
      if(data.code == 1) {
        obj.result = data.result
      }
    }
  },
  created() {
    if(window.cfg.isDev) {
      var userinfo = window.localStorage.userinfo;
      try {
        if(userinfo) {
          userinfo = JSON.parse(userinfo);
          this.userinfo = userinfo;
        }
      } catch(err) {}
    }
    this.clear();
    this.getRoles();
    this.initData();
    this.getCompany();
    this.getClassificationss();
    this.getWareHousesOne();
    this.getWareHousesTwo();
    this.getWareHousesThree();
  },
  render: h => h(App)
});

// {
//   "age":0,
//   "birthday":"2018-10-07",
//   "createTime":"2018-10-07",
//   "id":1,
//   "loginName":"admin",
//   "loginPassword":"",
//   "name":"管理",
//   "oldPassword":"",
//   "page":0,
//   "pageSize":0,
//   "praiseRate":0,
//   "roleId":1,
//   "sex":0,
//   "status":1,
//   "tel":"15711098765",
//   "updateTime":"2018-11-04 10:24:07"
// }
