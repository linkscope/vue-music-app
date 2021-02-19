/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-19 10:10:26
 */
import { createStore, createLogger } from 'vuex'
import { IStore, ISong } from '@/types'

export default createStore<IStore>({
  state: {
    singerInfo: null,
    isPlaying: false,
    isFullScreen: false,
    playList: [],
    sequenceList: [],
    playMode: 'sequence',
    playingIndex: -1
  },
  mutations: {
    SET_SINGER_INFO(
      state,
      singerInfo: {
        id: number
        title: string
        avatar: string
      }
    ) {
      state.singerInfo = singerInfo
    },
    SET_SEQUENCE_LIST(state, sequenceList: ISong[]) {
      state.sequenceList = sequenceList
    },
    SET_PLAY_LIST(state, playList: ISong[]) {
      state.playList = playList
    },
    SET_PLAYING_INDEX(state, playingIndex: number) {
      state.playingIndex = playingIndex
    },
    SET_IS_FULL_SCREEN(state, isFullScreen: boolean) {
      state.isFullScreen = isFullScreen
    },
    SET_IS_PLAYING(state, isPlaying: boolean) {
      state.isPlaying = isPlaying
    }
  },
  actions: {
    dispatchSelectSong(
      { commit },
      payload: {
        songList: ISong[]
        index: number
      }
    ) {
      commit('SET_SEQUENCE_LIST', payload.songList)
      commit('SET_PLAY_LIST', payload.songList)
      commit('SET_PLAYING_INDEX', payload.index)
      commit('SET_IS_FULL_SCREEN', true)
      commit('SET_IS_PLAYING', true)
    }
  },
  modules: {},
  getters: {
    playingSong: (state) => state.playList[state.playingIndex]
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createLogger()]
})
