<template>
  <div id="containor">
    <artical-list
      :List="list"
      @clickTitle="changePage"
      v-if="page==='list'">
      <h1 v-if="page==='list'" slot="header">web小应用</h1>
    </artical-list>
    <div v-else-if="page=='打地鼠游戏'">
      <h1>打地鼠游戏</h1>
      <div class="close" @click="page='list'">&times;</div><br>
      <iframe src="../static/hmwk6_game/mole.html"></iframe>
    </div>
    <div v-else-if="page=='迷宫游戏'">
      <h1>迷宫游戏</h1>
      <div class="close" @click="page='list'">&times;</div><br>
      <iframe src="../static/hmwk6_game/maze.html"></iframe>
    </div>
    <div v-else-if="page=='拼图游戏'">
      <h1>拼图游戏</h1>
      <div class="close" @click="page='list'">&times;</div><br>
      <iframe src="../static/hmwk7_fifteen_puzzle/puzzle.html"></iframe>
    </div>
    <div v-else-if="page=='校园导览'" class="fullScreen">
      <h1>校园导览</h1>
      <div class="close" @click="page='list'">&times;</div><br>
      <iframe src="../static/guideSYSU/index.html"></iframe>
    </div>
    <div v-else-if="page=='小游戏:大沙漠'" class="fullScreen">
      <h1>小游戏:大沙漠</h1>
      <div class="close" @click="page='list'">&times;</div><br>
      <iframe src="../static/game:DeadSand/index.html"></iframe>
    </div>
    <div v-else>找不到相关资源</div>
  </div>
</template>

<script>
import articalList from './tool/articalList'
import smallButton from './tool/smallButton'

export default {
  name: 'appPage',
  data () {
    return {
      list: [
        { title: '迷宫游戏', date: new Date(2017, 10, 1, 0, 0, 0) },
        { title: '打地鼠游戏', date: new Date(2017, 10, 1, 0, 0, 0) },
        { title: '拼图游戏', date: new Date(2017, 10, 1, 0, 0, 0) },
        { title: '校园导览', date: new Date(2017, 12, 1, 0, 0, 0) },
        {title: '小游戏:大沙漠', date: new Date(2017, 12, 1, 0, 0, 0)}
      ],
      page: 'list'
    }
  },
  methods: {
    changePage (_page) {
      this.page = _page
    }
  },
  components: {
    articalList,
    smallButton
  }
}
</script>

<style scoped>
#containor {
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  text-align: center;
}
h1 {
  color: white;
}
iframe {
  width: 800px;
  height: 800px;
  background-color: white;
  margin-top: 30px;
}

.fullScreen {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(19, 19, 19, 0.7);
}
.fullScreen iframe {
  width: 1400px;
  height: 1400px;
}

.close {
  position: fixed;
  width:30px;
  height: 30px;
  top: 3%;
  right: 3%;
  color: white;
  font-size: 3em;
}
.close:hover {
  font-size: 3.5em;
}
</style>
