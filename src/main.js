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
      shops: [],
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
      let { data } = await this.$http.post('/product/shopList', { });
      if(data.code == 1) {
        this.shops = data.result;
      }
    },
    async getWareHouses() {
      let { data } = await this.$http.post('/warehouse/list', { });
      if(data.code == 1) {
        this.wareHouses = data.result;
      }
    },
    async getWareHousesArea() {
      let { data } = await this.$http.post('/warehouse/areaList', { });
      if(data.code == 1) {
        this.wareHouseAreas = data.result;
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
    this.getWareHousesArea();
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