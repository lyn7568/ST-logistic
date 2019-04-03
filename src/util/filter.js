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