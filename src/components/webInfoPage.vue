<template>
  <div id="containor">
    <h1>网站构建</h1>
    <div class="item">
      <h2>前端</h2>
      <div class="hold">
        <img id="vue-logo" src="../assets/logo.png"><br>
      </div>
      <p>vue 2.5.2</p>
    </div>
    <div class="item">
      <h2>后端</h2>
      <div class="hold">
        <h3>Express</h3>
      </div>
      <p>4.16.2</p>
    </div>
    <div class="item">
      <h2>数据库</h2>
      <div class="hold" id="dbHold">
        <img src="../assets/mongodb-logo.png"><br>
      </div>
      <p>3.4.10</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'webInfoPage'
}
</script>

<style scoped>
#containor {
  color: white;
  width: 1050px;
  margin: 0 auto;
}

h1 {
  font-size: 3em;
  margin-bottom: 100px;
}
.item {
  width: 300px;
  height: 600px;
  float: left;
  font-size: 2em;
  margin: 0 20px;
  background-color: rgb(11, 41, 68);
}

h3 {
  padding-top: 100px;
}
.hold {
  height: 300px;
}

#dbHold {
  padding-top: 80px;
  height: 220px;
}

#vue-logo {
  margin-top: 30px;
}
</style>
