import { computed, defineComponent, onMounted, reactive, Transition, ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { useDetailStyle } from './style'
import { getSongList } from '@/api/singer'
import { IStore, ISong } from '@/types'

import SongList from '@/components/SongList'
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-03 10:20:12
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 11:18:53
 */
export default defineComponent({
  name: 'SingerDetail',
  setup() {
    const store = useStore<IStore>()
    const router = useRouter()
    const classesRef = useDetailStyle()
    const singerInfo = computed(() => store.state.singerInfo)
    const songInfo = reactive<{
      songList: ISong[]
      total: number
    }>({
      songList: [],
      total: 0
    })
    const loading = ref(false)

    const getSong = async () => {
      if (!store.state.singerInfo) {
        router.back()
        return
      }
      loading.value = true
      try {
        const { songs, total } = await getSongList(singerInfo.value!.id)
        songInfo.songList = songs
        songInfo.total = total
        loading.value = false
      } catch {
        loading.value = false
      }
    }

    const onPullUp = async () => {
      const { songList, total } = songInfo
      if (songList.length < total) {
        loading.value = true
        try {
          const { songs } = await getSongList(singerInfo.value!.id, songList.length + 1)
          songInfo.songList = songList.concat(songs)
          loading.value = false
        } catch {
          loading.value = false
        }
      }
    }

    onMounted(() => getSong())

    onActivated(() => getSong())

    return () => {
      const classes = classesRef.value
      return (
        <Transition
          enterActiveClass={classes.slideActive}
          leaveActiveClass={classes.slideActive}
          enterFromClass={classes.slideTo}
          leaveToClass={classes.slideTo}
        >
          <SongList
            loading={loading.value}
            title={singerInfo.value?.title || ''}
            bgImg={singerInfo.value?.avatar || ''}
            songList={songInfo.songList}
            onPullUp={onPullUp}
          />
        </Transition>
      )
    }
  }
})
