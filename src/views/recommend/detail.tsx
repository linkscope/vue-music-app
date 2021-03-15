/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-24 13:57:10
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 14:25:35
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
    const recommendDetail = reactive<{
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
    const recommendSongList = ref<ISong[]>([])

    const getSong = async () => {
      const { playlist } = await getRecommendDetail(+route.params.id!)
      recommendDetail.coverImgUrl = playlist.coverImgUrl
      recommendDetail.id = playlist.id
      recommendDetail.name = playlist.name
      recommendDetail.trackIds = playlist.trackIds.map((item) => item.id)
      const { songs } = await getSongDetail(recommendDetail.trackIds.toString())
      recommendSongList.value = songs
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
            title={recommendDetail.name}
            bgImg={recommendDetail.coverImgUrl}
            songList={recommendSongList.value}
          />
        </Transition>
      )
    }
  }
})
