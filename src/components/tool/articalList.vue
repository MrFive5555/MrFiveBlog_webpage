<template>
  <ul>
    <div id="head">
      <label for="searchBox">搜索</label><input id="searchBox" v-model="searchWord">
      <slot></slot>
    </div>
    <div v-if="subBlogList.length != 0">
      <!-- 文章列表 -->
      <li class="Item"
        v-for="item in subBlogList"
        v-bind:key="item.id">
        <div
          @click="$emit('clickTitle', item.title)"
          class="title">{{ item.title }}</div><br>
        <div class="Date">{{ formatDate(item.date) }}</div>
      </li>
      <!-- 翻页按钮 -->
      <div class="atBottom">
        <ul id="pageChoose" v-if="pageCount >= 1">翻页
          <li
            v-for="item in pageCount"
            :class="{ active : item == page}"
            :key="item.id"
            @click="() => page = item">{{ item }}</li>
        </ul>
      </div>
    </div>
    <div v-else>无相关文章</div>
  </ul>
</template>

<script>
export default {
  name: 'showList',
  data () {
    return {
      loading: false,
      page: 1,
      searchWord: ''
    }
  },
  computed: {
    // 每页8篇文章
    subBlogList () {
      return this.filterList.slice((this.page - 1) * 8, this.page * 8)
    },
    pageCount () {
      return Math.ceil(this.List.length / 8)
    },
    filterList () {
      var pattern = new RegExp(this.searchWord)
      return this.List.filter((item) => {
        return pattern.test(item.title)
      })
    }
  },
  props: ['List'],
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
        date.getDate() + ' '/*  +
        date.getHours() + ':' +
        min */
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0 40px 0 40px;
  color: white;
}

.Item {
  height: 80px;
  padding: 10px 0 5px 0;
  display: block;
  text-align: left;
}
.Item:hover {
  background-color: rgb(29, 40, 70);
}

.title {
  width:350px;
  margin: 0 auto;
  font-size: 1.5em
}
.title:hover {
  text-decoration: underline;
}

.Date {
  display: block;
  width:150px;
  margin: 0 auto;
}

#pageChoose {
  border-top: 2px solid white;
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

.atBottom {
  position: absolute;
  bottom: 0;
  width: 1060px;
}

#head {
  margin-bottom: 15px;
}

#searchBox {
  margin: 0 250px 0 20px;
}

input {
  color: black;
}
</style>
