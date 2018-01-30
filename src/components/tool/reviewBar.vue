<template>
  <div id="review">
    <h2>评论</h2>
    <textarea
      rows="5" cols="100"
      v-model="review.content"
      @input="inputCheck">
    </textarea><br>
    <small-button @click.native="sendReview()">发表</small-button>
    <div class="loading" v-if="loading">正在上传</div>
    <div v-if="reviewList.length == 0">还没有评论~</div>
    <ul v-else>
      <!-- 一条评论 -->
      <li v-for="review in subList" :key="review.id" class="oneReview">
        用户 : {{ review.userName }}<br>
        <p>{{ review.content }}</p>
        <div class="right-align">
          {{ formatDate(review.date) }}
          <small-button
            v-if="user.isAdmin"
            @click.native="hideReview(review)">
            {{ review.hidden ? "显示评论" : "隐藏评论" }}
          </small-button>
        </div>
      </li>
      <!-- 翻页按钮 -->
      <ul id="pageChoose" v-if="pageCount > 1">翻页
        <li
          v-for="item in pageCount"
          :class="{ active : item == page}"
          :key="item.id"
          @click="() => page = item">{{ item }}</li>
      </ul>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import smallButton from './smallButton'
import config from '../../config'

export default {
  name: 'reviewBar',
  props: ['user', 'Title', 'numPerPage'],
  data () {
    return {
      review: {
        title: this.Title,
        userName: '',
        content: '',
        date: new Date(),
        _id: -1,
        hidden: false
      },
      reviewList: [],
      page: 1
    }
  },
  created () {
    this.loading = true
    axios.post('/getReviewList',
      { title: this.Title },
      { timeout: config.timeout })
      .then((reviewList) => {
        this.reviewList = reviewList.data
        this.loading = false
      })
      .catch((err) => {
        console.log(err)
        this.loading = false
        alert('加载评论失败')
      })
  },
  methods: {
    // 发表评论
    sendReview () {
      if (this.review.content.length === 0) {
        alert('请输入评论内容')
        return
      }
      this.loading = true
      this.review.date = new Date()
      axios
        .post('/sendReview', this.review, {timeout: config.timeout}) // 发表
        .then((res) => {
          if (res.data) {
            alert('发表评论成功')
            this.review._id = res.data
            this.review.userName = this.user.userName
            let { ...newReview } = this.review
            this.reviewList.unshift(newReview)
            this.review.content = ''
          } else {
            alert('请登录后再发表评论')
          }
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          alert('发表评论失败')
        })
    },
    hideReview (rev) {
      this.loading = true
      axios
        .post('/hideReview', {
          _id: rev._id,
          hidden: !rev.hidden
        },
        {timeout: config.timeout})
        .then((res) => {
          if (res.data) {
            rev.hidden = !rev.hidden
          } else {
            alert('只有管理员账户才能隐藏/显示评论')
          }
          this.loading = false
        })
        .catch((err) => {
          alert('隐藏失败')
          console.log(err)
          this.loading = false
        })
    },
    inputCheck () {
      if (this.review.content.length > 200) {
        alert('评论不能超过200字')
        this.review.content = this.review.content.slice(0, 200)
      }
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
    }
  },
  computed: {
    // 每页8篇文章
    subList () {
      return this.reviewList.slice((this.page - 1) * this.numPerPage, this.page * this.numPerPage)
    },
    pageCount () {
      return Math.ceil(this.reviewList.length / this.numPerPage)
    }
  },
  components: {
    smallButton
  }
}
</script>

<style scoped>
#review {
  color: white;
}
.oneReview {
  text-align: left;
  width: 1000px;
  border-bottom: 2px solid white;
  margin-top: 10px;
  padding-bottom: 20px;
  word-wrap:break-word;
}

h2 {
  margin: 30px 0 8px 0;
}

#pageChoose {
  padding: 20px 40px 20px 40px;
  width: 940px;
}
#pageChoose li {
  display: inline-block;
  width: 30px;
  height: 25px;
  font-size: 1.2em;
  margin: 3px;
  border-left: 2px solid white;
}
#pageChoose li:hover {
  background-color: rgb(29, 40, 70);
}
#pageChoose li.active {
  background-color: rgb(68, 81, 105);
}

textarea {
  resize: none;
  overflow: hidden;
  margin-bottom: 15px;
  color: black;
}

ul {
  list-style: none;
  padding: 0 40px 0 40px;
}

.right-align {
  text-align: right;
  padding-right: 50px;
}
</style>
