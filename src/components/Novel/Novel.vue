<template>
  <div class="book-item" @click="goBooks(book._id)">
    <div class="cover">
      <img :src="book.cover" alt />
    </div>
    <div class="item-txt">
      <h4 class="name">{{book.title}}</h4>
      <p class="author">{{book.author}}</p>
      <p class="desc">{{book.shortIntro}}</p>
      <p class="desc" v-show="isBookList">{{book.desc}}</p>
      <p class="cat" v-if="ishome">
        {{book.minorCate}}
        <span class="split">|</span>
        <span class="c-rq">{{latelyFollower}}</span>
        万人气
      </p>
      <p class="cat" v-if="cate||ranks|| isSearch">
        <span class="c-rq">{{latelyFollower}}</span>万人气
        <span class="split">|</span>
        <span class="c-rq">{{book.retentionRatio}}%</span>读者留存
      </p>
      <p class="cat" v-if="isBookList">
        共{{book.bookCount}}本书
        <span class="split">|</span>
        <span>{{collectorCount}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    book: {
      type: Array | Object,
      default: null
    },
    ishome: {
      type: Boolean,
      default: false
    },
    cate: {
      type: Boolean,
      default: false
    },
    ranks: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    isBookList: {
      type: Boolean,
      default: false
    },
    isLoadMore: {
      type: Boolean,
      default: false
    }
  },
 
  computed: {
    latelyFollower() {
      return (this.book.latelyFollower / 10000).toFixed(1);
    },
    collectorCount() {
      if (this.book.collectorCount) {
        if (this.book.collectorCount > 10000) {
          return (this.book.collectorCount / 10000).toFixed(1) + "万人收藏";
        } else {
          return this.book.collectorCount + "人收藏";
        }
      } else {
        return 0 + "人收藏";
      }
    }
  },
  created() {
  },
  methods: {
   
    goBooks(id) {
      if (this.isLoadMore) {
        return;
      }
       else {
        //  console.log(id)
        this.$router.push({
          path: `/bookDetail/${id}`
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.book-item {
  display: flex;
  // padding:7.6px;
  height: 84px;
  border-bottom: 1px solid #f5f5f5;
}
.cover {
  flex: 0 0 54px;
  height:68;
  // background: url("../../assets/images/default.jpg") no-repeat;
  background-position: 50%;
  background-size: 100%;
  img {
    max-width: 100%;
    max-height: 68px;
  }
}
.item-txt {
  flex: 1;
  width: 100%;
  overflow: hidden;
}
.name {
  font-weight: 400;
  font-size: 14px; /* no*/
  line-height: 17px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
}
p {
  line-height: 17px;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 0;
  overflow: hidden;
}
.split{
  font-weight: bold;
  margin-right: 2px;
}
.cat{
  color: #666;
}
.c-rq{
  color: red;
}
</style>