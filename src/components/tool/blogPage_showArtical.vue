<template>
  <div
    id="showArtical"
    :style="{height : newHeigh}"
    v-if="!loading">
    <h1 id="blogTitle">{{ artical.title }}</h1>
    <div class="right-align">
      <small-button
        class="button"
        @click.native="$emit('changePage', 'showList')">
        返回列表
      </small-button>
    </div>
    <div class="loading" v-if="loading">正在加载</div>
    <!-- 正文 -->
    <div id="artical">
      <div v-if="artical.tags.length != 0">
        标签:<div class="tag" v-for="tag in artical.tags" :key="tag.id">{{ tag }}</div>
      </div>
      <div class="right-align">
        发表时间:{{ formatDate(artical.date) }}<br>
      </div>
      <div
        id="markdown-containor"
        :style="{ height : markdownHeigh + 'px'}"
        v-if="!loading">
        <markdown
            :mdValuesP="artical.content"
            :fullPageStatusP="false"
            :editStatusP="false"
            :previewStatusP="true"
            :navStatusP="false"
            :icoStatusP="false"
            @childevent="childEventHandler"
            ></markdown>
      </div>
    </div>
    <!-- 评论区(600px) -->
    <review-bar
      :user="user"
      :Title="this.artical.title"
      :numPerPage="5"
    ></review-bar>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../../config'
import smallButton from './smallButton'
import markdown from './markdown'
import reviewBar from './reviewBar'

export default {
  name: 'blogPageShowArtical',
  data () {
    return {
      loading: false,
      artical: {
        title: '',
        content: '',
        date: new Date(),
        tags: []
      },
      reviewHeigh: 600
    }
  },
  computed: {
    markdownHeigh () {
      if (this.artical.content.match(/\n/g) == null) {
        return 100
      } else {
        return this.artical.content.match(/\n/g).length * 30
      }
    },
    newHeigh () {
      var _newHeigh = this.markdownHeigh + this.reviewHeigh + 500
      if (_newHeigh > 1000) {
        this.$emit('changeHeigh', _newHeigh)
      } else {
        _newHeigh = 1000
      }
      return _newHeigh
    }
  },
  props: ['blogName', 'user'],
  methods: {
    formatDate (date) {
      date = new Date(date)
      var min = date.getMinutes().toString()
      if (min.length === 1) {
        min = '0' + min
      }
      return '' +
        date.getFullYear() + '/' +
        (date.getMonth() + 1) + '/' +
        date.getDate()
    },
    // 监听事件，接收子组件传过来的数据
    childEventHandler: function (res) {
    // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
      this.msg = res
    }
  },
  created () {
    this.loading = true
    axios.post('/downloadBlog',
      { title: this.blogName },
      { timeout: config.timeout })
      .then((blog) => {
        this.artical = blog.data
        this.loading = false
        this.state = 'showArtical'
      })
      .catch((err) => {
        console.log(err)
        this.loading = false
        alert('加载博客失败')
      })
  },
  destroyed () {
    this.$emit('changeHeigh', 1000)
  },
  components: {
    smallButton, markdown, reviewBar
  }
}
</script>

<style scoped>

#showArtical h1 {
  font-size: 3em;
  margin: 30px 0 20px 0;
  width: 1100px;
}

.tag {
  font-size: 1.2em;
  border: 2px solid white;
  margin: 10px;
  display: inline-block;
  width: 70px;
  height: 27px;
  border-radius: 10px;
  padding-top: 0px;
}
.tag:hover {
  background-color: white;
  color: rgb(50, 91, 126);
}
#artical {
  width:1100px;
}
#markdown-containor {
  width: 1000px;
  height: 800px;
  margin: 0 auto;
  text-align: left;
}

.right-align {
  text-align: right;
  padding-right: 100px;
}
</style>
