import Vue from 'vue';
import {slelectDeportType,slelectAreaType,slelectLocationType,slelectInStorageType,slelectOutStorageType} from './dict.js'

function leftPad(str) {
	return str >= 10 ? str : ("0" + str);
}
Vue.filter('datetime', function (value) {
  if ((value+"").length == 10) {
    value = value + "000";
  }
  var time = new Date(+value),
      year = time.getFullYear(),
      month = time.getMonth() + 1,
      date = time.getDate(),
      hour = time.getHours(),
      minute = time.getMinutes();
  return `${year}-${leftPad(month)}-${leftPad(date)} ${leftPad(hour)}:${leftPad(minute)}`; 
});

Vue.filter('tel', function (value) {
  return value.slice(0, 3) + '****' + value.slice(7);
});

Vue.filter('pwd', function (value) {
  return `******`
});

Vue.filter('sex', function (value) {
  return value == 1 ? '男' : '女'
});
// 供应商类型
Vue.filter('sType', function (value) {
  return value == '1' ? '虚拟供应商' : '合作供应商'
});

// 仓库类型
Vue.filter('wType', function (value) {
  let w = slelectDeportType.find(item => {
    return item.id == value
  })
  return w.name
});
// 库区类型
Vue.filter('aType', function (value) {
  let w = slelectAreaType.find(item => {
    return item.id == value
  })
  return w.name
});
// 货位类型
Vue.filter('lType', function (value) {
  let w = slelectLocationType.find(item => {
    return item.id == value
  })
  return w.name
});
// 入库类型
Vue.filter('ISType', function (value) {
  let w = slelectInStorageType.find(item => {
    return item.id == value
  })
  return w.name
});
// 出库类型
Vue.filter('OSType', function (value) {
  let w = slelectOutStorageType.find(item => {
    return item.id == value
  })
  return w.name
});

// 是否禁用
Vue.filter('ifUse', function (value) {
  return value == 1 ? '是' : '否';
});

