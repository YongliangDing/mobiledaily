<template>
  <div id="app">
    <div id="header">
      <div v-show="!showBack">
        <a @click.stop="showMenu" class="button"></a><span class="title">{{ getTitle }}</span>
      </div>
      <div class="back-button" v-show="showBack">
        <span @click.stop="goBack"></span>
      </div>
    </div>
    <transition name="fade">
      <div id="menu" v-show="isShow">
        <div class="nothing"></div>
        <div class="items">
          <div class="menu-index">
            <a @click.stop="handleRouter()">首页</a>
          </div>
          <ul>
            <li v-for="item in themes" :key="item.id">
              <a @click.stop="handleRouter(item)">{{item.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div id="content" ref="content">
      <router-view></router-view>
    </div>
    <transition name="shade">
      <div class="shade" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script>
import $ from './libs/util.js';
export default {
  name: 'App',
  data() {
    return {
      title: '首页',
      isShow: false,
      themes: [],
      showBack:false
    };
  },
  computed: {
    getTitle() {
      return this.$store.getters.getTitle;
    }
  },
  methods: {
    handleRouter(item) {
      this.isShow = false;
      if (item) {
        this.$router.push('/theme/' + item.id);
        this.title = item.name;
      } else {
        this.$router.push('/');
        this.title = '首页';
      }
    },
    async getThemes() {
      const res = await $.ajax.get('themes');
      this.themes = res.others;
    },
    showMenu() {
      this.isShow = true;
    },
    editTitle(val) {
      this.title = val;
    },
    goBack() {
      this.$router.back();
    },
    watchPath() {
      const path = this.$route.path;
      if(path === '/'){
        this.title  = '首页';
      }
      this.showBack = path.includes('article') ? true :false;
    }
  },
  mounted() {
    this.getThemes();
    document.addEventListener(
      'click',
      event => {
        if (this.isShow) {
          this.isShow = false;
        }
        event.stopPropagation();
      },
      false
    );
  },
  watch: {
    $route: 'watchPath'
  }
};
</script>

<style lang="scss" scoped>
@charset "utf-8";

#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

.shade {
  position: absolute;
  z-index: 6;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.65);
}

#header,
#content {
  position: absolute;
  left: 0;
  width: 100%;
}

#header {
  top: 0;
  line-height: 3rem;
  background-color: #0096ff;
  color: #fff;
  z-index: 1;

  .button {
    display: inline-block;
    margin-left: 1rem;
    margin-right: 1.5rem;
    width: 20px;
    height: 2px;
    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;
    padding: 3px 0;
    background-color: currentColor;
    background-clip: content-box;
    vertical-align: middle;
  }

  .title {
    font-size: 1rem;
    vertical-align: middle;
  }

  .back-button {
    height: 3rem;

    span {
      display: inline-block;
      width: 3rem;
      height: 3rem;
      background-image: url(./assets/left-arrow.png);
      background-size: 1.5rem 1.5rem;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }

}

#content {
  top: 3rem;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

#menu {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80%;
  z-index: 9;
  background-color: #fff;

  .items {
    overflow: hidden;
  }

  .menu-index {
    background-color: #eee;
    height: 3rem;
    line-height: 3rem;

    a {
      display: inline-block;
      padding-left: 4rem;
      color: #0096ff;
      vertical-align: middle;
      line-height: normal;
      text-decoration: none;
      background-image: url(./assets/home.png);
      background-repeat: no-repeat;
      background-size: 1.8rem 1.8rem;
      background-position: 30% center;
    }

  }

  ul {
    position: absolute;
    overflow: auto;
    top: 11rem;
    bottom: 0;
    width: 100%;
  }

  li {
    height: 3rem;
    line-height: 3rem;
    text-align: left;
    padding-left: 2rem;

    a {
      display: inline-block;
      height: 100%;
      width: 100%;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(-80%);
}

.shade-enter-active,
.shade-leave-active {
  transition: all 0.3s ease-in;
}

.shade-enter,
.shade-leave-to {
  opacity: 0;
}

.nothing {
  height: 8rem;
  background-color: #0096ff;
}
</style>
