<template>
  <div class="app">
    <!-- 头部 -->
     
    <router-view  @fangfa="show"></router-view>
    <!-- 底部 -->
    <mt-tabbar v-if="fag" fixed>
      <mt-tab-item>
        <router-link :to="{name:'home'}" tag="div">
          <svg class="icon">
            <use xlink:href="#icon-shouye"></use>
          </svg>
          <h1>首页</h1>
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link :to="{name:'bookrack'}" tag="div">
          <svg class="icon">
            <use xlink:href="#icon--"></use>
          </svg>
          <h1>书架</h1>
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link :to="{name:'classify'}" tag="div">
          <svg class="icon">
            <use xlink:href="#icon-fenlei"></use>
          </svg>
          <h1>分类</h1>
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link :to="{name:'rank'}" tag="div">
          <svg class="icon">
            <use xlink:href="#icon-paihangbang-"></use>
          </svg>
          <h1>排行</h1>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  
  </div>
</template>
<script>
import './assets/font/fonts-user'
export default {
  data(){
    return{
      
      fag:true,
    }
  },
  methods:{
   
    show(data){
      this.fag=data;
    }
  }
}
</script>
<style lang="scss" scoped>
 *{margin: 0;padding: 0;}
body{
background-color: #fff;
}
.mint-tabbar > .mint-tab-item.is-selected{
  color: #555;
  background-color: #EFEFF4;
}

.mint-tab-item{
  padding: 0;
}
.mint-tab-item-label{
  h1{
    font-size: 12px;
  }
}
.router-link-exact-active{
  background-color:rgb(189, 189, 189);
}
</style>