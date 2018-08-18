<template>
    <div class="shop">
        <Header title="兑换奖券" :isBack=true :isHistory=true />
        
        <header >
            <div class="header">
              <div class="coin">
                <div class="coin-circle left"></div>
                <img class="coin-gold" src="./../assets/drawable-hdpi/Group_2.png" alt="推推币">
                <span>{{dwUser.dwGolds}}</span>
                <div class="coin-circle right"></div>
              </div>
              <div class="coin">
                <div class="coin-circle left"></div>
                <img class='coin-ticket' src="./../assets/drawable-hdpi/Group.png" alt="推推券">
                <span>{{dwUser.dwMembershipScore}}</span>
                <div class="coin-circle right"></div>
              </div>
            </div>
        </header>

        <div>
          <div class="exList" v-for="item in exLists" :key="item.strItemId" @click="toExchange(item.strPrice, item.strItemId)">
              <h3>{{item.strItemName}}</h3>
              <div class="exRight">
                  <img src="./../assets/drawable-hdpi/Group_2.png">
                  <span>{{item.strPrice}}</span>
              </div>
          </div>
          <div class="noList" v-if="exLists.length == 0">没有数据</div>
        </div>
        <Modal :errMsg="errMsg" :isMinShow="isMinShow" :isMaxShow="isMaxShow" :comfirmHint="comfirmHint" @getGolds="getGolds" />
    </div>

  
</template>

<script>
import Header from "./Header.vue";
import Modal from "./Modal.vue";

export default {
  name: "Exchange",
  components: {
    Header,
    Modal
  },
  data() {
    return {
      errMsg: "",
      isMinShow: false,
      isMaxShow: false,
      comfirmHint: "",
      dwUser: {},
      exLists: [],
      itemId: ''
    };
  },
  methods: {
    httpPost: function() {},
    toExchange: function(nums, id) {
      if (this.dwUser.dwGolds < parseFloat(nums)) {
        this.errMsg = "推推币不足";
        this.isMinShow = true;
        setTimeout(() => {
          this.isMinShow = false;
        }, 1000);
      } else {
        this.isMaxShow = true;
        this.comfirmHint = `确定兑换${nums}积分？`;
        this.itemId = id;
      }
    },
    getGolds: function() {
      this.$http
        .post(
          "http://www.tuituifun.com/v1/api/store/purchasemembershipscore",
          JSON.stringify({
            token: localStorage.getItem("token"),
            dwUin: Number(localStorage.getItem("dwUin")),
            strItemId: this.itemId,
            dwSeq: Math.floor(new Date().getTime() / 1000)
          })
        )
        .then(data => {
          data = data.data;
          if (data.result == 0) {
            this.isMaxShow = false;
            this.errMsg = "兑换成功";
            this.isMinShow = true;
						this.dwUser = data;
            setTimeout(() => {
              this.isMinShow = false;
            }, 1000);
          }
        });
    }
  },
  mounted: function() {
    this.$http
      .post(
        "http://www.tuituifun.com/v1/api/user/getuserinfo",
        JSON.stringify({
          token: localStorage.getItem("token"),
          dwUin: Number(localStorage.getItem("dwUin"))
        })
      )
      .then(data => {
        data = data.data;
        if (data.result == 0) {
          this.dwUser = data;
        }
      });

    this.$http
      .post(
        "http://www.tuituifun.com/v1/api/store/membershipscorelist",
        JSON.stringify({
          token: localStorage.getItem("token"),
          dwUin: Number(localStorage.getItem("dwUin"))
        })
      )
      .then(data => {
        data = data.data;
        if (data.result == 0) {
          this.exLists = data.items;
        }
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shop {
  font-size: 0;
}
header {
  height: 1.15rem;
  margin-top: .4rem;
  background: url("./../assets/drawable-hdpi/Group_8.png") no-repeat;
  background-size: 100% 100%;
}
.header {
  float: right;
  padding-right: 0.3rem;
}
.coin-circle {
  position: absolute;
  width: 0.15rem;
  height: 0.3rem;
  background-color: #fff;
  top: 0;
}
.left {
  border-radius: 0.15rem 0 0 0.15rem;
  left: -0.15rem;
  top: 0;
}
.right {
  border-radius: 0 0.15rem 0.15rem 0;
  right: -0.15rem;
}
.coin {
  position: relative;
  min-width: 1.05rem;
  padding-left: 0.4rem;
  height: 0.3rem;
  line-height: 0.3rem;
  background-color: #fff;
  text-align: left;
  font-size: 0.23rem;
  color: #000;
  margin-top: 0.18rem;
}
.coin img {
  position: absolute;
  left: 0;
}
.coin-gold {
  top: 0.03rem;
  height: 0.25rem;
}
.coin-ticket {
  top: 0.04rem;
  height: 0.22rem;
}
.exList {
  display: flex;
  background-color: #f4f4f4;
  padding: 0.13rem;
  border-bottom: 1px solid #fff;
}
.exList h3 {
  flex: 1;
  font-size: 0.15rem;
  text-align: left;
  line-height: 0.36rem;
}
.exRight {
  height: 0.36rem;
  padding: 0 0.24rem 0 0.13rem;
  width: 1.2rem;
  color: #fff;
  text-align: right;
  font-size: 0.15rem;
  background: url("./../assets/drawable-hdpi/Rectangle_5.png") no-repeat;
  background-size: 100% 100%;
  background-color: #f5f6ff;
}
.exRight img {
  float: left;
  margin-top: 0.02rem;
  height: 0.26rem;
}
.exRight span {
  line-height: 0.32rem;
}
</style>
