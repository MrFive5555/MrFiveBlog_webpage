/* 博客 */

<template>
  <div id="containor" :style="{ height : newHeigh + 'px'}">
    <!-- 博客列表 -->
    <div id="blogList" v-if="state=='showList'">
      <div class="loading" v-if="loading">正在加载</div>
      <artical-list
        v-else
        @clickTitle="clickTitle"
        :List="blogList">
          <h1 slot="header">我的博客</h1>
          <small-button
            slot="footer"
            v-if="user.isAdmin"
            @click.native="changePage('write')">
            写博客
          </small-button>
        </artical-list>
    </div>

    <!-- 写博客面板 -->
    <blog-page-write
      v-else-if="state=='write'"
      @changePage="changePage"
      :user="user"
    ></blog-page-write>

    <!-- 博文 -->
    <blog-page-show-artical
      v-else-if="state=='showArtical'"
      @changePage="changePage"
      @changeHeigh="changeHeigh"
      :user="user"
      :blogName="blogName"
    ></blog-page-show-artical>

    <div v-else>错误:未知的页面</div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'

import articalList from './tool/articalList'
import markdown from './tool/markdown'
import smallButton from './tool/smallButton'

import blogPageShowArtical from './tool/blogPage_showArtical'
import blogPageWrite from './tool/blogPage_write'

export default {
  name: 'blogPage',
  data () {
    return {
      state: 'showList',
      loading: false,
      blogList: [],
      blogName: ''
    }
  },
  computed: {
    newHeigh () {
      return 1000
    }
  },
  created () {
    this.showBlogList()
  },
  props: ['user', 'pageHeigh'],
  methods: {
    // 获取博客列表
    showBlogList () {
      this.state = 'showList'
      this.loading = true
      axios
        .post('/getBlogList', {}, {timeout: config.timeout})
        .then((res) => {
          this.blogList = res.data
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          alert('加载博客列表失败')
        })
    },
    // 查看某一篇博客
    showBlog (blogName) {
      this.blogName = blogName
      this.state = 'showArtical'
    },
    formatDate (date) {
      date = new Date(date)
      var min = date.getMinutes().toString()
      if (min.length === 1) {
        min = '0' + min
      }
      return '' +
        date.getFullYear() + '/' +
        (date.getMonth() + 1) + '/' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        min
    },
    changePage (_state, optArtical) {
      this.state = _state
      if (_state === 'showArtical') {
        this.blogName = optArtical
      }
      if (_state === 'showList') {
        this.showBlogList()
      }
    },
    clickTitle (title) {
      this.changePage('showArtical', title)
    },
    changeHeigh (newHeigh) {
      this.$emit('changeHeigh', newHeigh)
    },
    // 监听事件，接收子组件传过来的数据
    childEventHandler: function (res) {
    // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
      this.msg = res
    }
  },
  components: {
    articalList,
    blogPageShowArtical,
    blogPageWrite,
    markdown,
    smallButton
  }
}
</script>

<style scoped>

#containor {
  position: absolute;
  color: white;
  height: 1000px;
  left: 0;
  right: 0;
}

#blogList {
  width:1100px;
  margin: 0 auto;
}

input {
  color: black;
}
</style>
