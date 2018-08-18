<template>
<div>
  <Header title="兑换记录" :isBack=true />
  <ul class="body">
    <li v-for="item in dwList" :key="item.id">
        <div class="left">
            <p>{{item.strDesc}}</p>
            <span>{{item.strTime | formatTime}}</span>
        </div>
        <div class="right">{{item.strMembershipScoreChangeDesc}}</div>
    </li>
  </ul>
  <div v-if="dwList.length == 0" class="noList">没有记录</div>
</div>
  
</template>

<script>
import Header from "./Header.vue";
import formatDate from "../common/date";

export default {
  name: "Record",
  components: {
    Header
  },
  filters: {
    formatTime: function(time) {
      time = new Date(Number(time * 1000));
      return formatDate(time, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    httpPost: function() {
      if (this.dwNextPageId) {
        this.$http
          .post(
            "http://www.tuituifun.com/v1/api/store/historylist",
            JSON.stringify({
              token: localStorage.getItem("token"),
              dwUin: Number(localStorage.getItem("dwUin")),
              page: this.dwNextPageId - 1
            })
          )
          .then(data => {
            data = data.data;
            if (data.result == 0) {
              this.dwList = this.dwList.concat(data.items);
							this.dwNextPageId = data.nextpageid == 0 ? 0 : this.dwNextPageId + 1;
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
  data() {
    return {
      dwList: [],
      dwNextPageId: 1
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body {
  margin-top: 0.4rem;
  height: calc(100vh - 0.4rem);
  overflow-y: scroll;
}
li {
  display: flex;
  padding: 0.13rem;
  align-items: center;
  text-align: left;
  line-height: 1;
  font-size: 0.17rem;
  background-color: #fff;
  border-bottom: 1px solid #d5d5d5;
}
.left {
  flex: 1;
}
.left p {
  color: #000;
  margin-bottom: 0.1rem;
}
.left span {
  color: #9b9b9b;
  font-size: 0.16rem;
}
.right {
  min-width: 1rem;
  padding-left: 0.33rem;
  line-height: 2;
  background: url("./../assets/drawable-hdpi/Group.png") no-repeat left center;
  background-size: 0.23rem auto;
}
.cut {
  color: #ff1d1d;
}
</style>
