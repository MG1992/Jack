<template>
<div>
    <Header title='确认收货地址' :isBack=true />
    <form>
        <div class="list">
            <label for="strRecvName">收货人</label>
            <input id="strRecvName" v-model="strRecvName" type="text" placeholder="没填写">
        </div>

        <div>
            <label for="strPhone">联系电话</label>
            <input id="strPhone" v-model="strPhone" type="tel" maxlength="11" placeholder="没填写">
        </div>

        <div>
            <label for="strAddress">收货地址</label>
            <input id="strAddress" v-model="strAddress" type="text" placeholder="没填写">
        </div>

    </form>
    <div class="okBox" @click="httpPost">
      <span class="okBtn">确定</span>
    </div>
    <Modal :errMsg='errMsg' :isMinShow='isMinShow' :isMaxShow="isMaxShow" comfirmHint='兑换成功 我们的快递员将尽快发货' @getGolds='hideMaxModal' />
</div>
    
</template>

<script>
import Modal from "./Modal.vue";
import Header from "./Header.vue";

export default {
  name: "Location",
  components: {
    Modal,
    Header
  },
  data() {
    return {
      errMsg: "",
      isMinShow: false,
      isMaxShow: false,
      strRecvName: "",
      strPhone: "",
      strAddress: "",
      strAddrId: "",
    };
  },
  mounted: function() {
    this.$http
      .post(
        "http://www.tuituifun.com/v1/api/store/getuinaddress",
        JSON.stringify({
          token: localStorage.getItem("token"),
          dwUin: Number(localStorage.getItem("dwUin")),
          dwSeq: Math.floor(new Date().getTime() / 1000)
        })
      )
      .then(data => {
        data = data.data;
        if (data.result == 0) {
          this.strRecvName = data.strRecvName;
          this.strPhone = data.strPhone;
          this.strAddress = data.strAddress;
        }
      });
  },
  methods: {
    resetModal: function(msg) {
      this.errMsg = msg;
      this.isMinShow = true;
      setTimeout(() => {
        this.isMinShow = false;
      }, 1000);
    },
    hideMaxModal: function() {
			this.isMaxShow = false;
    },
    httpPost: function() {
      if (
        !this.strRecvName ||
        !/^\d{11}$/.test(this.strPhone) ||
        !this.strAddress
      ) {
        this.resetModal("请输入有效的收货地址");
      } else {
        this.$http
          .post(
            "http://www.tuituifun.com/v1/api/store/setaddress",
            JSON.stringify({
              token: localStorage.getItem("token"),
              dwUin: Number(localStorage.getItem("dwUin")),
              strRecvName: this.strRecvName,
              strPhone: this.strPhone,
              strAddress: this.strAddress,
							itemtype: this.$route.query.itemType,
							id: this.$route.query.id
            })
          )
          .then(data => {
            data = data.data;
            if (data.result != 0) {
              this.resetModal(data.strError);
            } else {
              this.isMaxShow = true;
            }
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  margin-top: .4rem;
}
form div {
  display: flex;
  font-size: 0;
  font-size: 0.15rem;
  background-color: #fff;
  height: 0.5rem;
  border-bottom: 1px solid #d5d5d5;
}
label {
  width: 0.8rem;
  line-height: 0.5rem;
  padding-left: 0.13rem;
  text-align: left;
}
input {
  flex: 1;
  font-size: 0.15rem;
  padding-right: 0.13rem;
  border: none;
  text-align: right;
}
</style>
