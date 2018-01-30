<template>
  <div id="wrapper" @keyup.enter="signin">
    <form method="post" action="signin">
      <div class="input_containor">用户名：
        <input type="text" name="userName" v-model="name"><br />
      </div>
      <div class="input_containor">密码：
        <input type="password" name="password" v-model="password"><br />
      </div>
      <div id="button_containor">
        <small-button @click.native="reset">清空</small-button>
        <small-button @click.native="signin">登录</small-button>
      </div>
    <p class="wrong">{{wrong}}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'

import smallButton from './tool/smallButton'
export default {
  name: 'signin',
  data () {
    return {
      name: '',
      password: '',
      wrong: ''
    }
  },
  methods: {
    reset: function () {
      this.name = ''
      this.password = ''
      this.wrong = ''
    },
    signin: function () {
      this.wrong = ''
      axios
        .post('/signin', {
          userName: this.name,
          password: this.password
        },
        {timeout: config.timeout})
        .then((respone, state) => {
          console.log(respone.data, state)
          if (respone.data) {
            alert('登录成功')
            this.$emit('login', respone.data)
          } else {
            this.wrong = '错误的用户名或者密码'
          }
        })
        .catch((err) => {
          console.log(err)
          this.wrong = '未知的服务器内部错误,请联系管理员解决'
        })
    }
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

input[type="text"], input[type="password"] {
  margin: 5px 0;
  width: 170px;
  color: black;
}

h1 {
  text-align: center;
}

#button_containor {
  width: 250px;
  text-align: center;
  margin: 0 auto;
}

.input_containor {
  width: 250px;
  text-align: right;
  margin:10px 0 10px 0;
}
.input_hint {
  width: 180px;
  font-size: 0.8em;
  display: inline-block;
  text-align: left;
  color: red;
}
.wrong {
  text-align: center;
}
</style>
