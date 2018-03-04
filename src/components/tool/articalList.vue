/* 文章列表的组件 */

<template>
  <ul id="containor">
    <div id="head">
      <!-- 标题 -->
      <slot name="header"></slot>
      <label for="searchBox">搜索</label><input id="searchBox" v-model="searchWord">
      <slot name="footer"></slot>
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
      <ul id="pageChoose" v-if="pageCount >= 1">翻页
        <li
          v-for="item in pageCount"
          :class="{ active : item == page}"
          :key="item.id"
          @click="() => page = item">{{ item }}</li>
      </ul>
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
#containor {
  list-style: none;
  padding: 0 40px 0 40px;
  color: white;
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  margin: 0;
  text-align: center;
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
  width:450px;
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
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 0;
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
