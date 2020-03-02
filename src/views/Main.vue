<template>
  <div id="main">
    <div class="maintop">
      <header :style="{backgroundImage:'url('+data.avatar+')'}">
        <div class="headertop">
          <div>
            <img :src="data.avatar" class="logo" />
          </div>
          <div class="login-msg">
            <p>
              <img src="../assets/images/brand@2x.png" alt />
              <span>{{data.name}}</span>
            </p>
            <p>
              <span>{{data.description}}/</span>
              <span>{{data.deliveryTime}}分钟送达</span>
            </p>
            <p>
              <img src="../assets/images/decrease_3@2x.png" alt />
              <span>在线支付满28元减5，满50减10</span>
            </p>
          </div>
        </div>
        <div class="headerbottom">
          <p>
            <img src="../assets/images/bulletin@2x.png" alt />
            <span>{{data.bulletin}}</span>
          </p>
          <div>
            <span>></span>
          </div>
        </div>
      </header>
      <nav>
        <ul class="nav">
          <li @click="showNav(0)">
            <!-- 两种写法 -->
            <!-- <router-link to="/goods" :class="curLab==0?'active':''">商品</router-link> -->
            <router-link to="/goods" :class="{active:curNav==0}">商品</router-link>
          </li>
          <li @click="showNav(1)">
            <!-- <router-link to="/evaluate" :class="curLab==1?'active':''">评价</router-link> -->
            <router-link to="/evaluate" :class="{active:curNav==1}">评价</router-link>
          </li>
          <li @click="showNav(2)">
            <router-link to="/business" :class="{active:curNav==2}">商家</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="mainbottom">
      <main>
        <router-view />
      </main>
    </div>
    <!-- 购物车 -->
    <transition name="slide-fade">
    <div class="shopPage" v-show="shopFlag"></div>
    </transition>
    <footer id="shopCar">
      <!-- <router-link to="/shopcar"> -->
      <span class="icon-car">
        <!-- **可以在@click里面直接书写JS代码 -->
        <Icon type="ios-cart-outline" @click="shopFlag=!shopFlag"></Icon>
      </span>
      <!-- </router-link> -->
      <span>￥0</span>
      <span>|</span>
      <span>另需配送4元</span>
      <span class="topay">20元起送</span>
    </footer>
  </div>
</template>
<script>
// 引入axios,那边没用defalut,这边必须通过解构的方式引入
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      data: {},
      curNav: "",
      shopFlag:false
    };
  },
  created() {
    getSeller().then(res => {
      this.data = res.data.data;
    });
  },
  methods: {
    showNav(n) {
      this.curNav = n;
    },
    // shopPage() {
    //   this.shopFlag=!this.shopFlag
    // }
  }
};
</script>
<style lang="less" scoped>
#main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#main .maintop {
  width: 100%;
  height: 250px;
}
#main .mainbottom {
  flex: 1;
  height: 100%;
}
#main header {
  position: relative;
  width: 100%;
  background: #ccc;
  height: 200px;
  padding: 15px 10px 0px 0px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .headertop {
    width: 100%;
    padding-left: 15px;
    display: flex;
    margin-bottom: 35px;
    .logo {
      width: 110px;
      height: 110px;
      border-radius: 6px;
      margin-right: 14px;
    }
  }
}
.login-msg {
  line-height: 40px;
  p:first-child {
    color: #fefefe;
    img {
      vertical-align: middle;
      width: 36px;
      margin-right: 8px;
    }
  }
  p:nth-child(2) {
    font-size: 14px;
    color: #f9f9f7;
  }
  p:last-child {
    font-size: 14px;
    color: #f9f9f7;
    img {
      width: 18px;
      vertical-align: middle;
      margin-right: 4px;
    }
  }
}
.headerbottom {
  width: 100%;
  padding: 10px 20px;
  background: #3e3f43;
  opacity: 0.6;
  display: flex;
  color: #fff;
  position: absolute;
  bottom: 0;
  p {
    width: 85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    img {
      vertical-align: middle;
      margin-right: 8px;
    }
  }
}
ul li {
  list-style: none;
}
.nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #e5e5e7;
  a {
    color: #9ea1a5;
  }
}
.shopPage{
  width: 100%;
  height: 150px;
  background: orange;
  position: fixed;
  bottom: 50px;
}
#shopCar {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 0px;
  background-color: #141c27;
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
  }
  span:nth-child(2) {
    font-size: 20px;
    font-weight: bold;
    color: #96979c;
  }
  .topay {
    padding: 0px 25px;
    background-color: #2b343b;
  }
  .icon-car {
    color: #fff;
    margin-left: 20px;
    width: 50px;
    height: 50px;
    background-color: #2b343d;
    border-radius: 50%;
    text-align: center;
  }
}
.active {
  color: red !important;
}
// 购物车的动画
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .6s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}

</style>