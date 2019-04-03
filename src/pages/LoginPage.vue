<template>
  <div class="relative flex-center login--page">
    <img 
      :src="'./static/img/bg.jpg'"
      class = 'login--bg absolute'
      alt="">
    <div class="login--main relative">
      <img 
        :src="'./static/img/login-card.png'"
        class = 'login--card absolute'
        alt="">
      <form class="login--form absolute box">
        <h2 class="login--title">欢迎登录</h2>
        <div class="form--field flex align-center">
          <img 
            :src="'./static/img/username.png'"
            class = 'form--icon'
            alt="">
          <input 
            type="text"
            placeholder="请输入账号"
            v-model = "form.loginName"
            class="login--input">
        </div>
        <div class="form--field flex align-center">
          <img 
            :src="'./static/img/pwd.png'"
            class = 'form--icon'
            alt="">
          <input 
            type="password"
            placeholder="请输入密码"
            v-model = "form.loginPassword"
            class="login--input">
        </div>

        <div
          class="login--btn text-center hover"
          @click = 'login'>登录</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        loginName: '',
        loginPassword: ''
      }
    }
  },
  methods: {
    login() {

      this.$http.post('/logistics/user/login.do', { ...this.form, roleId: 1},)
      .then(({ data }) => {
        this.$message({
          message: data.message,
          type: data.code == 1 ? 'success' : 'error'
        });
        if(data.code == 1) {
          this.$root.userinfo = data.result;
          window.localStorage.userinfo = JSON.stringify(data.result);
          this.$router.replace('/nav/welcome')
        }
      })
    }
  },
  created() {
    if(window.cfg.isDev && window.localStorage.userinfo) {
      this.$router.replace(this.$route.query.redirect || '/nav/welcome')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login--page {
  width: 19.2rem;
  height: 10.8rem;
}
.login--bg {
  width: 19.2rem;
  height: 10.8rem;
  top: 0;
  left: 0;
  z-index: -1;
}
.login--main {
  width: 10.1rem;
  height: 6.1rem;
}
.login--card {
  width: 10.1rem;
  height: 6.1rem;
  top: 0;
  left: 0;
  z-index: 0;
}
.login--form {
  width: 4.25rem;
  height: 5.2rem;
  top: .4rem;
  right: .4rem;
  padding: .68rem .5rem;
}
.login--title {
  font-size: .28rem;
  margin-bottom: .72rem;
}
.form--field {
  width: 100%;
  margin-bottom: .64rem;
  border-bottom: 1px solid #807C7D;
}
.login--input {
  appearance: none;
  border: 0;
  outline: none;
  padding-left: .12rem;
  font-size: .2rem;
  display: inline-flex;
  align-items: center;
  height: .36rem;
  line-height: .36rem;
  background: transparent;
}
.form--icon {
  width: .38rem;
  height: .36rem;
}
.login--btn {
  width: 100%;
  border-radius: 200px;
  height: .6rem;
  line-height: .6rem;
  background: linear-gradient(90deg, #4F6AEB 0, #7E9BF4 100%);
  box-shadow: 0px .1rem .19rem #AEBAF6;
  font-size: .24rem;
  color: #fff;
  transition: background  .3s ease-in-out, box-shadow  .3s ease-in-out;
}
.login--btn:hover {
  background: linear-gradient(90deg, #7E9BF4 0, rgb(158, 175, 223) 100%);
  box-shadow: 0px .1rem .19rem rgb(137, 149, 207);
  transition: background .3s ease-in-out;
}
</style>
