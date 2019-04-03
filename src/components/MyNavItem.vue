<template>
  <div class="my--navs">
    <el-submenu
      :index="'' + nav.id"
      v-if = "nav.subMenuList && nav.subMenuList.length > 0" @click = "to(nav)">
      <template slot="title">
        <img :src="`${$root.baseurl}${nav.iconUrl}`" alt="" class="nav--icon" v-if = "nav.iconUrl">
        <span slot="title">{{ nav.menuText || nav.title }}</span>
      </template>
      <MyNavItem
          v-for = "(item,index) in nav.subMenuList"
          :key = "'' + index"
          :nav = "item">
      </MyNavItem>
    </el-submenu>
    <el-menu-item :index="'' + nav.id" v-else @click = "to(nav)">
      <span slot="title">{{ nav.menuText || nav.title }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'MyNavItem',
  props: {
    nav: {
      default() { return [] }
    }
  },
  data () {
    return {
      icon: 1,
      flag: false,
    }
  },
  methods: {
    to(nav) {
      this.$router.push(nav.menuUrl)
      // if(nav.menuUrl) {
      //   this.$root.iframeUrl = nav.menuUrl;
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav--icon {
  /* width: .3rem; */
  height: .32rem;
  padding-right: .2rem;
}
</style>
