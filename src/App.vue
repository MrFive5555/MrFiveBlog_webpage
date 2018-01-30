<template>
  <div id="app">
    <ul id="menu" :style="{ height : pageHeigh + 'px'}">
      <div id="menuHead">菜单</div>
      <li class="menuItem" :class="{active:page==='indexPage'}" @click="() => page='indexPage'">主页</li>
      <li class="menuItem" :class="{active:page==='blogPage'}" @click="() => page='blogPage'">博客</li>
      <li class="menuItem" :class="{active:page==='appPage'}" @click="() => page='appPage'">web小应用</li>
      <li class="menuItem" :class="{active:page==='projectPage'}" @click="() => page='projectPage'">个人项目</li>
      <li class="menuItem" :class="{active:page==='reviewPage'}" @click="() => page='reviewPage'">留言</li>
      <li class="menuItem" :class="{active:page==='webInfoPage'}" @click="() => page='webInfoPage'">网站构建</li>
      <fieldset>
        <legend>{{ siginOrRegisterTitle }}</legend>
        <!-- 已登录显示详情 -->
        <detail v-bind:user="user" v-on:logout="logout" v-if="hasSignin"></detail>
        <!-- 未登录显示登录/注册页面 -->
        <div v-else>
          <div class="button"
            v-on:click="setSignin"
            v-bind:class="{
              active:signinOrRegister,
              inactive:!signinOrRegister
            }">登录</div><!--
          --><div class="button"
            v-on:click="setRegister"
            v-bind:class="{
              active:!signinOrRegister,
              inactive:signinOrRegister
            }">注册</div>
          <signin v-on:login="login" v-if="signinOrRegister"></signin>
          <register v-on:login="login" v-else></register>
        </div>
      </fieldset>
    </ul>
    <div id="mainPage" :style="{ height : pageHeigh + 'px'}">
      <indexPage v-if="page=='indexPage'"></indexPage>
      <blogPage v-else-if="page=='blogPage'" :user="user" v-on:changeHeigh="changeHeigh"></blogPage>
      <appPage v-else-if="page=='appPage'"></appPage>
      <projectPage v-else-if="page=='projectPage'"></projectPage>
      <reviewPage v-else-if="page=='reviewPage'" :user="user"></reviewPage>
      <webInfoPage v-else-if="page=='webInfoPage'"></webInfoPage>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import config from '../config'

import signin from './components/signin' // 登录组件
import register from './components/register' // 注册组件
import detail from './components/detail' // 用户详情

import indexPage from './components/indexPage' // 主页
import blogPage from './components/blogPage' // 博客
import appPage from './components/appPage' // 个人项目
import projectPage from './components/projectPage' // 个人项目
import reviewPage from './components/reviewPage' // 留言
import webInfoPage from './components/webInfoPage' // bug报告

export default {
  name: 'App',
  data () {
    return {
      hasSignin: false,
      user: {
        userName: 'sss',
        id: 'ss',
        phone: 'ss',
        email: 'ss',
        isAdmin: false
      },
      page: 'indexPage', // 标识当前显示哪个页面
      signinOrRegister: true, // 标识显示登录(true)还是注册(false)
      pageHeigh: 1000
    }
  },
  computed: {
    siginOrRegisterTitle: function () {
      if (this.hasSignin) {
        return '用户详情'
      } else if (this.signinOrRegister) {
        return '用户登录'
      } else {
        return '用户注册'
      }
    }
  },
  methods: {
    logout () {
      axios
        .post('/logout', {}, {timeout: config.timeout})
        .then(() => {
          [this.user.userName,
            this.user.id,
            this.user.phone,
            this.user.email,
            this.user.isAdmin] = []
          this.hasSignin = false
        })
        .catch((err) => {
          alert('登出失败,未知的服务器错误')
          console.log(err)
        })
    },
    login (newUser) {
      this.user.userName = newUser.userName
      this.user.id = newUser.id
      this.user.phone = newUser.phone
      this.user.email = newUser.email
      this.user.isAdmin = newUser.isAdmin
      this.hasSignin = true
      console.log('[login]', this.user)
    },
    setSignin () {
      if (!this.signinOrRegister) {
        this.signinOrRegister = true
      }
    },
    setRegister () {
      if (this.signinOrRegister) {
        this.signinOrRegister = false
      }
    },
    changeHeigh (newHigh) {
      this.pageHeigh = newHigh
    }
  },
  created () {
    axios
      .post('/getUser', {}, {timeout: config.timeout})
      .then((result) => {
        if (result.data) {
          this.user.userName = result.data.userName
          this.user.id = result.data.id
          this.user.phone = result.data.phone
          this.user.email = result.data.email
          this.user.isAdmin = result.data.isAdmin
          this.hasSignin = true
          this.login(this.user)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  components: { signin,
    register,
    detail,
    indexPage,
    blogPage,
    appPage,
    projectPage,
    reviewPage,
    webInfoPage
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 1450px;
}

#mainPage {
  float: left;
  width: 700px;
  background-color: rgb(50, 91, 126);
  width: 1100px;
}

#menu {
  width: 300px;
  list-style: none;
  padding: 0;
  background-color: rgb(68, 81, 105);
  color: white;
  float: left;
  margin: 0;
}

#menuHead {
  background-color: rgb(67, 99, 128);
  font-size: 2.5em;
}

li {
  height: 50px;
  font-size: 1.5em;
  display: block;
  padding-top: 10px;

  /* 禁止选中文字 */
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
li:hover {
  box-shadow: 0 0 6px 4px rgb(117, 126, 133) inset;
  background-color: rgb(68, 83, 95);
}
li.active {
  box-shadow: 0 0 6px 4px rgb(117, 126, 133) inset;
  background-color: rgb(68, 83, 95);
}

fieldset {
  width: 278px;
  height: 550px;
  margin: 0 auto;
  padding: 0 0 10px 0;
  text-align: left;
}

legend {
  font-size: 30px;
  text-align: center;
}

.button {
  display: inline-block;
  width:50%;
  height: 35px;
  text-align: center;
  background: rgb(72, 84, 107);
  font-size: 1.2em;
  padding-top: 5px;
}

.inactive:hover {
  box-shadow: 0 0 6px 4px rgb(117, 126, 133) inset;
  background-color: rgb(68, 83, 95);

  /* 禁止选中文字 */
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}

.active {
  background-color: rgb(136, 156, 172);
}
</style>
