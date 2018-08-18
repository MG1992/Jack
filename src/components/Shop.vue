<template>
    <div class="shop">
        <Header title="我的商品" :isHistory=true :isAndroid=true />
        
        <header>
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

        <div class="body">
            <router-link tag="div" class="goods" v-for="item in goodsList" :key="item.strProductId" :to="{path:'/detail',query: {dwData: item, dwMembershipScore: dwUser.dwMembershipScore} }" >
                <img :src="item.strProductImg" alt="商品图片">
                <h3>{{item.strProductName}}</h3>
                <div class="goods-price">{{item.dwState == '1' ? item.strState : item.strPrice}}</div>
            </router-link>
            <div style="clear:both"></div>
        </div>
        

        <div class="okBox">
          <router-link  tag="div" to="/goods" class="okOrder">
            <img src="./../assets/drawable-hdpi/order_2.png">
      
            <span>我的订单</span>
          </router-link>
          <router-link tag="span" to="/exchange" class="okBtn">兑换积分</router-link>
      </div>

    </div>

  
</template>

<script>
import Header from "./Header.vue";

export default {
  name: "Record",
  components: {
    Header
  },
  data() {
    return {
      dwUser: {},
      goodsList: [],
      dwNextPageId: 0,
      isFirst: true
    };
  },
  methods: {
    httpPost: function() {
      if (this.isFirst || this.dwNextPageId != 0) {
        this.$http
          .post(
            "http://www.tuituifun.com/v1/api/store/productlist",
            JSON.stringify({
              token: localStorage.getItem("token"),
              dwUin: Number(localStorage.getItem("dwUin")),
              dwPageId: this.dwNextPageId || 0
            })
          )
          .then(data => {
              this.isFirst = false;
            
            data = data.data;
            if (data.result == 0) {
              this.isFirst = false;
              this.dwNextPageId = data.dwNextPageId;
              this.goodsList = this.goodsList.concat(data.products);
            }
          }).catch(data=> {
              this.isFirst = false;
          });
      }
    }
  },
  created: function() {
    let route = this.$route.query;
    localStorage.setItem("dwUin", route.uin);
    localStorage.setItem("token", route.token);
  },
  mounted: function() {
        this.httpPost();
    
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

    const maxBox = document.querySelector(".body");
    maxBox.addEventListener("scroll", () => {
      if (maxBox.scrollTop + maxBox.clientHeight >= maxBox.scrollHeight - 2) {
        this.httpPost();
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
  margin-top: 0.4rem;
  height: 1.15rem;
  background: url("./../assets/drawable-hdpi/Group_8.png") no-repeat;
  background-size: 100% 100%;
}
.header {
  float: right;
  padding-right: 0.3rem;
}
.body {
  height: calc(100vh - 2.15rem);
  overflow-y: scroll;
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
.goods {
  width: 50%;
  float: left;
  text-align: left;
  padding: 0.07rem;
  background-color: #f4f4f4;
}
.goods img {
  width: 100%;
  margin-bottom: 0.03rem;
}
.goods h3,
.goods-price {
  font-size: 0.15rem;
}
.goods-price {
  height: 0.2rem;
  line-height: 0.2rem;
  color: #a3a3a3;
  margin: 0.1rem 0;
  padding-left: 0.34rem;
  background: url("./../assets/drawable-hdpi/Group.png") no-repeat 0.02rem
    center;
  background-size: auto 100%;
}
.okOrder {
  position: relative;
  width: 1.16rem;
  height: 0.38rem;
  line-height: 0.38rem;
  float: left;
  margin-left: 0.13rem;
  padding-left: 0.4rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(188, 137, 243);
  text-align: left;
  background: url("./../assets/drawable-hdpi/order_1.png");
	background-size: 100% 100%;
  background-repeat: no-repeat;
}
.okOrder img {
  height: 0.24rem;
  top: 0.06rem;
  left: 0.08rem;
  position: absolute;
}
</style>
