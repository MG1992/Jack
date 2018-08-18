<template>
    <div>
        <div class="toast-modal" :class="{'show': isMinShow}">{{errMsg}}</div>
        <div class="modal" :style="{'backgroundColor': isMaxShow ? 'rgba(188,137,243, .5)' : 'none'}" v-if="isMaxShow">
            <div class="confirm-modal" :class="{'show': isMaxShow}">
                <p>{{comfirmHint}}</p>
                <div class="btnBox" v-if="isAlert">
                    <button @click="resetModal">取消</button>
                    <button @click="submitFnc">兑换</button>
                </div>
                <div class="btnBox" v-if="!isAlert">
                    <button @click="submitFnc">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["errMsg", "isMaxShow", "isMinShow", "isAlert", "comfirmHint"],
  methods: {
    submitFnc: function() {
      this.$emit('getGolds');
    },
		resetModal: function() {
			this.$emit('resetModal');
		}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 9;
  transition: backgroundColor 400ms ease-in;
  -webkit-transition: backgroundColor 400ms ease-in;
  -moz-transition: backgroundColor 400ms ease-in;
}
.toast-modal {
  position: absolute;
  font-size: 0.15rem;
  top: 40%;
  left: 20%;
  color: #fff;
  width: 60%;
  opacity: 0;
  padding: 0.08rem 0;
  background-color: rgba(0, 0, 0, 0.8);
}
.confirm-modal {
  position: absolute;
  opacity: 0;
  top: 30%;
  left: 10%;
  width: 80%;
  padding-bottom: 0.03rem;
  background: rgba(238, 223, 255, 0.91);
  font-size: 0.15rem;
}
.show {
  opacity: 1;
}
.toast-modal,
.confirm-modal {
  border-radius: 6px;
  -webkit-border-radius: 6px;
  transition: opacity 400ms ease-in;
  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
}
.confirm-modal {
  transition-delay: 2s;
  -moz-transition-delay: 2s; /* Firefox 4 */
  -webkit-transition-delay: 2s; /* Safari 和 Chrome */
  -o-transition-delay: 2s; /* Opera */
}
.confirm-modal p {
  margin: 0.46rem 0;
}
.btnBox {
  display: flex;
  padding: 0 0.03rem;
}
.btnBox button {
  flex: 1;
  height: 0.44rem;
  line-height: 0;
  margin: 0 0.03rem;
  color: #fff;
  border: none;
  background: url("./../assets/drawable-hdpi/Rectangle_9.png") no-repeat;
  background-size: 100% 100%;
}
</style>
