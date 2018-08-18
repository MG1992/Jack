<template>
  <div>
  <Header title="我的商品" :isBack=true :isHistory=true :isAndroid="isAndroid" />
  <div class="tabs">
    <span :class="{active: selectType == 1}" @click="changeGoods(1)">没发货</span>
    <span :class="{active: selectType == 2}" @click="changeGoods(2)">已发货</span>
  </div>

  <ul class="body">
    <li v-for="item in goodsList" :key="item.id" @click="sentProduct(item.id, item.status, item.nitemtype)">
      <img :src='item.strImage' >
      <div class="detail">
        <p>{{item.strName}}</p>
        <div class="on-bottom">
          <span class="from">{{ item.itemType }}</span>
          <span :class="item.status == 2 ? 'status' : 'apply'">{{goodType[item.status - 1]}}</span>
        </div>
      </div>
    </li>
  </ul>
  <div class="noList" v-if="goodsList.length == 0">没有数据</div>

  </div>
  
</template>

<script>
import Header from "./Header.vue";

export default {
  name: "Goods",
  components: {
    Header
  },
  data() {
    return {
      allGoodsList: [],
      goodsList: [],
      selectType: 1,
      nextpage: 1,
      goodType: ["申请发货", "出货中", "已发货"],
			isAndroid: false
    };
  },
  methods: {
    httpPost: function() {
      if (this.nextpage) {
        this.$http
          .post(
            "http://www.tuituifun.com/v1/api/store/producthistory",
            JSON.stringify({
              token: localStorage.getItem("token"),
              dwUin: Number(localStorage.getItem("dwUin")),
              page: this.nextpage - 1 || 0
            })
          )
          .then(data => {
            data = data.data;
            if (data.result == 0) {
              this.allGoodsList = this.allGoodsList.concat(data.items);
              this.filterGoods();
							this.nextpage = data.nextpageid == 0 ? 0 : this.nextpage + 1;
            }
          });
      }
    },
    changeGoods: function(idx) {
      this.selectType = idx;
      this.filterGoods();
    },
    filterGoods: function() {
      this.goodsList = this.allGoodsList.filter(item => {
        if (this.selectType == 1) {
          return item.status <= 2;
        } else {
          return item.status == 3;
        }
      });
    },
		sentProduct: function(id, status, itemType) {
			if (status == 1) {
				this.$router.push({
					path: "location",
					query: {
						id: id,
						itemType: itemType
					}
				});
			}
		}
  },
  mounted: function() {
    this.httpPost();

    const maxBox = document.querySelector(".body");
    maxBox.addEventListener("scroll", () => {
      if (maxBox.scrollTop + maxBox.clientHeight >= maxBox.scrollHeight - 2) {
        this.httpPost();
      }
    });
  },
	created: function() {
		let route = this.$route.query;
		if (route.uin) {
			localStorage.setItem("dwUin", route.uin);
			localStorage.setItem("token", route.token);
			this.isAndroid = true;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabs {
  margin-top: 0.4rem;
  color: #949494;
  font-size: 0.15rem;
  background: #f4f4f4;
}
.body {
  max-height: calc(100vh - 0.93rem);
  overflow-y: scroll;
}
.tabs span {
  display: inline-block;
  padding: 0.16rem 0 0.085rem;
  margin: 0 0.16rem;
}
.active {
  color: #000 !important;
  border-bottom: 0.075rem solid #a56de1;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  padding: 0.15rem;
  background-color: #fff;
  margin-bottom: 0.1rem;
}
li img {
  width: 0.9rem;
  height: 0.9rem;
  margin-right: 0.15rem;
  /* border: 1px solid #ccc; */
  border-radius: 3px;
}
.detail {
  flex: 1;
  position: relative;
  text-align: left;
  font-size: 0.14rem;
}
.on-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  line-height: 0.3rem;
}
.from {
  color: #9b9b9b;
}
.status,
.apply {
  display: block;
  float: right;
  width: 0.8rem;
  height: 0.3rem;
  text-align: center;
}
.apply {
  color: #fff;
  background: url("./../assets/drawable-hdpi/Rectangle_5.png") no-repeat;
  background-size: 100%;
}
.noList {
  margin-top: 2px;
}
</style>
