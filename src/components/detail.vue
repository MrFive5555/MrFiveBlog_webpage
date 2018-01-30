<template>
  <div id="wrapper">
    <form method="post" action="regist">
      <div class="input_containor">用户名：<div class="info">{{ user.userName }}</div><br />
      </div>
      <div class="input_containor">学号：<div class="info">{{ user.id }}</div><br />
      </div>
      <div class="input_containor">电话：<div class="info">{{ user.phone }}</div><br />
      </div>
      <div class="input_containor">邮箱：<div class="info">{{ user.email }}</div><br />
      </div>
      <div id="button_containor">
        <small-button @click.native="$emit('logout')">退出登录</small-button>
      </div>
    </form>
  </div>
</template>

<script>
import smallButton from './tool/smallButton'

export default {
  name: 'detail',
  props: ['user'],
  data () {
    return {}
  },
  components: {
    smallButton
  }
}
</script>

<style scoped>
#wrapper {
  width: 250px;
  height: 250px;
  margin: 0 auto;
}

.info {
  margin: 5px 0;
  width: 150px;
  display: inline-block;
  text-align: left;
}

fieldset {
  width: 280px;
  margin: 0 auto;
  padding: 0 0 10px 0;
  text-align: left;
}

legend {
  font-size: 30px;
  text-align: center;
}

h1 {
  text-align: center;
}

#button_containor {
  width: 120px;
  margin: 10px auto 0 auto;
  text-align: center;
}

.input_containor {
  width: 250px;
  text-align: right;
  margin:4px 0 3px 0;
}
.input_hint {
  width: 180px;
  font-size: 0.8em;
  display: inline-block;
  text-align: left;
  color: red;
}
</style>
