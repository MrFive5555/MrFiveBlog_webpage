<template>
  <div id="wrapper">
    <form method="post" action="regist">
      <div class="input_containor">用户名：<input type="text" name="userName" v-model="name">
      <div class="input_hint">{{ wrongName }}</div></div>

      <div class="input_containor">学号：<input type="text" name="userid" v-model="id">
      <div class="input_hint">{{ wrongId }}</div></div>

      <div class="input_containor">电话：<input type="text" name="telphone" v-model="phone">
      <div class="input_hint">{{ wrongPhone }}</div></div>

      <div class="input_containor">邮箱：<input type="text" name="email" v-model="email">
      <div class="input_hint">{{ wrongEmail }}</div></div>

      <div class="input_containor">密码：<input type="password" name="password" v-model="password">
      <div class="input_hint">{{ wrongPassword }}</div></div>

      <div class="input_containor">重复密码：<input type="password" name="repeatPassword" v-model="repeatPassword">
      <div class="input_hint">{{ wrongRepeatPassword }}</div></div>
      <div id="button_containor">
        <small-button @click.native="reset">清空</small-button>
        <small-button @click.native="regist">提交</small-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'

import smallButton from './tool/smallButton'

export default {
  name: 'register',
  data () {
    return {
      name: '',
      id: '',
      phone: '',
      email: '',
      password: '',
      repeatPassword: '',
      wrongName: '',
      wrongId: '',
      wrongPhone: '',
      wrongEmail: '',
      wrongPassword: '',
      wrongRepeatPassword: ''
    }
  },
  methods: {
    reset () {
      this.name = ''
      this.id = ''
      this.phone = ''
      this.email = ''
      this.password = ''
      this.repeatPassword = ''

      this.wrongWrong = ''
      this.wrongName = ''
      this.wrongId = ''
      this.wrongPhone = ''
      this.wrongEmail = ''
      this.wrongPassword = ''
      this.wrongRepeatPassword = ''
      this.wrongWrong = ''
    },
    regist () {
      this.wrongWrong = ''
      this.wrongName = ''
      this.wrongId = ''
      this.wrongPhone = ''
      this.wrongEmail = ''
      this.wrongPassword = ''
      this.wrongRepeatPassword = ''
      this.wrongWrong = ''

      var pattName = /^[a-zA-Z]\w{5,17}/
      var pattId = /^[1-9][0-9]{7}$/
      var pattTel = /^[1-9][0-9]{10}$/
      var pattMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      var pattPassword = /^[\w_-]{6,12}$/

      var valid = true
      if (pattName.test(this.name) === false) {
        this.wrongName = '格式错误:需要6~18位英文字母、数字或下划线，必须以英文字母开头'
        valid = false
      }
      if (pattId.test(this.id) === false) {
        this.wrongId = '格式错误:需要8位数字，不能以0开头'
        valid = false
      }
      if (pattTel.test(this.phone) === false) {
        this.wrongPhone = '格式错误:需要11位数字，不能以0开头'
        valid = false
      }
      if (pattMail.test(this.email) === false) {
        this.wrongEmail = '格式错误'
        valid = false
      }
      if (pattPassword.test(this.password) === false) {
        this.wrongPassword = '格式错误:需要6~12位数字、大小写字母、中划线、下划线'
        valid = false
      }
      if (this.password !== this.repeatPassword) {
        this.wrongRepeatPassword = '错误:两次输入的密码不一致'
        valid = false
      }
      var registUser = {
        userName: this.name,
        id: this.id,
        phone: this.phone,
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      }
      if (!valid) {
        return
      }
      axios
        .post('/regist', registUser, {timeout: config.timeout})
        .then(
          (response) => {
            let data = response.data
            if (data === 'valid') {
              alert('注册成功')
              this.$emit('login', registUser)
            } else if (data === 'invalid') {
              alert('表单内容错误,请检查表单格式,或刷新页面重试')
            } else {
              if (data.userName) {
                this.wrongName = '用户名已经被注册'
              }
              if (data.id) {
                this.wrongId = '学号已经被注册'
              }
              if (data.phone) {
                this.wrongPhone = '电话已经被注册'
              }
              if (data.email) {
                this.wrongEmail = '邮箱已经被注册'
              }
            }
          }
        )
        .catch((err) => {
          console.log(err)
          alert('未知的服务器内部错误,请联系管理人员')
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
  width: 160px;
  color: black;
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
  width: 250px;
  text-align: center;
  margin: 0 auto;
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
  color: rgb(235, 90, 90);
}
</style>
