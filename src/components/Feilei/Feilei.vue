<template>
  <div class="feilei">
    <mt-header :title="major" class="book-header">
      <router-link to="/classify" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="select">
      <ul class="select-bar">
        <li
          v-for="(item,index) in largeTypes"
          :class="{'active':index=== largeTypeIndex}"
          @click="setLargeType(item.type,index)" :key="item.index"
        >{{item.name}}</li>
      </ul>
      <ul class="select-bar" v-show="mins.length>0">
        <li v-for="(minor,index) in mins" :class="{'active':index===smallTypeIndex}"
            @click="setSmallType(minor,index)" :key="minor.index" >{{minor}}
        </li>
      </ul>
    </div>

    <div class="load-more" ref="load" :class="[mins.length>0?'padding300':'padding200']">
      <mt-loadmore class="loadmore" ref="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false"
                   :bottom-all-loaded="allLoaded">
        <div class="booklist">
          <Novel :book="book" v-for="(book,index) in feilist" :key="index" :cate="cate"
                     :isLoadMore="isLoadMore"></Novel>
          <div v-show="!feilist.length" style="margin-top: 50px; text-align: center">暂无数据</div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { subCategories, categoriesInfo } from "../../api/api.js";
import {Indicator,Loadmore} from 'mint-ui';
import Novel from '../Novel/Novel';
export default {
  name: "feilei",
  data() {
    return {
      largeTypeIndex: 0,
        smallTypeIndex: 0,
        type: 'hot',
        duration: 'last-seven-days',
        major: '',
        minor: '',
        gender: '',
        start: 0,
        currentPage: 1,
        largeTypes: [
          {
            type: 'hot',
            name: '热门',
          },
          {
            type: 'new',
            name: '新书',
            duration: 'all'
          },
          {
            type: 'reputation',
            name: '好评',
          },
          {
            type: 'over',
            name: '完结',
          },
          {
            type: 'monthly',
            name: '包月',
          }
        ],
        mins: [],
        feilist: [],
        allLoaded: false,
        cate: true,
        isLoadMore: false
    };
  },
  methods: {
    setLargeType(type, index) {
      this.largeTypeIndex = index;
      if (this.type === type) {
        return;
      }
      this.type = type;
      this._getBookLists(this.gender, this.type, this.major, this.minor);
      //点击后重置滚动距离
      this.$refs.load.scrollTop = 0
    },
    setSmallType(minor, index){

        this.smallTypeIndex = index;
        if (this.minor === minor) {
          return
        }
        if (minor === '' || minor === '全部') {
          this.minor = ''
        } else {
          this.minor = minor;
        }
        this.currentPage = 1;

        this._getBookLists(this.gender, this.type, this.major, this.minor);
        //点击后重置滚动距离
        this.$refs.load.scrollTop = 0
      },
      _getBookLists(gender, type, major, minor = '', start = 0, limit = 20){
        categoriesInfo(gender, type, major, minor, start, limit).then((res) => {
          if (res.data.ok) {
            this.feilist = this._unEscape(res.data.books)
          }
        },(error)=>{
          Indicator.close();
          Indicator.open('网络错误');
          setTimeout(()=>{
            Indicator.close();
          },1500)
        })
      },
      _unEscape(arr){
        for (let i = 0; i < arr.length; i++) {
          arr[i].cover = unescape(arr[i].cover);
          arr[i].cover = arr[i].cover.replace("/agent/", "")
        }
        return arr
      },
      loadBottom(){
        //加载更多
        this.isLoadMore = true;
        Indicator.open('加载中');
        categoriesInfo(this.gender, this.type, this.major, this.minor, this.currentPage * 20, 20).then((res) => {
          if (res.data.ok) {
            this.feilist = this.feilist.concat(this._unEscape(res.data.books));
            setTimeout(() => {
              Indicator.close();
              this.isLoadMore = false;
            }, 350);
            this.currentPage++;
          }
        },(error)=>{
          Indicator.close();
          Indicator.open('网络错误');
          setTimeout(()=>{
            Indicator.close();
          },1500)
        });
        this.$refs.loadmore.onBottomLoaded()
      },
      loadTop(){
        //下拉加载
        Indicator.open('加载中');
        categoriesInfo(this.gender, this.type, this.major, this.minor, 0, 20).then((res) => {
          if (res.data.ok) {
            this.feilist = this._unEscape(res.data.books)
            Indicator.close();
          }
        },(error)=>{
          Indicator.close();
          Indicator.open('网络错误');
          setTimeout(()=>{
            Indicator.close();
          },1500)
        });
        this.$refs.loadmore.onTopLoaded()
      },
  },
  beforeRouteEnter(to, from, next){
      /*获取大类中的小类*/
      next(vm => {
        vm.major = vm.$route.query.major;
        vm.gender = vm.$route.query.gender;
        subCategories().then((res) => {
          res.data[vm.$route.query.gender].forEach((type) => {
            if (type.major === vm.$route.query.major) {
              vm.mins = type.mins;
              if (type.mins.length > 0) {
                vm.mins.unshift('全部')
              }
            }
          });
        },(error)=>{
          Indicator.close();
          Indicator.open('网络错误');
          setTimeout(()=>{
            Indicator.close();
          },1500)
        });
        vm._getBookLists(vm.$route.query.gender, vm.type, vm.$route.query.major)
      })
    }
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  .select-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 50px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid #f2f2f2;
    li {
      flex-shrink: 0;
      line-height: 50px;
      padding: 0 10px;
      font-size: 12px;
    }
  }
}
.active {
      color :#26A2FF;
    }
    .load-more{
      max-height: 420px;
      overflow:scroll;
    }
    .booklist{
        padding: 5px 5px;
        padding-bottom: 20px;
    }
</style>