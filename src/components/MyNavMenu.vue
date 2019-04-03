<template>
  <div class='navs' :style = "`width: ${ collapse ? '10em;' : '3rem;'}`">
    <img 
      :src="'./static/img/logo.png'" 
      alt=""
      @click = "$router.push('/nav/welcome')"
      :style = "`${ collapse ? 'width: 10em;' : ''}`"
      class='logo hover'>
    <el-menu 
      :default-active="active"
      :unique-opened="true"
      :collapse = "collapse"
      :style = "`${ collapse ? 'width: 10em;' : ''}`"
      class="el-menu-vertical-demo">
      <template
          v-for = "(nav,i) in navs"
          >
        <MyNavItem :nav = "nav" :key = "i"></MyNavItem>
      </template>
    </el-menu>
  </div>
  
</template>

<script>
import MyNavItem from '@/components/MyNavItem'
import navs from '@/assets/data/navs.js'

export default {
  name: 'MyNavMenu',
  components: {
    MyNavItem
  },
  props: {
    collapse: {
      default: false,
    }
  },
  data () {
    return {
      navs,
      active: '' + navs[0].id
    }
  },
  methods: {
    getNavs() {
      // this.$http.post('/logistics/menu/initMenuByRole.do', { roleId: this.$root.userinfo.roleId })
      // .then(({ data }) => {
      //   this.navs = data.result;
      //   this.active = this.navs[0].id
      // })
    }
  },
  created() {
    this.getNavs()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo {
  width: 3rem;
  background: #000046;
  color: #FFFFFF;
  overflow: hidden;
}
.logo {
  width: 3rem;
  height: .86rem;
  margin-bottom: -.06rem;
}
.navs {
  width: 3rem;
  min-height: 100vh;
  background: #000046;
  /* overflow-x: hidden; */
}
</style>
