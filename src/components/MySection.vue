<template>
  <div class="my-section">
    <h2 class='my--title'>{{ obj.title }}</h2>

    <blockquote 
      v-if = "obj.content.type == 'code'"
      class = "my--code">
      <div 
        v-for = "(text,i) in obj.content.lists" 
        :key = "i"
        class = "code--item flex-center between">
        <div>{{ text }}</div>
        <div class="my--button" @click = "copy(text)">复制</div>
      </div>
    </blockquote>

    <ol v-if = "obj.content.type == 'ol'">
      <li v-for = "(text,i) in obj.content.lists" :key = "i">{{ i + 1 }}. {{ text }}</li>
    </ol>

  </div>
</template>

<script>
import MyNavItem from '@/components/MyNavItem'

export default {
  name: 'MySection',
  props: {
    obj: {
      default() { return {}; }
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    copy(text) {
      this.$root.edit = text;
      this.$root.copy();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.my--title {
  line-height: 1.2em;
  padding-bottom: 1em ;
  color: var(--color);
}
.code--item {
  padding: .1em 12px;
  margin: 0.8em 0;
  border-left: 2px solid #fff;
}
</style>
