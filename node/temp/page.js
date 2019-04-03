function getPageContent(name) {
  return `
<template>
  <div class="${name}-page">

  </div>
</template>

<script>
export default {
  name: '${name}Page',
  data () {
    return {
      
    }
  },
  methods: {

  },
  created() {

  }
}
</script>

<style scoped lang='scss'>

</style>
`
}

module.exports = {
  getPageContent
}
