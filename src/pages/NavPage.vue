<template>
  <div class = "flex full">
    <MyNavMenu :collapse = "collapse"></MyNavMenu>
    <div class="right--main flex1">
      <div class="right--header flex between align-center">
        <img :src="'./static/img/three.png'" alt="" class='three-img hover' @click = "toggleCollapse">
        <el-popover
          placement="bottom"
          width="200"
          :visible-arrow = "false"
          trigger="hover"
          >
          <ul class = "relative pop--ul">
            <img :src="'./static/img/poper.png'" alt="" class="tooltip--img absolute">
            <li class = ' pop--item' @click = "toChange">
              <img :src="'./static/img/editPwd.png'" alt="" class='user-top--icon'>
              <span class="pop--text">修改密码</span>
            </li>
            <li class = ' pop--item' @click = "$root.logout">
              <img :src="'./static/img/exit.png'" alt="" class='user-top--icon'>
              <span class="pop--text">退出登录</span>
            </li>
          </ul>
          <div slot="reference" class="user--face__wrap flex-center hover">
            <img :src="userface" alt="" class='user-top--face'>
            <div class="user-top--name">{{ $root.userinfo.loginName }}</div>
            <i class="el-icon-caret-bottom user-top--arrow b9-color"></i>
          </div>
        </el-popover>
      </div>
      <!-- <iframe :src="baseurl + $root.iframeUrl" frameborder="0" class="router-page box"></iframe> -->
      <router-view class="router-page box"/>
    </div>
    
  </div>
</template>

<script>
import MyNavMenu from '@/components/MyNavMenu'

export default {
  name: 'NavPage',
  components: {
    MyNavMenu
  },
  data() {
    return {
      userface: './static/img/face.png',
      account: 'admin',
      collapse: false,
      baseurl: window.cfg.iframe,
    }
  },
  methods: {
    toggleCollapse() {
      this.collapse = !this.collapse;
    },
    toChange() {
      this.$router.push('/editPwd');
    }
  }
}
</script>

<style>
.three-img {
  width: .26rem;
  height: .22rem;
}
.right--header {
  height: .84rem;
  background: #fff;
  padding: 0 .32rem;
}
.router-page {
  width: 100%;
  padding: .2rem .32rem;
  /* height: 800px; */
}
.user-top--face {
  width: .64rem;
  height: .64rem;
}
.user-top--name,
.user-top--arrow {
  font-size: .28rem;
  color: #999;
}
.user-top--name {
  padding: 0 .2rem;
  color: #333;
}
.pop--text {
  font-size: .24rem;
  padding-left: .12rem;
}
.tooltip--img {
  width: 2.24rem;
  height: 1.71rem;
  top: -.1rem; left: 0;
  z-index: -2;
}
.pop--ul {
  top: -.2rem;
}
.user-top--icon {
  width: .26rem;
}
</style>
