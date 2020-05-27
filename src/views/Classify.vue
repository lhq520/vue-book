<template>
  <div>
    <Mhead></Mhead>
    <div class="cly">
      <ul v-for="items in arr" :key="items.id" class="mui-table-view">
        <p>{{items.title}}</p>
        <div class="dliss">
          <router-link
            tag="li"
            :to="{name:'feilei',query:{major:item.name,gender:items.gender}}"
            v-for="item in items.catList"
            :key="item.name"
            class="mui-table-view-cell"
          >
            <h3>{{item.name}}</h3>
            <h3>{{item.bookCount}}本</h3>
          </router-link>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import { categories } from "../api/api.js";
import Mhead from '../components/Mhead/Mhead'
export default {
  data() {
    return {
      bookcly: [],
      arr: []
    };
  },
  components:{
    Mhead
  },
  created() {
    this.getbookfly();
  },
  methods: {
    getbookfly() {
      categories().then(res => {
        var data = res.data;
        // console.log(data);
        if (res.status === 200) {
          //通过for of 重新遍历数组
          for (let [key, value] of Object.entries(data)) {
            // Object.entries方法返回一个数组
            let obj = null;
            if (key == "male") {
              obj = {
                title: "男生",
                gender: "male",
                catList: value
              };
            } else if (key === "female") {
              obj = {
                title: "女生",
                gender: "female",
                catList: value
              };
            } else if (key === "press") {
              obj = {
                title: "出版",
                gender: "press",
                catList: value
              };
            }
            if (obj !== null) {
              this.arr.push(obj);
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cly {
  margin-bottom: 32px;
  p {
    border-left: 2px solid #1e6ae2;
    padding-left: 10px;
    color: #333;
    font-size: 16px;
    margin: 5px 15px 5px 3px;
  }
  .dliss {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    padding: 0px 5px;
    li {
      color: black;
      width: 29%;
      border: 1px solid #1e6ae2;
      border-radius: 15px;
      text-align: center;
      font-size: 13px;
      padding: 2px 1px;
      margin: 2%;
      h3 {
        font-size: 13px;
      }
      :nth-child(2) {
        font-size: 12px;
      }
    }
  }
}
</style>