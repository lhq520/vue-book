<template>
  <div class="header">
    <mt-header fixed title="追书阁">
      <div @click="getback" v-show="flag" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <!-- <mt-button slot="right">
        <svg class="icon">
          <use xlink:href="#icon-yonghu1" />
        </svg>
      </mt-button> -->
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "mhead",
  data(){
      return{
         flag:false,
      }
  },
  methods: {
    getback() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  margin-top: 30px;
  .mint-header.is-fixed {
    z-index: 99;
  }
  .mint-header {
    height: 30px;
  }
  .mint-header {
    background-color: #1e6ae2;
  }
}
</style>