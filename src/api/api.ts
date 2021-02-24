/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:45:46
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 14:06:48
 */
enum Api {
  getBanner = '/banner',
  getRecommendList = '/personalized',
  getReccomendDetail = '/playlist/detail',
  getSingerList = '/top/artists',
  getSongList = '/artist/songs',
  checkSong = '/check/music',
  getSongUrl = '/song/url',
  getSongDetail = '/song/detail',
  getLyric = '/lyric'
}

export default Api
