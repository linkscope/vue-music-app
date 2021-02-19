import { defineComponent, Fragment, watch, ref, Transition, computed } from 'vue'
import { useStore } from 'vuex'
import animations from 'create-keyframe-animation'

import { IStore, ISong } from '@/types'
import useStyle from './style'
import { checkSong, getSongUrl, getSongDetail } from '@/api/singer'
import { transformStyle } from '@/utils'

import Icon from '@/components/Icon'

/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-19 09:41:23
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-19 15:49:54
 */
export default defineComponent({
  name: 'Player',
  setup() {
    const store = useStore<IStore>()
    const classesRef = useStyle()
    const albumWrapperInstance = ref<HTMLDivElement | null>(null)
    const songRef = ref<ISong | null>(null)
    const offsetPosition = computed(() => {
      const normalAlbumImgWidth = window.innerWidth * 0.8
      // 屏幕宽度的一半减去mini播放器的左边距20+圆半径15
      const x = -(window.innerWidth / 2 - 35)
      // 屏幕高度减去header部分和底部高度一半，在减去全屏播放器的一半高度
      const y = window.innerHeight - 110 - normalAlbumImgWidth
      return {
        x,
        y
      }
    })
    const offsetScale = computed(() => {
      const normalAlbumImgWidth = window.innerWidth * 0.8
      return 35 / normalAlbumImgWidth
    })

    // 校验音乐是否可用；获取音乐专辑封面和url播放路径
    const getSong = async (id: number) => {
      const { success } = await checkSong(id)
      if (success) {
        const music = await getSongUrl(id)
        const { songs } = await getSongDetail(id.toString())
        songRef.value = songs[0]
        console.log(music)
      }
    }

    // 音乐的歌手拼接
    const getSongDesc = (song: ISong) => {
      const artists: string[] = []
      song.ar.forEach((item) => artists.push(item.name))
      return artists.join('/')
    }

    /**
     * 动画钩子组合
     */
    const onEnter = (el: Element, done: () => void) => {
      const { x, y } = offsetPosition.value
      // 制作动画关键帧 然后放入第三方类库即可
      const animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${offsetScale.value})`
        },
        60: {
          transform: 'translate3d(0, 0, 0) scale(1.1)'
        },
        100: {
          transform: 'translate3d(0, 0, 0) scale(1)'
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(albumWrapperInstance.value!, 'move', done)
    }
    const onAfterEnter = () => {
      // 回收动画
      animations.unregisterAnimation('move')
      albumWrapperInstance.value!.style.animation = ''
    }
    const onLeave = (el: Element, done: () => void) => {
      const { x, y } = offsetPosition.value
      albumWrapperInstance.value!.style.transition = 'all 0.4s'
      albumWrapperInstance.value!.style[
        transformStyle('transform') as any
      ] = `translate3d(${x}px, ${y}px, 0) scale(${offsetScale.value})`
      albumWrapperInstance.value!.addEventListener('transitionend', done)
    }
    const onAfterLeave = () => {
      // 回收动画
      albumWrapperInstance.value!.style.transition = ''
      albumWrapperInstance.value!.style[transformStyle('transform') as any] = ''
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
      return (
        <Fragment>
          <Transition
            enterActiveClass={classes.normalEnterActive}
            leaveActiveClass={classes.normalEnterActive}
            enterFromClass={classes.normalEnter}
            leaveToClass={classes.normalEnter}
            onEnter={onEnter}
            onAfterEnter={onAfterEnter}
            onLeave={onLeave}
            onAfterLeave={onAfterLeave}
          >
            <div v-show={playList.length && isFullScreen} class={classes.normalContainer}>
              <img class={classes.background} src={song?.al.picUrl} alt="" />
              <div class="header">
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
                  <div ref={albumWrapperInstance} class={classes.contentAlbumWrapper}>
                    <div class={classes.contentAlbum}>
                      <img class={classes.albumImg} src={song?.al.picUrl} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <Transition
            enterActiveClass={classes.miniEnterActive}
            leaveActiveClass={classes.miniEnterActive}
            enterFromClass={classes.miniEnter}
            leaveToClass={classes.miniEnter}
          >
            <div v-show={playList.length && !isFullScreen} class={classes.miniContainer}>
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
          </Transition>
        </Fragment>
      )
    }
  }
})
