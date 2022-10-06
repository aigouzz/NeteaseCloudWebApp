<template>
  <div>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <Player v-show="showBar"></Player>
  </div>
</template>
<script>
  import Player from './components/playerBar/playerBar'
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
      this.$store.dispatch('getSong', 386538)  // 知足 - 五月天
    },
    computed: {
      ...mapState([
        'showBar',
        'audio'
      ])
    }
  }
</script>
