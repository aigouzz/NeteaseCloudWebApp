<template>
    <div class="wrapper playList">
      <Loading :isloading="loading"></Loading>
      <div class="content" v-if="!loading">
        <div class="title">全部歌单 </div>
            <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
              <mu-flexbox-item basis="40%" class="list-item" :key="item.id" v-for="item in playList">
                <router-link :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description }}">
                <div class="list-bar">{{item.playCount | formatCount}}</div>
                <img class="list-img img-response" :src="item.coverImgUrl + '?param=300y300'" lazy="loading">
                <div class="list-name">{{item.name}}</div>
                </router-link>
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
        </div>
    </div>
</template>
<script>
import api from '../api'
import Loading from '../components/common/Loading.vue'
export default {
  components: {
    Loading
  },
  data () {
    return {
      scroller: null,
      playList: [],
      offset: 0,
      loading: false
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    getData () {
      this.offset === 0 ? (this.loading = true) : ''
      api.getPlayListByWhere(this.offset, 6).then((data) => {
        var total = data.total
        var list = (data.playlists)
        for (let i = 0; i < list.length; i++) {
          this.playList.push(list[i])
        }
        this.offset = this.offset + 6
        if (this.offset > total) this.offset = total
        this.loading = false
      })
    },
    loadMore () {
      this.offset += 6
      this.getData()
    }
  },
  filters: {
    formatCount (v) {
      if (v < 100000) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/theme.less";
.img-response {
    max-width: 100%;
    height: auto;
}
.wrapper {
    width: 100%;
    padding:0 10px;
    height: 28rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.title {
    margin: .2rem 0 .3rem 0;
    padding-left: .2rem;
    border-left: .15rem solid @primaryColor;
}
.list {
    &-bar {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0,0,0,.2);
    }
    &-item {
        position: relative;
        margin: 0 5px 5px 10px;
        a {
          color:rgba(0,0,0,.87);
        }
    }
    &-img {
      width: 8rem;
      height: 8rem;
    }
    &-img[lazy=loading] {
      background: url('../../static/default_cover.png') no-repeat;
      background-size: cover;
    }

    &-name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
}
</style>
