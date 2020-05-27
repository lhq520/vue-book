<template>
  <div>
    <Mhead></Mhead>
    <header>
      <span>排行榜</span>
      <div class="btn-header">
        <button @click="tabshow('male')" :class="{active:this.ranktit==='male'}">男生</button>
        <button @click="tabshow('female')" :class="{active:this.ranktit==='female'}">女生</button>
        <button @click="tabshow('epub')" :class="{active:this.ranktit==='epub'}">出版</button>
      </div>
    </header>
    <div class="rank">
      <section class="rank-left">
        <ul
          v-show="ranktit==='male'"
          v-for="item in maleRank"
          :key="item.id"
          class="mui-table-view"
        >
          <li
            @click="getrankid(item._id)"
            :class="['mui-table-view-cell',{active:item._id===rankId}]"
          >{{item.shortTitle}}</li>
        </ul>

        <ul
          v-show="ranktit==='female'"
          v-for="item in femaleRank"
          :key="item.id"
          class="mui-table-view"
        >
          <li
            @click="getrankid(item._id)"
            :class="['mui-table-view-cell',{active:item._id===rankId}]"
          >{{item.shortTitle}}</li>
        </ul>

        <ul
          v-show="ranktit==='epub'"
          v-for="item in epubRank"
          :key="item.id"
          class="mui-table-view"
        >
          <li
            @click="getrankid(item._id)"
            :class="['mui-table-view-cell',{active:item._id===rankId}]"
          >{{item.shortTitle}}</li>
        </ul>
      </section>
      <section class="rank-right">
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          ref="loadmore"
        >
          <novel v-for="book in bookList" :key="book._id" :book="book" :ranks="ranks"></novel>
        </mt-loadmore>
      </section>
    </div>
  </div>
</template>

<script>
import Novel from "../components/Novel/Novel.vue";
import Mhead from '../components/Mhead/Mhead'
import { rank,rankCategory } from "../api/api.js";
import { Loadmore } from "mint-ui";
export default {
  name: "rank",
  props: ["appref"],
  data() {
    return {
      maleRank: [],
      femaleRank: [],
      epubRank: [],
      rankId: "",
      ranktit: "male",
      bookList: [],
      ranks: true,
      bookList: [],
      count: 1,
      allLoaded: false
    };
  },
  components: {
    Novel,
    Mhead
  },
  mounted() {
    // 获取当前列表的自适应高度
  },
  methods: {
    tabshow(ranktit) {
      if (ranktit === "male") {
        this.ranktit = ranktit;
        this.rankId = this.maleRank[0]._id;
      } else if (ranktit === "female") {
        this.ranktit = ranktit;
        this.rankId = this.femaleRank[0]._id;
      } else {
        this.ranktit = ranktit;
        this.rankId = this.epubRank[0]._id;
      }
    },
    // 下拉加载
    loadBottom() {
      this.allLoaded = true;
      var vm = this;
      this.$refs.loadmore.onBottomLoaded();
      if (!vm.allloaded) {
        rank(this.rankId).then(res => {
          this.bookList = this._unEscape(
            res.data.ranking.books.slice(0, this.count * 15 + 15)
          );
          this.count++;
          this.allLoaded = false;
        });
      } else {
        console.log("没有更多数据了");
      }
    },
    getrankid(id) {
      this.rankId = id;
    },
    _unEscape(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].cover = unescape(arr[i].cover);
        arr[i].cover = arr[i].cover.replace("/agent/", "");
      }
      return arr;
    }
  },
  watch: {
    rankId: function() {
      this.bookList = [];
      rank(this.rankId).then(res => {
        this.bookList = this._unEscape(res.data.ranking.books.slice(0, 15));
        // console.log(res);
      });
    }
  },
  created() {
    rankCategory()
      .then(res => {
        // console.log(res)
        this.maleRank = res.data.male;
        this.femaleRank = res.data.female;
        this.epubRank = res.data.epub;
        this.rankId = this.maleRank[0]._id;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  line-height: 40px;
  position: fixed;
  z-index: 100;
  display: flex;
  background-color: #fff;
  span {
    width: 25%;
    margin-left: 10px;
  }
  .btn-header {
    width: 75%;
    display: flex;

    button {
      flex: 1;
      margin: 4px 10px;
    }
  }
}

.active {
  background-color: #1e6ae2;
  color: #fff;
}
.rank {
  display: flex;
  justify-content: space-between;
  li {
    font-size: 13px;
  }
  .rank-left {
    width: 25%;
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    // background-color: cornflowerblue;
    overflow-y: scroll;
  }
  .rank-right {
    overflow: scroll;
    position: relative;
    top: 40px;
    bottom: 0px;
    margin: 5px 0 6px 25%;
    // background-color:burlywood;
    width: 75%;
    height: 550px;
    touch-action: none;
    .mint-loadmore {
      margin-bottom: 10px;
    }
  }
}
</style>