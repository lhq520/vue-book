<template>
  <div>
     <mt-header fixed title="搜索">
      <div @click="getback"  slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>
    <section class="searchs">
      <search @setsearch="show"></search>
    </section>
    <section ref="load" :style="{height:boxheight}" class="boxs">
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadmore"
      >
        <Novel :book="book" v-for="book in search" :key="book._id"></Novel>
      </mt-loadmore>
    </section>
  </div>
</template>

<script>
import { booksearch } from "../../api/api.js";
import Search from "./Search";
import Novel from "../Novel/Novel";
export default {
  name: "searchlist",
  data() {
    return {
      value: this.$route.params.val,
      search: [],
      count: 1,
      allLoaded: false,
      boxheight: "580px"
    };
  },
  components: {
    Search,
    Novel
  },
  watch: {
    $route: function() {
      booksearch(this.value).then(res => {
        this.search = this._unEscape(res.data.books.slice(0, 15));
        // console.log(res);
        //点击后重置滚动距离
        this.$refs.load.scrollTop = 0;
      });
    }
  },
  methods: {
     getback() {
      this.$router.back();
    },
    _unEscape(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].cover = unescape(arr[i].cover);
        arr[i].cover = arr[i].cover.replace("/agent/", "");
      }
      return arr;
    },
    getsearchs() {
      // var key=this.$route.params.val
      booksearch(this.value).then(res => {
        this.search =this._unEscape(res.data.books.slice(0, 15));
        // console.log(this.search);
        //点击后重置滚动距离
        this.$refs.load.scrollTop = 0;
      });
    },
    show(data) {
      this.value = data;
    },
    // 下拉加载
    loadBottom() {
      this.allLoaded = true;
      booksearch(this.value).then(res => {
        //   console.log(res);
        if (this.search.length === res.data.books.length) {
          this.allLoaded = false;
        }
        this.search =this. _unEscape(res.data.books.slice(0, this.count * 15 + 15));
        this.count++;
        this.allLoaded = false;
        // console.log(    this.bookList);
      });
    }
  },
  created() {
    this.getsearchs();
  }
};
</script>

<style lang="scss" scoped>
.searchs {
  position: fixed;
  width: 100%;
  top: 40px;
  z-index: 100;
}
.boxs {
  margin-top: 80px;
  margin-bottom: 34px;
  overflow: scroll;
}
</style>