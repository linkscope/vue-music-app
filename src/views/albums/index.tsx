/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-11 11:30:56
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-11 11:49:21
 */
import { defineComponent, onMounted, Transition, ref, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { createUseStyles } from 'vue-jss'

import { getAlbum } from '@/api/search'
import { ISong, IAlbum } from '@/types'

import SongList from '@/components/SongList'

const useStyle = createUseStyles({
  slideActive: {
    transition: 'all 0.3s'
  },
  slideTo: {
    transform: 'translate3d(100%, 0, 0)'
  }
})

export default defineComponent({
  name: 'SingerDetail',
  setup() {
    const route = useRoute()
    const classesRef = useStyle()
    const album = ref<IAlbum>({
      name: '',
      id: -1,
      picUrl: '',
      artist: {
        id: -1,
        name: '',
        img1v1Url: ''
      }
    })
    const songList = ref<ISong[]>([])
    const loading = ref(false)

    const getSong = async () => {
      loading.value = true
      try {
        const result = await getAlbum(+route.params.id!)
        album.value = result.album
        songList.value = result.songs
        loading.value = false
      } catch {
        loading.value = false
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
            title={album.value.name}
            bgImg={album.value.picUrl}
            songList={songList.value}
          />
        </Transition>
      )
    }
  }
})
