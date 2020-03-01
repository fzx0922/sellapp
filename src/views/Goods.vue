<template>
  <div id="goods">
    <div class="mainLeft">
      <!-- 插件第二步 -->
      <ul class="content">
        <!-- ****动态class里面传入的是一个对象，注意后面的三目判断，第一次见这样写，可以去了解一下官方语法 -->
        <div v-for="(item,i) in list" :key="i" :class="{nav:true,active:index==i}" @click="show(i)">
          <!-- 用v-show来显不显示图标 -->
          <img
            src="../assets/images/icon-ze.png"
            v-show="item.type==1"
            style="width:20px;height:20px;margin-right:3px"
          />
          <img
            src="../assets/images/icon-te.png"
            v-show="item.type==2"
            style="width:20px;height:20px;margin-right:3px"
          />
          {{ item.name }}
        </div>
      </ul>
    </div>
    <div class="mainRight">
      <ul class="content">
        <!-- ****要实现锚点链接，必须给元素加一个id值,思想：id值等于左边的索引 -->
        <div v-for="(item,i) in list" :key="item.name" :id="i">
          <p class="title">{{ item.name }}</p>
          <!-- 动态class和动态id呀 这些不一样 -->
          <div v-for="food in item.foods" :key="food.name" class="descr">
            <div>
              <img :src="food.icon" class="mainRight-img" />
            </div>
            <div>
              <p>{{ food.name }}</p>
              <!-- <p class="title">{{ food.description }}</p> -->
              <p>
                ￥{{ food.price }}
                <span class="title">￥{{food.oldPrice}}</span>
              </p>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import { getGoods } from "../api/apis";
// 引入better-scroll插件，引入之前肯定要安装
import BScroll from "better-scroll";
export default {
  data() {
    return { list: [], index: 0 };
  },
  created() {
    getGoods().then(res => {
      this.list = res.data.data;
      // console.log(res);
    });
  },
  mounted() {
    // 插件第一步
    // 使用过better-scroll的元素要注册点击事件必须传入一个对象
    new BScroll(document.querySelector(".mainLeft"), {
      click: true
    });
    // ****better-scroll实例化出来的对象有一个scrollToElement的方法
   window.rightDiv = new BScroll(document.querySelector(".mainRight"),{
     probeType:3
   });
   window.rightDiv.on("scroll",({obj})=>{
     let _y=Math.abs(obj.y);
      console.log(obj);
     
     for(let divObj of this.getDivMath){
       if(_y>=divObj.min && _y<divObj.max){
          this.index=divObj.index
          return;
       }
     }
   })
  },
  methods: {
    show(i) {
      this.index = i;
      // 左侧索引i，对应右侧DIV id
      window.rightDiv.scrollToElement(document.getElementById(i), 500); //用实例对象.要调用的函数
    }
  },
  computed:{
    getDivMath(){
      let arr=[];
      let total=0;
      for (let i=0;i<this.list.length;i++){
        let curDivHeight=document.getElementById(i).offsetHeight;
        arr.push({min:total,max:total+curDivHeight,index:i});
        total+=curDivHeight;
      }
      return arr;
    }
  }
};
</script>
<style lang="less" scoped>
#goods {
  width: 100%;
  height: 100%;
  display: flex;
  height: 400px;
  .mainLeft {
    width: 100px;
    height: 100%;
    background-color: #f4f5f7;
    overflow: scroll;
    .nav {
      height: 60px;
      padding: 0px 10px;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
    }
  }
  .mainRight {
    flex: 1;
    height: 100%;
    overflow: scroll;
    // 图片大小
    .mainRight-img {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      margin-right: 8px;
    }
    // 标题样式
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      color: #a3a7aa;
      background-color: #f4f5f7;
    }
    // 商品详情排版
    .descr {
      height: 80px;
      margin: 12px;
      display: flex;
    }
    // 设置边框
    .descr:not(:nth-last-of-type(1)) {
      border-bottom: 1px solid #ccc;
    }
  }
  // 导航条的激活
  .active {
    background-color: #fff;
  }
}
</style>