/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-04-04 14:22:15
 */
import { createStore, createLogger } from 'vuex'
import { IStore, ISong } from '@/types'
import { shuffleArray } from '@/utils'
import { getItem, setItem } from '@/utils/storage'

export default createStore<IStore>({
  state: {
    isLoading: false,
    singerInfo: null,
    isPlaying: false,
    isFullScreen: false,
    playList: [],
    sequenceList: [],
    playMode: 'sequence',
    playingIndex: -1,
    searchHistory: []
  },
  mutations: {
    SET_IS_LOADING(state, isLoading: boolean) {
      state.isLoading = isLoading
    },
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
    },
    SET_PLAY_MODE(state, playMode: string) {
      state.playMode = playMode as any
    },
    SET_SEARCH_HISTORY(state, searchHistory: string[]) {
      state.searchHistory = searchHistory
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
      commit('SET_PLAY_MODE', 'sequence')
      commit('SET_SEQUENCE_LIST', payload.songList)
      commit('SET_PLAY_LIST', payload.songList)
      commit('SET_PLAYING_INDEX', payload.index)
      commit('SET_IS_FULL_SCREEN', true)
      commit('SET_IS_PLAYING', true)
    },
    dispatchPlayMode({ commit, state, getters }) {
      const playMode = ['sequence', 'loop', 'random']
      const currentModeIndex = playMode.indexOf(state.playMode as any)
      const nextMode = playMode[(currentModeIndex + 1) % 3]
      const playingSongId = getters.playingSong.id
      if (nextMode === 'random') {
        commit('SET_PLAY_LIST', shuffleArray(state.sequenceList))
      } else {
        commit('SET_PLAY_LIST', state.sequenceList)
      }
      const currentIndex = state.playList.findIndex((item) => item.id === playingSongId)
      commit('SET_PLAY_MODE', nextMode)
      commit('SET_PLAYING_INDEX', currentIndex)
    },
    dispatchRandomPlay({ commit }, songList: ISong[]) {
      commit('SET_PLAY_MODE', 'random')
      commit('SET_SEQUENCE_LIST', songList)
      commit('SET_PLAY_LIST', shuffleArray(songList))
      commit('SET_PLAYING_INDEX', 0)
      commit('SET_IS_FULL_SCREEN', true)
      commit('SET_IS_PLAYING', true)
    },
    dispatchInsertSong({ commit, state }, song: ISong) {
      const playList = state.sequenceList
      let playingIndex = state.playingIndex
      // 当前是否有播放列表
      if (playList.length) {
        const findIndex = playList.findIndex((item: ISong) => item.id === song.id)
        // 当前列表是否已经有待插入歌曲
        if (~findIndex) {
          playingIndex = findIndex
        } else {
          playList.splice(playingIndex + 1, 0, song)
          playingIndex++
        }
      } else {
        playList.push(song)
        playingIndex = 0
      }
      commit('SET_PLAY_MODE', 'sequence')
      commit('SET_SEQUENCE_LIST', playList)
      commit('SET_PLAY_LIST', playList)
      commit('SET_PLAYING_INDEX', playingIndex)
      commit('SET_IS_FULL_SCREEN', true)
      commit('SET_IS_PLAYING', true)
    },
    dispatchSaveSearchHistory({ commit }, name: string) {
      const searchList: string[] = getItem('searchHistory') || []
      const findIndex = searchList.indexOf(name)
      // 如果之前有该条搜索历史，删除后再添加到头部；如果超过十条记录，将最后一条记录删除
      if (~findIndex) searchList.splice(findIndex, 1)
      searchList.unshift(name)
      if (searchList.length > 10) searchList.pop()
      setItem('searchHistory', searchList)
      commit('SET_SEARCH_HISTORY', searchList)
    },
    dispatchDeleteSearchHistory({ commit }, name?: string) {
      let searchList: string[] = getItem('searchHistory') || []
      if (name) {
        const findIndex = searchList.indexOf(name)
        searchList.splice(findIndex, 1)
      } else {
        searchList = []
      }
      setItem('searchHistory', searchList)
      commit('SET_SEARCH_HISTORY', searchList)
    },
    dispatchDeleteSong({ commit, state }, song: ISong) {
      if (!song) {
        commit('SET_PLAYING_INDEX', -1)
        commit('SET_PLAY_LIST', [])
        commit('SET_SEQUENCE_LIST', [])
        commit('SET_IS_PLAYING', false)
        return
      }

      const playList = state.playList.slice()
      const sequenceList = state.sequenceList.slice()

      const findIndex = playList.findIndex((item) => song.id === item.id)
      playList.splice(findIndex, 1)
      sequenceList.splice(
        sequenceList.findIndex((item) => song.id === item.id),
        1
      )

      if (state.playingIndex > findIndex || state.playingIndex === playList.length) {
        commit('SET_PLAYING_INDEX', state.playingIndex - 1)
      }

      commit('SET_PLAY_LIST', playList)
      commit('SET_SEQUENCE_LIST', sequenceList)

      if (!playList.length) {
        commit('SET_IS_PLAYING', false)
      } else {
        commit('SET_IS_PLAYING', true)
      }
    }
  },
  modules: {},
  getters: {
    playingSong: (state) => state.playList[state.playingIndex]
  },
  plugins: [createLogger()]
})
