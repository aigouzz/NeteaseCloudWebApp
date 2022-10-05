import { getRequest } from '../utils/axios'
export default {
  /**
   * 获取首页Banner图片数据
   */
  getBannerList () {
    return getRequest(`/banner`)
  },
  /**
   * 获取推荐歌单
   */
  getPersonalized () {
    return getRequest(`/personalized`)
  },
  /**
   * 获取推荐 mv
   */
  getPersonalizedMV () {
    return getRequest(`/personalized/mv`)
  },
  /**
   *
   * @param {*} cat
   * @param {*} order
   * @param {*} offset
   * @param {*} total
   * @param {*} limit
   */
  getPlayListByWhere (offset, limit) {
    return getRequest(`/top/playlist?limit=${limit}&order=all&offset=${offset}`)
  },
  /**
   * 获取歌词API
   * @param {Number} id
   */
  getLrc (id) {
    return getRequest(`/lyric?id=${id}`)
  },
  /**
   * 获取歌曲详情
   * @param {Number} id
   */
  getSongDetail (id) {
    return getRequest(`/song/detail?ids=${id}`)
  },
  /**
   * 获取歌曲url
   * @param {Number} id
   */
  getSongUrl (id) {
    return getRequest(`/song/url?id=${id}`)
  },
  /**
   * 获取歌单详情
   * @param {Number} id
   */
  getPlayListDetail (id) {
    return getRequest(`/playlist/detail?id=${id}`)
  },
  getMv (id) {
    return getRequest('/mv?mvid=' + id)
  },
  search (words) {
    return getRequest(`/search?keywords=${words}`)
  }
}
