/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-04-04 14:38:01
 * @LastEditors: linkscope
 * @LastEditTime: 2021-04-05 12:30:08
 */
import { computed, defineComponent, PropType, Transition, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { createUseStyles } from 'vue-jss'

import { Color, Font } from '@/assets/variables'
import { searchSongs, searchSuggest, searchSuggestType } from '@/api/search'
import { searchSuggestListType } from '@/views/search'
import { ISong, IStore } from '@/types'
import { getItem } from '@/utils/storage'

import Icon from '@/components/Icon'
import Search from '@/views/search/components/Search'
import SuggestList from '@/views/search/components/SuggestList'
import SongListItem from '@/components/SongList/SongListItem'
import ScrollView from '@/components/ScrollView'
import { Toast } from 'vant'
import Radio from '@/components/Radio'
import SearchHistoryList from '@/views/search/components/SearchHistoryList'

const useStyle = createUseStyles({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 200,
    backgroundColor: Color.$white
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 44
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Font['$font-size-medium'],
    color: Color['$color-text-dark']
  },
  headerCloseIcon: {
    flex: '0 0 30px',
    fontSize: Font['$font-size-medium'],
    padding: 14
  },
  searchListContainer: {
    position: 'fixed',
    top: 104,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Color.$white,
    zIndex: 300
  },
  transitionActive: {
    transition: 'all 0.3s'
  },
  transitionEnter: {
    transform: 'translate3d(100%, 0, 0)'
  }
})

let T = 0
const radios = ['最近播放', '搜索历史']

export default defineComponent({
  name: 'PlayerSongAdjunction',
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props, { emit }) {
    const classesRef = useStyle()
    const store = useStore<IStore>()
    const searchValue = ref('')
    const isFocus = ref(false)
    const suggestSearchList = ref<searchSuggestListType>([])
    const searchList = ref<ISong[]>([])
    const searchSongCount = ref(0)
    const currentIndex = ref(0)
    const searchInstance = ref()
    const playHistoryScrollViewInstance = ref()
    const picker = computed({
      get: () => props.modelValue || false,
      set: (value) => emit('update:modelValue', value)
    })
    const playHistory = computed(() => store.state.playHistory)
    const searchHistory = computed(() => store.state.searchHistory)

    const normalizeSuggestSearch = (result: searchSuggestType) => {
      return (
        result.songs?.map((song) => ({
          id: song.id,
          name: `${song.name} - ${song.artists[0].name}`,
          icon: 'songs'
        })) || []
      )
    }

    const onSearch = async (name: string) => {
      store.dispatch('dispatchSaveSearchHistory', name)
      const { result: songResult } = await searchSongs(name)
      searchList.value = songResult.songs
      searchSongCount.value = songResult.songCount
    }

    const onPullUp = async () => {
      if (searchList.value.length < searchSongCount.value) {
        const { result } = await searchSongs(searchValue.value, searchList.value.length)
        searchList.value = searchList.value.concat(result.songs)
      }
    }

    const addSong = async (song: ISong) => {
      store.dispatch('dispatchAddSong', song)
      Toast.success('添加成功')
    }

    onMounted(() => {
      const playHistory = getItem('playHistory') || []
      const searchHistory = getItem('searchHistory') || []
      store.commit('SET_SEARCH_HISTORY', searchHistory)
      store.commit('SET_PLAY_HISTORY', playHistory)
    })

    watch(searchValue, (value) => {
      if (!value) {
        clearTimeout(T)
        suggestSearchList.value = []
        searchList.value = []
        return
      }
      if (!isFocus.value) return
      if (T) {
        clearTimeout(T)
      }
      T = setTimeout(async () => {
        const { result } = await searchSuggest(value)
        suggestSearchList.value = normalizeSuggestSearch(result)
      }, 500)
    })

    watch(picker, (value) => {
      if (value) {
        setTimeout(() => {
          playHistoryScrollViewInstance.value.onRefresh()
        }, 20)
      }
    })

    return () => {
      const classes = classesRef.value
      return (
        <Transition
          enterActiveClass={classes.transitionActive}
          leaveActiveClass={classes.transitionActive}
          enterFromClass={classes.transitionEnter}
          leaveToClass={classes.transitionEnter}
        >
          <div v-show={picker.value} class={classes.container}>
            <div class={classes.header}>
              <h1 class={classes.headerTitle}>添加歌曲到列表</h1>
              <div onClick={() => (picker.value = false)}>
                <Icon class={classes.headerCloseIcon} icon="guanbi" color="#222" />
              </div>
            </div>
            <div style="margin: 20px">
              <Search
                ref={searchInstance}
                v-model={searchValue.value}
                placeholder="搜索歌曲"
                onEnter={() => {
                  searchInstance.value.inputInstance.blur()
                  isFocus.value = false
                  onSearch(searchValue.value)
                }}
                onFocus={() => (isFocus.value = true)}
              />
            </div>
            <Radio v-model={currentIndex.value} radios={radios} />
            <ScrollView
              ref={playHistoryScrollViewInstance}
              v-show={currentIndex.value === 0}
              data={playHistory.value}
              style="height: calc(100% - 154px); overflow: hidden"
            >
              <ul style="padding: 20px 30px; background-color: #fff">
                {playHistory.value.map((song, index) => (
                  <SongListItem
                    key={song.id}
                    onSelectSong={() => addSong(song)}
                    index={index}
                    song={song}
                  />
                ))}
              </ul>
            </ScrollView>
            <SearchHistoryList
              v-show={currentIndex.value === 1}
              style="padding: 20px 30px"
              searchList={searchHistory.value}
              onClick={(name) => {
                searchInstance.value.inputInstance.blur()
                isFocus.value = false
                searchValue.value = name
                onSearch(searchValue.value)
              }}
              onDelete={(name) => store.dispatch('dispatchDeleteSearchHistory', name)}
            />
            <SuggestList
              v-show={isFocus.value && suggestSearchList.value.length}
              suggestList={suggestSearchList.value}
              class={classes.searchListContainer}
              onClick={(name) => {
                name = name.split(' - ')[0]
                searchValue.value = name
                isFocus.value = false
                onSearch(name)
              }}
            />
            <ScrollView
              v-show={!isFocus.value && searchList.value.length}
              class={classes.searchListContainer}
              data={searchList.value}
              listenScroll
              onPullUp={onPullUp}
            >
              <ul style="padding-left: 10px">
                {searchList.value.map((song, index) => (
                  <SongListItem
                    key={song.id}
                    song={song}
                    index={index}
                    onSelectSong={() => {
                      searchValue.value = ''
                      addSong(song)
                    }}
                  />
                ))}
              </ul>
            </ScrollView>
          </div>
        </Transition>
      )
    }
  }
})
