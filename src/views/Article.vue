<template>
<div>
  <div class="title-wrap">
    <div class="first-title">{{ data.title }}</div>
  </div>
  <div id="my-article" v-html="data.body"></div>
  <div id="my-comments" v-show="comments.length">
    <span>{{ comments.length }}条短评</span>
    <div class="my-comment clearfix" v-for="comment in comments" :key="comment.id">
      <div class="my-avatar">
        <img :src="comment.avatar">
        </div>
        <div class="my-comment-body">
          <div class="my-comment-name">{{ comment.author }}</div>
          <div class="my-comment-text">{{ comment.content }}</div>
          <div class="my-comment-time" v-time="comment.time"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Time from "../directives/time";
import $ from "../libs/util";
export default {
  props: ["id"],
  directives: {
    Time
  },
  data() {
    return {
      data: "",
      comments: []
    };
  },
  watch: {
    data: function() {
      console.log(this)
      this.$nextTick(() => {
        const bg = document.querySelector(".headline .img-place-holder");
        if (bg) {
          const wrap = document.querySelector(".title-wrap");
          const title = document.querySelector(".first-title");
          bg.style.cssText = 
            `background-image: url(${$.imgPath +this.data.image});
            height: 210px;
            background-size: cover;
            background-position: center center`;
          wrap.style.cssText = 
            `display: block;
            width: 100%;
            height: 210px;
            position: absolute;
            background-color: rgba(0,0,0,.5);`;
          title.style.cssText = 
            `position: absolute;
            font-size: 1.3rem;
            color: #fff;
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            font-weight: 500;`;
        }
      });
    }
  },
  methods: {
    async getArticle() {
      const res = await $.ajax.get("news/" + this.id);
      res.body = res.body.replace(/src="http/g, 'src="' + $.imgPath + "http");
      res.body = res.body.replace(/src="https/g, 'src="' + $.imgPath + "https");
      this.data = res;
      this.getComments();
    },
    async getComments() {
      this.comments = [];
      const res = await $.ajax.get("story/" + this.id + "/short-comments");
      this.comments = res.comments.map(comment => {
        // 将头像的图片地址转为代理地址
        comment.avatar = $.imgPath + comment.avatar;
        return comment;
      });
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>

<style lang="scss">
$grey-color: rgb(220, 220, 220);

.view-more {
  a {
    display: block;
    cursor: pointer;
    background: #eee;
    text-align: center;
    color: #888;
    text-decoration: none;
    padding: 4px 0;
    border-radius: 3px;
  }
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

#my-article {
  .content {
    img {
      display: inline-block;
      width: 100%;
    }

    p {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  h2 {
    font-size: 1.2rem;
  }

  .content-inner {
    padding: 0 1rem 1rem 1rem;
  }

  .meta {
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    img {
      width: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: middle;
    }

    .bio {
      font-size: 0.9rem;
      color: rgb(173, 171, 171);
    }

    .author,
    .bio {
      vertical-align: -15%;
      line-height: 24px;
    }
  }
}

#my-comments {
  span {
    width: 100%;
    display: inline-block;
    line-height: 3rem;
    height: 3rem;
    padding-left: 1rem;
    border-top: 1px solid $grey-color;
    border-bottom: 1px solid $grey-color;
  }
}

.my-comment {
  padding-right: 1rem;
  border-bottom: 1px solid $grey-color;
}

.my-avatar {
  float: left;
  margin-top: 1rem;
  margin-left: 1rem;
  height: 30px;
  width: 30px;

  img {
    border-radius: 50%;
    display: inline-block;
    height: 100%;
    width: 100%;
  }
}

.my-comment-name {
  padding-top: 1.2rem;
}

.my-comment-body {
  margin-left: 56px;
}

.my-comment-text {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.my-comment-time {
  font-size: 0.8rem;
  color: rgb(150, 150, 150);
  padding-bottom: 0.8rem;
}

.headline {
  .headline-title {
    font-size: 1.5rem;
    font-weight: bold;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .meta {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.headline-background {
  margin: 1rem;

  .heading {
    color: #000;
  }
}

.title-wrap {
  display: none;
}

.question-title {
  margin-top: 1rem;
}
</style>
