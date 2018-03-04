/* 写博客的组件 */

<template>
  <div id="write">
    <h1>文章发表</h1>
    <!-- 输入框 -->
    <label for="blogTitle">标题</label>
    <input type="text" id="blogTitle" value="请输入标题" v-model="artical.title"/>
    <label for="blogTagStr">标签(以空格分隔)</label>
    <input type="text" id="blogTagStr" v-model="tagStr"/>
    <div class="right-align">
      <small-button
        v-if="user.isAdmin"
        @click.native="$emit('changePage', 'showList')">
        返回列表
      </small-button>
    </div>
    <div id="writeArea">
      <!-- <textarea rows="40" cols="130" v-model="artical.content"></textarea><br> -->
      <markdown
            :mdValuesP="''"
            :fullPageStatusP="false"
            :editStatusP="true"
            :previewStatusP="true"
            :navStatusP="true"
            :icoStatusP="true"
            @childevent="childEventHandler"
            ></markdown>
    </div>
    <div class="loading" v-if="loading">正在上传</div>
    <small-button @click.native="uploadBlog()">发表</small-button>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../../config'
import smallButton from './smallButton'
import markdown from './markdown'

export default {
  name: 'blogPageWrite',
  data () {
    return {
      loading: false,
      artical: {
        title: '',
        content: '',
        date: new Date(),
        tags: []
      },
      tagStr: ''
    }
  },
  props: ['user'],
  methods: {
    // 发表博客
    uploadBlog () {
      this.loading = true
      this.artical.tags = []
      for (let tag of (this.tagStr.split(' '))) {
        if (tag !== '') {
          this.artical.tags.push(tag)
        }
      }
      this.artical.date = new Date()
      axios
        .post('/uploadBlog', this.artical, {timeout: config.timeout})
        .then((res) => {
          if (!res.data) {
            alert('有重名文章')
          } else {
            this.$emit('changePage', 'showArtical', this.artical.title) // 显示写完的博客
          }
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          alert('发表博客失败')
        })
    },
    // 监听事件，接收子组件传过来的数据
    childEventHandler: function (res) {
    // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
      this.artical.content = res.mdValue
    }
  },
  components: {
    smallButton, markdown
  }
}
</script>

<style scoped>
.right-align {
  text-align: right;
  padding-right: 100px;
}

input {
  color: black;
}

#writeArea {
  color: black;
  margin: 30px auto;
  width: 950px;
  height: 700px;
  text-align: left;
}
</style>
