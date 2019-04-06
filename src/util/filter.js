import Vue from 'vue';

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
  switch(value){
    case '0':
      return '成品仓库';
    case '1':
      return '原料仓库';
    case '2':
      return '半成品仓库';
  }
});
// 库区类型
Vue.filter('aType', function (value) {
  switch(value){
    case '0':
      return '正式库区';
    case '1':
      return '待入库区';
    case '2':
      return '待检库区';
    case '3':
      return '待出库区';
    case '4':
      return '报损库区';
  }
});
// 货位类型
Vue.filter('lType', function (value) {
  switch(value){
    case '0':
      return '正常货位';
    case '1':
      return '其他货位';
  }
});
// Vue.filter('classifyName', function (value) {
//   let rIn = Vue.$root.classifications.find((item) =>{
//     return item.id = value
//   }) 
//   return rIn.name
// });
// Vue.filter('shopName', function (value) {
//   let rIn = Vue.$root.shops.find((item) =>{
//     return item.id = value
//   }) 
//   return rIn.name
// });
