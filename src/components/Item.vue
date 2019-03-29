<template>
  <a class="list-item clearfix">
    <div class="list-img" v-if="data.images">
      <img :src="imgPath + data.images[0]">
    </div>
    <div class="list-title" :class="{ noImg: !data.images}">{{ data.title }}</div>
  </a>
</template>

<script>
import $ from '../libs/util';
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      imgPath: $.imgPath
    };
  }
};
</script>

<style lang="scss" scoped>
@charset "utf-8";
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.list-item {
  display: block;
  margin: 12px;
  border-radius: 5px;
  background-color: #fff;
}

.list-img {
  width: 80px;
  height: 80px;
  float: right;
  margin-right: 24px;
  margin-top: 18px;
  margin-bottom: 18px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }

}

.list-title {
  margin-right: 120px;
  padding: 24px 0 24px 16px;
}

.list-title.noImg {
  padding: 24px 16px;
  margin-right: 0;
}
</style>
