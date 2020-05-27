<template>
  <div>
    <!-- 头部 -->
    <mt-header fixed title="书籍详情">
      <div @click="getback" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button slot="right"></mt-button>
    </mt-header>

    <div class="book-detail" v-show="book.title">
      <div class="cover">
        <img :src="_unEscape(book.cover)" alt />
      </div>
      <div class="desc">
        <h1>{{book.title}}</h1>
        <p class="info">
          <span class="author">{{book.author}}</span> |
          <span>{{book.minorCate || 0}}</span>
          |
          <span>{{latelyCount(book.wordCount || 0)}}</span>
        </p>
        <p>
          <span>{{book.isSerial?'连载中':'完结'}}</span>
        </p>
        <!-- <p class="update">{{upDate > 1 ? upDate + "小时前" : upDate * 60 + "分钟前"}}更新</p>
        <p>{{book.lastChapter}}</p>-->
      </div>
    </div>

    <div class="read-link">
      <div class="read-button">
        <button class="fl">{{flag?'移出书架':'加入书架'}}</button>
        <button class="fr">开始阅读</button>
      </div>
    </div>

    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <div class="mui-media-body">
          <p>追人气</p>
        </div>
        <div class="mui-media-body">
          <p class="body-p">{{latelyFollower()}}</p>
        </div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <div class="mui-media-body">
          <p>读者留存率</p>
        </div>
        <div class="mui-media-body">
          <p class="body-p">{{book.retentionRatio}}%</p>
        </div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <div class="mui-media-body">
          <p>日更新字数/天</p>
        </div>
        <div class="mui-media-body">
          <p class="body-p">{{book.serializeWordCount}}</p>
        </div>
      </li>
    </ul>

    <div class="long" @click="el">
      <p class="pop" ref="pl">{{book.longIntro}}</p>
      <span ref="span" :updown="updown" class="mui-icon mui-icon-arrowdown"></span>
    </div>
    <!-- 目录 -->
    <div>
      <router-link :to="{name:'read',params:{id:this.book._id,show:true}}" class="mulu" tag="p">
        <span>目录</span>
        <span>{{ book.updated | formatDate }}</span>
        <span>{{book.lastChapter}}</span>
      </router-link>
    </div>
    <!-- 评论 -->
    <Rating></Rating>
  </div>
</template>

<script>
import Rating from '../Rating/Rating'
import { formatDate } from "../../api/time";
import { book } from "../../api/api";
import { mapState,mapMutations } from 'vuex'
export default {
  name: "bookDetail",
  data() {
    return {
      book: {},
      upDate: 0,
      comments: [],
      sUrl: "http://statics.zhuishushenqi.com",
      flag: false,
      updown:false,
      fontSize: 18,
      fontColor: "#5c5d58",
      background: "#eee6dd",
      readePattern: 0,
      pagingPattern: 0
    };
  },
  components: {
      Rating
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
   ...mapMutations([
      'SET_HEADER_INFO',
      'SET_BOOK'
		]),
    getback() {
      this.$router.back();
    },
    _unEscape(str) {
      str = unescape(str).replace("/agent/", "");
      return str;
    },
    latelyCount(count) {
      if (count > 10000) {
        return (count / 10000).toFixed() + "万字";
      } else {
        return count + "字";
      }
    },
    latelyFollower() {
      return this.book.latelyFollower > 10000
        ? (this.book.latelyFollower / 10000).toFixed(1) + "万"
        : this.book.latelyFollower;
    },
    _time(time) {
      let currentTime = Math.round(new Date() / 1000);
      time = new Date(time).getTime() / 1000;
      let timer = Math.floor(((currentTime - time) % 86400) / 3600);
      return timer;
    },
    getBook(id) {
      book(id).then(res => {
        // console.log(res);
        this.book = res.data;
        this.upDate = this._time(this.book.updated);
        //   this.isFlag()
          this.SET_BOOK(this.book)
      });
    },
    el() {
      if (this.updown) {
        this.$refs.pl.className = "";
        this.$refs.span.className = "mui-icon mui-icon-arrowup";
        this.updown = false;
      } else {
        this.$refs.pl.className = "pop";
        this.$refs.span.className = "mui-icon mui-icon-arrowdown";
        this.updown = true;
      }
    }
  },
  created() {
    this.getBook(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
.book-detail {
  display: flex;
  margin-top: 41px;
  padding: 5px 5px;
  width: 100%;
  align-items: center;
  .cover {
    width: 25%;
    margin-left: 10px;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
  .desc {
    margin-left: 10px;
    margin-bottom: 20px;
    h1 {
      height: 20px;
      font-size: 16px;
    }
    p {
      height: 18px;
      color: #999;
      font-size: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.author {
  color: red;
}
.active {
  background: #999999;
  color: #fff;
}
.read-link {
  width: 100%;
  height: 56px;
  margin-top: 5px;
  border-bottom: 1px solid #ebebeb;
  .read-button {
    margin: 0 auto;
    width: 80%;
    line-height: 56px;
    button {
      width: 45%;
      height: 40px;
      border: 1px solid #26a2ff;
      &:last-child {
        background: #26a2ff;
        color: #fff;
      }
    }
  }
}
.body-p {
  color: #333;
}
.long {
  padding: 10px;
  p {
    color: #333;
    font-size: 12px;
    margin-right: 10px;
  }
  .pop {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  span {
    margin-top: -32px;
    display: flex;
    justify-content: flex-end;
  }
}
.mulu {
    width: 100%;
  padding: 10px 5px;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
   overflow: hidden;
    white-space: nowrap;
  font-size: 12px;
  :nth-child(1) {
    font-size: 14px;
    color: #333;
  }
  :nth-child(2) {
    padding: 0px 5px;
  }
  :nth-child(3) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.fl {
  float: left;
}
.fr {
  float: right;
}
</style>