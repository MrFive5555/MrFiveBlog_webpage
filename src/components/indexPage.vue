<template>
  <div id="containor">
    <img src="../assets/cactus.jpg"><br>
    <h1>MrFive个人主页</h1>
    <p>github:https://github.com/MrFive5555</p>
    <p>邮箱:MrFive555@qq.com</p>
  </div>
</template>

<script>
export default {
  name: 'indexPage',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
#containor {
  padding-top: 150px;
  height: 700px;
  width: 1100px;
  color: white;
}
h1 {
  font-size: 4em;
}
p {
  font-size: 2.5em;
}
img {
  border-radius: 30%;
  width: 350px;
  height: 350px;
}
</style>
