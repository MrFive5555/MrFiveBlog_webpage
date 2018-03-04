/* 展示文章的组件 */
/* :style="{height : newHeigh}" */
<template>
  <div
    id="showArtical"
    class="clearfix"
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
      <div v-if="artical.tags.length != 0" class="tagsContainor">
        标签:<div class="tag" v-for="tag in artical.tags" :key="tag.id">{{ tag }}</div>
      </div>
      <div class="right-align">
        发表时间:{{ formatDate(artical.date) }}<br>
      </div>
    </div>
    <div id="mdHtml" v-html="mdHtml"></div>
    <!-- 评论区(600px) -->
    <review-bar
      :user="user"
      :Title="this.artical.title"
      :numPerPage="5"
      @changeHeigh="changeHeigh"
    ></review-bar>
  </div>
</template>

<script>
import axios from 'axios'
import marked from 'marked'
import hljs from '../../../static/js/highlight.min.js'

import config from '../../config'
import smallButton from './smallButton'
import reviewBar from './reviewBar'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

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
    mdHtml () {
      console.log(this.artical.content)
      return marked(this.artical.content, {
        sanitize: true
      })
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
    changeHeigh () {
      var _newHeigh = document.getElementById('showArtical').clientHeight
      if (_newHeigh > 1000) {
        this.$emit('changeHeigh', _newHeigh)
      }
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

        setTimeout(() => {
          this.changeHeigh()
        }, 300)
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
    smallButton, reviewBar
  }
}
</script>

<style scoped>
#blogTitle {
  font-size: 3em;
  margin: 30px 0 20px 0;
  width: 1100px;
  text-align: center;
  margin: 30px auto;
}

.tagsContainor {
  width: 100%;
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
  text-align: center;
}

.right-align {
  text-align: right;
  padding-right: 100px;
}

#mdHtml {
  margin: 0 5% 0 5%;
}

.clearfix::before, .clearfix::after {
    content:"";
    display:table;
}
.clearfix::after {
    clear:both;
}
</style>
