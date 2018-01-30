<template>
  <div id="containor">
    <h1>留言墙</h1>
    <review-bar
      :user="user"
      :Title="'__reviewPage__'"
      :numPerPage="4"
    ></review-bar>
  </div>
</template>

<script>
import reviewBar from './tool/reviewBar'

export default {
  name: 'reviewPage',
  data () {
    return {
    }
  },
  props: ['user'],
  methods: {
  },
  components: {
    reviewBar
  }
}
</script>

<style scoped>
h1 {
  color: white;
}
</style>
