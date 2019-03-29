<template>
  <div class="theme-view">
    <Item v-for="item in list" :data="item" :key="item.id" @click.native="toAtricle(item.id)"></Item>
  </div>
</template>
<script>
import $ from '../libs/util';
import Item from '../components/Item';
export default {
  props: ['id'],
  data() {
    return {
      list: []
    };
  },
  components: {
    Item
  },
  methods: {
    toAtricle(artId) {
      this.$router.push('/article/' + artId);
    },
    async getStories() {
      const res = $.ajax.get('theme/' + this.id);
      this.list = res.stories.filter(item => item.type !== 1);
    }
  },
  watch: {
    id: async function() {
      this.list = [];
      const res = $.ajax.get('theme/' + this.id);
      this.list = res.stories.filter(item => item.type !== 1);
    }
  },
  mounted() {
    this.list = [];
    this.getStories();
  }
};
</script>
<style scoped>
.theme-view {
  background-color: rgb(240, 240, 240);
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
