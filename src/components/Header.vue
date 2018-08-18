<template>
  <div id="app">
    <header class='flex-header'>
      <div class="backBtn" v-if="isBack" @click="goBack"></div>      
			<div class="backBtn" v-if="isAndroid" @click="goBackToAndroid"></div>
      {{title}}
      <span class="record" @click="toRecord" v-if="isHistory">兑换记录</span>
    </header>
  </div>
</template>

<script>
export default {
  name: "App",
  props: ["title", 'isBack', 'isHistory', 'isAndroid'],
  methods: {
    goBack() {
			if (this.isAndroid) {
				this.goBackToAndroid();
			} else {
				this.$router.go(-1);
			}
    },
		goBackToAndroid() {
			window.android.goBack();
		},
    toRecord(event) {
      event.stopPropagation();
      this.$router.push({ path: 'record' })
    }
  }
};
</script>

<style >
.flex-header {
  position: fixed;
  width: 100%;
  top: 0;
  padding: 0 0.13rem;
  height: .4rem;
  line-height: .4rem;
  font-size: 0.17rem;
  color: #fff;
  background: #25003d;
}
.backBtn {
  position: absolute;
  width: 0.2rem;
  height: 0.2rem;
  top: 0.1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}
.backBtn::after {
  content: "";
  width: 0;
  height: 0;
  left: .05rem;
  top: .03rem;
  position: absolute;
  border-top: solid 0.07rem transparent;
  border-right: solid 0.07rem #000; /* 白色小三角形 */
  border-bottom: solid 0.07rem transparent;
}
.record {
  position: absolute;
  right: .13rem;
  font-size: .13rem;
  line-height: .4rem;
  color: rgb(241,173,255);
}
</style>
