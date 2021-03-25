/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:29:27
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-25 16:47:06
 */
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { ISong, IStore } from '@/types'
import store from '@/store'
import { getItem } from '@/utils/storage'
import useStyle from './style'
import {
  getHotKeyList,
  searchSuggest,
  searchSuggestType,
  searchType,
  search,
  searchSongs
} from '@/api/search'
import userPlayerListHeight from '@/hooks/usePlayListHeight'

import Search from './components/Search'
import SuggestList from './components/SuggestList'
import MatchList from './components/MatchList'
import ScrollView from '@/components/ScrollView'
import SongListItem from '@/components/SongList/SongListItem'
import Icon from '@/components/Icon'
import SearchHistoryList from './components/SearchHistoryList'
import { Dialog } from 'vant'

let T = 0

export type searchSuggestListType = {
  id: number
  name: string
  icon: string
}[]

export type searchMatchingType = {
  id: number
  name: string
  picUrl: string
  description?: string
}

export default defineComponent({
  name: 'Search',
  beforeRouteEnter(to, from, next) {
    // 进入页面时提前将searchList存入store中
    const searchList: string[] = getItem('searchHistory') || []
    store.commit('SET_SEARCH_HISTORY', searchList)
    next()
  },
  setup() {
    const classesRef = useStyle()
    const router = useRouter()
    const store = useStore<IStore>()
    const searchValue = ref('')
    const isFocus = ref(false)
    const hotKeyListRef = ref<
      {
        first: string
      }[]
    >([])
    const suggestSearchList = ref<searchSuggestListType>([])
    const matchSearchList = ref<searchMatchingType[]>([])
    const songList = ref<ISong[]>([])
    const searchSongCount = ref(0)
    const containerInstance = ref<HTMLDivElement | null>(null)
    const scrollViewInstance = ref()
    const searchInstance = ref()
    const searchList = computed(() => store.state.searchHistory)

    userPlayerListHeight((playList) => {
      const bottom = playList.length > 0 ? '60px' : ''
      containerInstance.value!.style.bottom = bottom
      scrollViewInstance.value!.onRefresh()
    })

    const normalizeSuggestSearch = (result: searchSuggestType) => {
      const newList: searchSuggestListType = []
      result.order.map((key) => {
        //@ts-ignore
        result[key]!.map((item: any) =>
          newList.push({
            id: item.id,
            name: item.name,
            icon: key
          })
        )
      })
      return newList
    }

    const normalizeMatchList = (result: searchType) => {
      const matchList: searchMatchingType[] = []
      result.orders.map((item) => {
        switch (item) {
          case 'artist':
            result.artist!.map((artist) =>
              matchList.push({
                id: artist.id,
                picUrl: artist.img1v1Url,
                name: '歌手: ' + artist.name
              })
            )
            break
          case 'album':
            result.album!.map((album) =>
              matchList.push({
                id: album.id,
                name: '专辑: ' + album.name,
                picUrl: album.picUrl,
                description: album.artist.name
              })
            )
            break
          case 'playlist':
            result.playlist!.map((playList) =>
              matchList.push({
                id: playList.id,
                name: '歌单: ' + playList.name,
                picUrl: playList.coverImgUrl,
                description: playList.description
              })
            )
            break
        }
      })
      return matchList
    }

    const onSearch = async (name: string) => {
      store.dispatch('dispatchSaveSearchHistory', name)
      const { result } = await search(name)
      matchSearchList.value = normalizeMatchList(result)
      const { result: songResult } = await searchSongs(name)
      songList.value = songResult.songs
      searchSongCount.value = songResult.songCount
    }

    const onPullUp = async () => {
      if (songList.value.length < searchSongCount.value) {
        const { result } = await searchSongs(searchValue.value, songList.value.length)
        songList.value = songList.value.concat(result.songs)
      }
    }

    const goMatchDetail = (match: searchMatchingType) => {
      if (match.name.startsWith('歌手')) {
        router.push(`/singer/detail/${match.id}`)
        store.commit('SET_SINGER_INFO', {
          id: match.id,
          title: match.name.substr(3),
          avatar: match.picUrl
        })
      } else if (match.name.startsWith('歌单')) {
        router.push({
          path: `/recommend/detail/${match.id}`
        })
      } else {
        router.push({
          path: `/album/${match.id}`
        })
      }
    }

    onMounted(async () => {
      const { result } = await getHotKeyList()
      hotKeyListRef.value = result.hots
    })

    watch(searchValue, (value) => {
      if (!value) {
        clearTimeout(T)
        suggestSearchList.value = []
        matchSearchList.value = []
        songList.value = []
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

    return () => {
      const classes = classesRef.value
      const hotKeyList = hotKeyListRef.value
      return (
        <>
          <div class={classes.searchContainer}>
            <Search
              ref={searchInstance}
              v-model={searchValue.value}
              onEnter={() => {
                searchInstance.value.inputInstance.blur()
                isFocus.value = false
                onSearch(searchValue.value)
              }}
              onFocus={() => (isFocus.value = true)}
            />
          </div>
          <div ref={containerInstance} class={classes.container}>
            <SuggestList
              v-show={isFocus.value && suggestSearchList.value.length}
              suggestList={suggestSearchList.value}
              onClick={(name) => {
                searchValue.value = name
                isFocus.value = false
                onSearch(name)
              }}
            />
            <ScrollView
              ref={scrollViewInstance}
              v-show={songList.value.length}
              class={classes.searchListContainer}
              data={songList.value}
              listenScroll
              onPullUp={onPullUp}
            >
              <div>
                <MatchList matchList={matchSearchList.value} onClick={goMatchDetail} />
                <ul style="padding-left: 10px">
                  {songList.value.map((song, index) => (
                    <SongListItem
                      key={song.id}
                      song={song}
                      index={index}
                      onSelectSong={() => store.dispatch('dispatchInsertSong', song)}
                    />
                  ))}
                </ul>
              </div>
            </ScrollView>
            <div class={classes.hotKeyContainer}>
              <h1 class={classes.hotKeyTitle}>热门搜索</h1>
              <ul>
                {hotKeyList.map((item, index) => (
                  <li
                    key={index}
                    class={classes.hotKeyItem}
                    onClick={() => {
                      searchInstance.value.inputInstance.blur()
                      isFocus.value = false
                      searchValue.value = item.first
                      onSearch(searchValue.value)
                    }}
                  >
                    {item.first}
                  </li>
                ))}
              </ul>
            </div>
            <div v-show={searchList.value.length} class={classes.searchHistoryContainer}>
              <h1 class={classes.searchHistoryTitle}>
                <span class="text">搜索历史</span>
                <div
                  class="delete"
                  onClick={() =>
                    Dialog.confirm({
                      title: '确认清空历史搜索记录？',
                      theme: 'round-button'
                    }).then(() => {
                      store.dispatch('dispatchDeleteSearchHistory')
                    })
                  }
                >
                  <Icon color="#222" icon="shanchu" />
                </div>
              </h1>
              <SearchHistoryList
                searchList={searchList.value}
                onClick={(name) => {
                  searchInstance.value.inputInstance.blur()
                  isFocus.value = false
                  searchValue.value = name
                  onSearch(searchValue.value)
                }}
                onDelete={(name) => store.dispatch('dispatchDeleteSearchHistory', name)}
              />
            </div>
          </div>
        </>
      )
    }
  }
})
