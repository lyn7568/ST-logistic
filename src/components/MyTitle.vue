<template>
  <h3 class="my-title">{{ text }}</h3>
</template>

<script>
export default {
  name: 'MyTitle',
  props: {
    text: { default: '' }
  },
  data () {
    return {

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-title {
  font-size: .28rem;
  margin: .2rem 0;
}
</style>
