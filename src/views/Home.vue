<template>
  <div class="home">
    <Mhead></Mhead>
     <!-- 轮播图 -->
     <mt-swipe :auto="4000">
       <mt-swipe-item  v-for="(item,index) in banner" :key="index"><img :src="item" alt></mt-swipe-item>
     </mt-swipe>
      <!-- 搜索 -->
    <search></search>
     <!-- 分类 -->
    <div class="con">
         <p class="p1">男生热门</p>
       <novel v-for="book in manlist" :key="book._id" :book="book" :ishome="ishome"></novel>
      <div class="shux">
      <router-link :to="{name:'rank'}" tag="p">
        加载更多
        <span class="el-icon-refresh"></span>
      </router-link>
    </div>
    </div>

    <div class="con">
         <p class="p1">女生热门</p>
         <novel v-for="book in womanlist" :key="book._id" :book="book" :ishome="ishome"></novel>
      <div class="shux">
      <router-link :to="{name:'rank'}" tag="p">
        加载更多
        <span class="el-icon-refresh"></span>
      </router-link>
    </div>
    </div>
  </div>
</template>

<script>
import '../assets/font/fonts-user'
 import {rank} from '../api/api.js'
import search from '../components/Search/Search'
import Mhead from '../components/Mhead/Mhead'
export default {
  data() {
    return {
      banner:[
        'https://plf-new.zhuishushenqi.com/management/images/20200424/77293f7b772e4545963d1a7988e6d6d3.jpg',
        'https://plf-new.zhuishushenqi.com/management/images/20200410/632ac1da3321499bbf90302c7f0b9e5a.jpg',
        'https://plf-new.zhuishushenqi.com/management/images/20200417/18e848de81824016bb9fe89ae06d4a60.jpg',
        'https://plf-new.zhuishushenqi.com/management/images/20200424/86297f4ac530477b9da08c0f29f4ae73.jpg',
        'https://plf-new.zhuishushenqi.com/management/images/20200417/855ffc9bcf734416af73253f3a3b728f.jpg',
      ],
      manlist:[],
      womanlist:[],
      ishome:true
    };
  },
  components:{
     search,
     Mhead
  },
  created() {
    this.getBook()
  },
  methods: {

     // 解决图片加载问题
      imgurl(arr) {
        for(let i=0;i<arr.length;i++){
          arr[i].cover=unescape(arr[i].cover);
          arr[i].cover=arr[i].cover.replace("/agent/", "")
        }
        return arr
      },
     
      getBook(){
          rank('54d42d92321052167dfb75e3').then(res=>{
            if(res.data.ok){
              this.manlist=this.imgurl(res.data.ranking.books.slice(0,5))
              // console.log(this.manlist)
            }
          });
           rank('54d43437d47d13ff21cad58b').then(res=>{
            //  console.log(res)
            if(res.data.ok){
              this.womanlist=this.imgurl(res.data.ranking.books.slice(0,5))
              // console.log(this.womanlist)
            }
          });
      }
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin-bottom: 30px;
  .mint-swipe{
    height: 120px;
  }
  .con{
    margin-top: 10px;
  }
  .p1 {
    font-size: 13px;
    color: #333;
    border-left: 2px solid #1E6AE2;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  img {
    width: 100%;
  }
  .shux {
    //   border-top: 1px solid #EAEAEA;
    height: 44px;
    text-align: center;
    line-height: 44px;
    box-shadow: 0px 2px 1px #eaeaea;
    p {
      font-size: 12px;
      color: #666;
    }
  }
}


</style>