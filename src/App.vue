<template>
  <div>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <Player v-if="songList.length > 0"></Player>
  </div>
</template>
<script>
  import Player from './components/playerBar'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    components: {
      Player
    },
    created () {
      this.$store.dispatch('getSong', 347230)
    },
    computed: {
      ...mapState([
        'songList',
        'showDetail'
      ])
    }
  }
</script>
