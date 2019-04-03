<template>
  <div class="hello">
    <MyTitle text = "个人基本信息"></MyTitle>
    <section class="user-info white flex">
      <div class="user--label box">{{ label }}</div>
      <div class="user--right flex align-center between flex1">
        <div class = 'flex align-center'>
          <img
          :src="userface" class='cir user--face' alt="">
          <div class="user--field">账号：{{ $root.userinfo.loginName }}</div>
          <div class="user--field">姓名：{{ $root.userinfo.name }}</div>
        </div>
        <div class="edit-pwd text-center hover" @click = "$router.push('/editPwd')">修改密码</div>
      </div>
    </section>

    <MyTitle text = "累计基础数据"></MyTitle>
    <ul class="user-cards flex between">
      <li class="user-card hover" @click="toUrl('/staff/list')">
        <img :src="'./static/img/staff.png'" alt="" class="prev-count--icon">
        <div>
          <h4 class="b6-color user-card--title">员工总数</h4>
          <h4 class="b6-color user-card--num">{{ nums.staff }}</h4>
        </div>
      </li>
      <li class="user-card hover" @click="toUrl('/car/list')">
        <img :src="'./static/img/car.png'" alt="" class="prev-count--icon">
        <div>
          <h4 class="b6-color user-card--title">车辆总数</h4>
          <h4 class="b6-color user-card--num">{{ nums.car }}</h4>
        </div>
      </li>
      <li class="user-card hover" @click="toUrl('/express/list1')">
        <img :src="'./static/img/dist.png'" alt="" class="prev-count--icon">
        <div>
          <h4 class="b6-color user-card--title">配送点总数</h4>
          <h4 class="b6-color user-card--num">{{ nums.dist }}</h4>
        </div>
      </li>
      <li class="user-card hover" @click="toUrl('/express/list')">
        <img :src="'./static/img/express.png'" alt="" class="prev-count--icon">
        <div>
          <h4 class="b6-color user-card--title">快递单总数</h4>
          <h4 class="b6-color user-card--num">{{ nums.express }}</h4>
        </div>
      </li>
    </ul>

    <MyTitle text = "今日任务数据"></MyTitle>
    <ul class="user-cards flex between task">
      <li 
        class="user-card"
        v-for = "(task,i) in tasks"
        :key = "i">
        <div class="task--title">{{ task.title }}</div>
        <div class="flex between align-center full">
          <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width=".8rem" height=".36rem" viewBox="0 0 80 36" enable-background="new 0 0 80 36" xml:space="preserve">
            <rect y="34.129" :fill = "task.color" width="6" height="1.871"/>
            <rect x="10.571" y="24.625" :fill = "task.color" width="6" height="11.375"/>
            <rect x="21.143" y="21.625" :fill = "task.color" width="6" height="14.375"/>
            <rect x="31.714" y="16.125" :fill = "task.color" width="6" height="19.875"/>
            <rect x="42.286" y="19.125" :fill = "task.color" width="6" height="16.875"/>
            <rect x="52.857" y="11.875" :fill = "task.color" width="6" height="24.125"/>
            <rect x="63.429" y="26.75" :fill = "task.color" width="6" height="9.25"/>
            <rect x="74" y="16.125" :fill = "task.color" width="6" height="19.875"/>
          </svg>

          <div class = "task--text">
            <i class="el-icon-back rotate90"></i>
            <span>{{ taskData[task.field] }}</span>
          </div>
        </div>
      </li>
    </ul>

    <footer class='cp--copy b6-color'>Copyright 	&copy; 2013-2018 顺通物流 晋ICP备10011451号-6</footer>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
  data () {
    return {
      label: '身份标签',
      userface: './static/img/staff.png',
      account: '15512341234',
      nickname: '测试',

      nums: {
        staff: 0,
        car: 0,
        express: 0,
        dist: 0,
      },

      tasks: [{
        color: '#00B882',
        field: 'num1',
        title: '配送快递数'
      }, {
        color: '#A07DDE',
        field: 'num2',
        title: '配送站点数'
      }, {
        color: '#0AA8F1',
        field: 'num3',
        title: '发件数'
      }, {
        color: '#FA9376',
        field: 'num4',
        title: '快递费'
      },],
      taskData: {
        num1: 0,
        num2: 1,
        num3: 2,
        num4: 0,
      }
    }
  },
  methods: {
    toUrl(url) {
      this.$router.push(url)
    },
    async getData() {
      let params = {

      }

      let { data } = await this.$http.post('/logistics/express/getReportNums.do', params);

      if(data.code == 1) {
        let result = data.result;
        this.nums = {
          staff: result.emplyeeNum,
          car: result.truckNum,
          express: result.expressNum,
          dist: result.pointNum,
        }
        this.taskData = {
          num1: result.taskExpressNum,
          num2: result.taskpointNum,
          num3: result.taskFinishedExpressNum,
          num4: result.cost,
        }
      }
    }
  },
  created() {
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user--label {
  background: linear-gradient(90deg, #4E69EA 0, #7E9BF5 100%);
  color: #fff;
  font-size: .2rem;
  padding: 0 .08rem;
  width: 1.48rem;
  border-top-right-radius: 500px;
  border-bottom-right-radius: 500px;
  position: relative;
  top: .32rem;
  left: 0;
  height: .3rem;
  text-align: center;
}
.user-info {
  height: 1.72rem;
  font-size: .28rem;
}
.user--face {
  width: 1.28rem;
  height: 1.28rem;
  margin-left: .32rem;
}
.user--field {
  margin-left: .6rem;
}
.edit-pwd {
  border: 1px solid;
  width: 1.6rem;
  height: .48rem;
  line-height: .48rem;
  color: #1F3399;
  background: #E0E6FF;
  border-radius: 100px;
  margin-right: .54rem;
  transition: background .3s ease-in-out;
}
.edit-pwd:hover {
  background: transparent;
  transition: background .3s ease-in-out;
}
.user-card {
  width: 3.76rem;
  height: 1.6rem;
  background: #fff;
  display: flex;
  align-items: center;
}
.user-card.hover {
  box-shadow: 0 0 0 rgba(0,0,0, .2);
  transition: all .3s ease-in-out; 
}
.user-card.hover:hover {
  box-shadow: 2px 2px 20px rgba(0,0,0, .2);
}
.hover {
  cursor: pointer;
}
.task .user-card {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: .28rem;
  box-sizing: border-box; 
}
.prev-count--icon {
  width: .9rem;
  height: .9rem;
  border-radius: 50%;
  padding: 0 .36rem;
}
.user-card--title {
  font-size: .2rem;
}
.user-card--num {
  font-size: .32rem;
}

.task--title {
  font-size: .22rem;
  padding-bottom: .32rem;
}
.task--text {
  font-size: .22rem;
}
.cp--copy {
  margin-top: .6rem;
  width: 100%;
  text-align: center;
  font-size: .2rem;
  line-height: 2;
  padding-bottom: 12px;
}
</style>
