import { defineComponent, Fragment, watch, ref } from 'vue'
import { useStore } from 'vuex'

import { IStore, ISong } from '@/types'
import useStyle from './style'
import { checkSong, getSongUrl, getSongDetail } from '@/api/singer'

import Icon from '@/components/Icon'

/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-19 09:41:23
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-19 15:24:14
 */
export default defineComponent({
  name: 'Player',
  setup() {
    const store = useStore<IStore>()
    const classesRef = useStyle()
    const songRef = ref<ISong | null>(null)

    const getSong = async (id: number) => {
      const { success } = await checkSong(id)
      if (success) {
        const music = await getSongUrl(id)
        const { songs } = await getSongDetail(id.toString())
        songRef.value = songs[0]
        console.log(music)
      }
    }

    const getSongDesc = (song: ISong) => {
      const artists: string[] = []
      song.ar.forEach((item) => artists.push(item.name))
      return artists.join('/')
    }

    watch(
      () => store.getters.playingSong,
      (value: ISong) => {
        getSong(value.id)
      }
    )

    return () => {
      const classes = classesRef.value
      const playList = store.state.playList
      const isFullScreen = store.state.isFullScreen
      const song = songRef.value
      return playList.length ? (
        <Fragment>
          <div v-show={isFullScreen} class={classes.normalContainer}>
            <img class={classes.background} src={song?.al.picUrl} alt="" />
            <div class={classes.header}>
              <div
                class={classes.headerBack}
                onClick={() => store.commit('SET_IS_FULL_SCREEN', false)}
              >
                <Icon icon="fanhui" />
              </div>
              <div class={classes.headerTitle}>{song?.name}</div>
              <div class={classes.headerSubTitle}>{song && getSongDesc(song)}</div>
            </div>
            <div class={classes.content}>
              <div class={classes.contentLeft}>
                <div class={classes.contentAlbumWrapper}>
                  <div class={classes.contentAlbum}>
                    <img class={classes.albumImg} src={song?.al.picUrl} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show={!isFullScreen} class={classes.miniContainer}>
            <img
              class={classes.miniAlbumImg}
              src={song?.al.picUrl}
              alt=""
              onClick={() => store.commit('SET_IS_FULL_SCREEN', true)}
            />
            <div class={classes.miniDesc}>
              <h2>{song?.name}</h2>
              <p>{song && getSongDesc(song)}</p>
            </div>
          </div>
        </Fragment>
      ) : (
        ''
      )
    }
  }
})
