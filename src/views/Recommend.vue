<template>
<div class="recommend-view" ref="list">
  <div v-for="list in recommendList" :key="list.date">
    <div class="recommend-date">{{ showDate(list.date) }}</div>
    <Item v-for="item in list.stories" :data="item" :key="item.id" @click.native="toAtricle(item.id)"></Item>
  </div>
</div>
</template>

<script>
import $ from '../libs/util';
import Item from '../components/Item';
export default {
  data() {
    return {
      dailyTime: $.getTodayTime(),
      recommendList: [],
      isLoading: false
    };
  },
  components: {
    Item
  },
  methods: {
    toAtricle(artId) {
      this.$router.push('/article/' + artId);
    },
    recommendListSort() {
      // 每日推荐排序
      this.recommendList.sort((a, b) => {
        return b.date - a.date;
      });
    },
    async getRecommendList(time) {
      this.isLoading = true;
      const prevDay = $.prevDay(time + 86400000);
      const res = await $.ajax.get('news/before/' + prevDay);
      this.recommendList.push(res);
      this.recommendListSort();
      this.isLoading = false;
    },
    showDate(date) {
      const year = date.substr(0, 4);
      const month = date.substr(4, 2);
      const day = date.substr(6, 2);
      const listDate = new Date(year, month - 1, day);
      const today = new Date();
      if (today.toLocaleDateString() === listDate.toLocaleDateString()) {
        return '今日要闻';
      } else {
        const week = ['日', '一', '二', '三', '四', '五', '六'];
        return `${ listDate.getMonth() + 1}月${listDate.getDate()}日 星期${week[listDate.getDay()] }`;
      }
    },
    initScroll() {
      const content = this.$parent.$refs.content;
      const h =
        document.documentElement.clientHeight || document.body.clientHeight;
      const view = this.$refs.list;

      function throttle(func, delay) {
        let timer = null;
        return ()=> {
          if (!timer) {
            timer = setTimeout(()=>{
              func();
              timer = null;
            }, delay);
          }
        };
      }
      if (this.$route.path == '/') {
        if (view.offsetHeight < h) {
          this.dailyTime -= 86400000;
          this.getRecommendList(this.dailyTime);
        }
        content.addEventListener(
          'scroll',
          throttle(() => {                                                         
            if (this.isLoading) return;
            if (content.scrollTop + h >= content.scrollHeight * 0.9) {
              this.dailyTime -= 86400000;
              this.getRecommendList(this.dailyTime);
            }
          }, 100),
          false
        );
        content.addEventListener(
          'scroll',
          throttle(() => {
            const date = view.querySelectorAll('.recommend-date');
            // console.log('content', '=>', content.scrollTop);
            for (let i = 0; i < date.length; i++) {
              const val = date[i].offsetTop - content.scrollTop;
              if (i == 0) {
                if (val <= -47) this.$store.commit("editTitle", date[i].innerHTML);
                else this.$store.commit("editTitle", "首页");
              } else {
                if (val <= 13) this.$store.commit("editTitle", date[i].innerHTML);
              }
            }
          }, 100),
          false
        );
      }
    }
  },
  mounted() {
    this.dailyTime = $.getTodayTime();
    this.getRecommendList(this.dailyTime);
    this.initScroll();
  }
};
</script>

<style>
.recommend-view {
  background-color: rgb(240, 240, 240);
  padding-top: 12px;
  padding-bottom: 2px;
}

.recommend-date {
  line-height: 36px;
  padding-left: 16px;
}
</style>
