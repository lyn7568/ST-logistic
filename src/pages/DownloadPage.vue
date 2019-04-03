<template>
  <div>
    <MyTitle text = "下载页面"></MyTitle>
    <div
      class="demo-ruleForm white">
      <a :href="download.driver" download="司机端APK下载" class='submit--btn hover'>司机端APK</a>
      <a :href="download.sender" download="配送端APK下载" class='submit--btn hover'>配送端APK</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadPage',
  data () {
    return {
      download: window.cfg.download
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
