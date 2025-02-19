import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import api from '../api'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    audio: {
      id: 0,
      name: '歌曲名称',
      singer: '演唱者',
      albumPic: '/static/placeholder_disk_play_program.png',
      location: '',
      album: ''
    },
    lyric: '',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
    loading: false, // 是否正在加载中
    showBar: false,
    songList: [],    // 播放列表
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false   // 判断是更改的时间还是播放的时间
  },
  getters: {
    audio: state => state.audio,
    playing: state => state.playing,
    loading: state => state.loading,
    showBar: state => state.showBar,
    durationTime: state => state.durationTime,
    currentIndex: state => state.currentIndex,
    bufferedTime: state => state.bufferedTime,
    tmpCurrentTime: state => state.tmpCurrentTime,
    songList: state => state.songList,
    change: state => state.change,
    currentTime: state => state.currentTime,
    prCurrentTime: state => {
      return state.currentTime / state.durationTime * 100
    },
    prBufferedTime: state => {
      return state.bufferedTime / state.durationTime * 100
    }
  },
  mutations: {
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    toggleDetail (state) {
      state.showDetail = !state.showDetail
    },
    setAudio (state) {
      state.audio = state.songList[state.currentIndex - 1]
    },
    setAudioIndex (state, index) {
      state.audio = state.songList[index]
      state.currentIndex = index + 1
    },
    removeAudio (state, index) {
      state.songList.splice(index, 1)
      if (index === state.songList.length) {
        index--
      }
      state.audio = state.songList[index]
      state.currentIndex = index + 1
      if (state.songList.length === 0) {
        state.audio = {
          'id': 0,
          'name': '歌曲名称',
          'singer': '演唱者',
          'albumPic': '/static/player-bar.png',
          'location': '',
          'album': ''
        }
        state.playing = false
      }
    },
    setChange (state, flag) {
      state.change = flag
    },
    setLocation (state, location) {
      state.audio.location = location
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDurationTime (state, time) {
      state.durationTime = time
    },
    updateBufferedTime (state, time) {
      state.bufferedTime = time
    },
    changeTime (state, time) {
      state.tmpCurrentTime = time
    },
    openLoading (state) {
      state.loading = true
    },
    closeLoading (state) {
      state.loading = false
    },
    resetAudio (state) {
      state.currentTime = 0
    },
    playNext (state) { // 播放下一曲
      state.currentIndex++
      if (state.currentIndex > state.songList.length) {
        state.currentIndex = 1
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    playPrev (state) { // 播放上一曲
      state.currentIndex--
      if (state.currentIndex < 1) {
        state.currentIndex = state.songList.length
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    addToList (state, songs) {
      var items = songs.slice()
      items.forEach(item => {
        var flag = false
        state.songList.forEach((element, index) => { // 检测歌曲重复
          if (element.id === item.id) {
            flag = true
            state.currentIndex = index + 1
          }
        })
        if (!flag) {
          state.songList.push(item)
          state.currentIndex = state.songList.length
        }
      })
      console.log(state.songList, state.currentIndex)
    },
    setLrc (state, lrc) {
      state.lyric = lrc
    },
    setBar (state, payload) {
      state.showBar = payload
    }
  },
  // 异步的数据操作
  actions: {
    getSong ({commit, state}, id) {
      // 使用 CancelToken 退出一个Axios事件
      var CancelToken = Axios.CancelToken
      var source = CancelToken.source()
      if (state.loading && state.songList.length > 0) {
        console.log('cancel')
        source.cancel()
      }
      commit('openLoading')
      Promise.all([api.getSongDetail(id), api.getSongUrl(id)]).then(data => {
        // 统一数据模型，方便后台接口的改变
        console.log(data)
        let playAudio = []
        data[0].songs.forEach((item, index) => {
          let location = ''
          for (let i = 0; i < data[1].data.length; i++) {
            if (data[1].data[i].id === item.id) {
              location = data[1].data[i].url
              break
            }
          }
          playAudio.push({
            id: item.id,
            name: item.name,
            singer: item.ar[0].name,
            albumPic: item.al.picUrl,
            location,
            album: item.al.name
          })
        })
        commit('addToList', playAudio)
        commit('setAudio')
        commit('setBar', true)
      })
      .catch((error) => {     // 错误处理
        console.log(error)
        Vue.toast('获取歌曲信息出错！', {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      })
    }
  }
})
export default store
