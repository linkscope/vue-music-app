/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-24 15:54:37
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 16:27:10
 */
import { defineComponent, onMounted, reactive, Transition, ref, onActivated } from 'vue'
import { useRoute } from 'vue-router'

import { useDetailStyle } from './style'
import { getRecommendDetail } from '@/api/recommend'
import { getSongDetail } from '@/api/singer'
import { ISong } from '@/types'

import SongList from '@/components/SongList'

export default defineComponent({
  name: 'SingerDetail',
  setup() {
    const route = useRoute()
    const classesRef = useDetailStyle()
    const rankDetail = reactive<{
      coverImgUrl: string
      id: number
      description: string
      name: string
      trackIds: number[]
    }>({
      coverImgUrl: '',
      id: 0,
      description: '',
      name: '',
      trackIds: []
    })
    const rankSongList = ref<ISong[]>([])

    const getSong = async () => {
      const { playlist } = await getRecommendDetail(+route.params.id!)
      rankDetail.coverImgUrl = playlist.coverImgUrl
      rankDetail.id = playlist.id
      rankDetail.name = playlist.name
      rankDetail.trackIds = playlist.trackIds.map((item) => item.id)
      const { songs } = await getSongDetail(rankDetail.trackIds.toString())
      rankSongList.value = songs
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
            isRank
            title={rankDetail.name}
            bgImg={rankDetail.coverImgUrl}
            songList={rankSongList.value}
          />
        </Transition>
      )
    }
  }
})
