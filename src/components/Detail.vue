<template>
    <div>
        <Header title="商品详情" :isBack=true />
        <div class="detail-body">
            <div class="detail-flex">
                <label>名称：</label>
                <p>{{dwData.strProductName}}</p>
            </div>
            <div class="detail-flex">
                <label>详情：</label>
                <p>新版持久淡香XXXXXXXX XXXXXX
                </p>
            </div>
            <img :src="dwData.strProductImg">

        </div>
        <div class="okBox">
            <div class="okPrice">
                <img src="./../assets/drawable-hdpi/Group.png" alt="积分">
                <span>{{dwData.strPrice}}</span>
            </div>
            <span @click="toExchange" class="okBtn">兑换</span>
        </div>
        <Modal :isMinShow='isMinShow' :isMaxShow='isMaxShow' :isAlert=true :errMsg='minHint' comfirmHint='确定兑换此商品' @getGolds="getGolds"
            @resetModal="resetModal" />
    </div>
</template>

<script>
    import Header from "./Header.vue";
    import Modal from "./Modal.vue";

    export default {
        name: "Detail",
        components: {
            Header,
            Modal
        },
        data() {
            return {
                dwData: {},
                isMinShow: false,
                isMaxShow: false,
				minHint: ''
            };
        },
        methods: {
            toExchange: function () {
                if (Number(this.dwData.dwMembershipScore) < Number(this.dwData.strPrice)) {
                    this.isMinShow = true;
                    setTimeout(() => {
                        this.isMinShow = false;
                    }, 1000)
                } else {
                    this.isMaxShow = true;

                    // this.$router.push({ path: 'location', query: {strProductId: this.dwData.strProductId} })
                }
            },
            resetModal: function () {
                this.isMaxShow = false;
            },
            getGolds: function () {
                this.$http
                    .post(
                        "http://www.tuituifun.com/v1/api/store/purchaseproduct",
                        JSON.stringify({
                            token: localStorage.getItem("token"),
                            dwUin: Number(localStorage.getItem("dwUin")),
                            strProductId: this.dwData.strProductId,
                            dwTimeStamp: Math.floor(new Date().getTime() / 1000),
                            strAddrId: ''
                        })
                    )
                    .then(data => {
                        data = data.data;
                        if (data.result != 0) {
                            this.isMaxShow = false;
							this.minHint = data.strError;
							this.isMinShow = true;
							setTimeout(() => {
								this.isMinShow = false;
							}, 1000);
                        } else {
                            this.isMaxShow = false;
                            this.$router.push({
                                path: "goods"
                            });
                        }
                    });
            }
        },
        mounted: function () {
            // debugger
            this.dwData = this.$route.query.dwData;
            this.dwData.dwMembershipScore = this.$route.query.dwMembershipScore;
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .detail-body {
        margin-top: .4rem;
        font-size: 0.15rem;
        text-align: left;
        padding: 0.13rem;
    }

    .detail-flex {
        display: flex;
        margin-top: 0.13rem;
    }

    .detail-flex p {
        flex: 1;
        color: #929292;
    }

    .detail-body img {
        margin-top: 0.13rem;
        width: 100%;
    }

    .okPrice {
        position: relative;
        float: left;
        margin-left: 0.13rem;
        color: #A3A3A3;
        font-size: .16rem;
        top: 50%;
        transform: translateY(-50%);
        text-align: left;
    }

    .okPrice img {
        height: .24rem;
        margin-right: .05rem;
        vertical-align: middle;
    }
</style>
