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
      shopArrs: [],
      wareHouses: [],
      wareHouseAreas: [],
      truckList: [], //车辆
      userList: [], //司机
      entrepotList: [], //配送点
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
    async getShops() {
      let { data } = await this.$http.post('/product/shopList', {
        page: 1,
        pageSize: 1000
       });
      if(data.code == 1) {
        this.shopArrs = data.result.result;
      }
    },
    async getWareHouses() {
      let { data } = await this.$http.get('/warehouse/getAllWarehouse', { });
      if(data.code == 1) {
        this.wareHouses = data.result;
        for(let i = 0; i < data.result.length; ++i) {
          this.getWareHousesArea(data.result[i])
        }
        this.wareHouseAreas = data.result;
      }
    },
    async getWareHousesArea(obj) {
      let { data } = await this.$http.post('/warehouse/getAreaByWarehouseId', {
        warehouseId: obj.id
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
    this.getClassificationss();
    this.getShops();
    this.getWareHouses();
    this.initData();
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
