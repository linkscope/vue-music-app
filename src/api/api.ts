/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:45:46
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-11 11:34:57
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
  getLyric = '/lyric',
  getTopList = '/toplist',
  getHotKeyList = '/search/hot',
  searchSuggest = '/search/suggest',
  search = '/search/multimatch',
  searchSongs = '/cloudsearch',
  getAlbums = '/album'
}

export default Api
