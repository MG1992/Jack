<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
const docEl = document.documentElement;
let maxFz = 100 * (docEl.clientWidth / 375);
maxFz = maxFz > 160 ? 160 : maxFz;
docEl.style.fontSize = maxFz + "px";
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.okBox {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: rgb(245, 246, 255);
  font-size: 0.15rem;
  color: #fff;
  height: 0.6rem;
}
.okBtn {
  display: block;
  float: right;
  min-width: 0.8rem;
  height: 0.3rem;
  padding: 0 0.12rem;
  margin: 0.15rem 0.13rem;
  line-height: 0.3rem;
  text-align: center;
  background: url("./assets/drawable-hdpi/Rectangle_5.png") no-repeat;
  background-size: 100%;
}
.noList {
  font-size: 0.15rem;
  padding: 0.13rem 0;
  background: #f4f4f4;
}
</style>
