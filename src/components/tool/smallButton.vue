<template>
  <div @select.prevent><slot></slot></div>
</template>

<script>
export default {
  name: 'smallButton',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
div {
  height: 38px;
  width: 90px;
  margin-right: 10px;
  border-radius: 10px;
  font-size: 1.1em;
  display: inline-block;
  padding-top: 10px;
  background-color: rgb(105, 113, 116);
  text-align: center;
  color: white;

  /* 禁止选中文字 */
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
div:hover {
  box-shadow: 0 0 6px 4px rgb(117, 126, 133) inset;
  background-color: rgb(68, 83, 95);
}

</style>
