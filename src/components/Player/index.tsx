import { defineComponent, Fragment, watch, ref, Transition, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import animations from 'create-keyframe-animation'
import lyricParser from '@/utils/lyricParser'

import { IStore, ISong } from '@/types'
import useStyle from './style'
import { checkSong, getSongUrl, getSongDetail, getLyric } from '@/api/singer'
import { transformStyle } from '@/utils'

import Icon from '@/components/Icon'
import ScrollView from '@/components/ScrollView'
import ProgressBar from './ProgressBar'
import ProgressCircle from './ProgressCircle'
import PlayList from './components/PlayList'

// 默认播放顺序为下一首
let isNext = true
// 是否可以播放音乐
let songReady = false
// 滑动的信息
const touchInfo = {
  initiated: false,
  startX: 0,
  startY: 0,
  percent: 0
}
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
    const albumContainerInstance = ref<HTMLDivElement | null>(null)
    const albumWrapperInstance = ref<HTMLDivElement | null>(null)
    const audioInstance = ref<HTMLAudioElement | null>(null)
    const albumInstance = ref<HTMLDivElement | null>(null)
    const miniAlbumInstance = ref<HTMLDivElement | null>(null)
    const lyricContainerInstance = ref()
    const lyricLineInstance = ref<HTMLDivElement | null>(null)
    const songRef = ref<ISong | null>(null)
    const songUrlRef = ref('')
    const currentTime = ref(0)
    const durationTime = ref(0)
    const lyricRef = ref<lyricParser | null>(null)
    const currentLineLyric = ref(0)
    const currentPlayLyric = ref('')
    const currentPage = ref('cd')
    const playListPicker = ref(false)
    const percent = computed(() => currentTime.value / durationTime.value)
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

    const onNext = () => {
      if (!songReady) return
      let index = store.state.playingIndex + 1
      if (index === store.state.playList.length) {
        index = 0
      }
      isNext = true
      store.commit('SET_PLAYING_INDEX', index)
      store.commit('SET_IS_PLAYING', true)
      songReady = true
    }

    const onPrevious = () => {
      if (!songReady) return
      // 边界处理
      if (store.state.playList.length === 1) {
        audioInstance.value!.currentTime = 0
        audioInstance.value!.play()
        lyricRef.value?.seek(0)
      } else {
        let index = store.state.playingIndex - 1
        if (!~index) {
          index = store.state.playList.length - 1
        }
        isNext = false
        store.commit('SET_PLAYING_INDEX', index)
        store.commit('SET_IS_PLAYING', true)
        songReady = true
      }
    }

    const onEnded = () => {
      if (store.state.playMode === 'loop' || store.state.playList.length === 1) {
        audioInstance.value!.currentTime = 0
        audioInstance.value!.play()
        lyricRef.value?.seek(0)
      } else {
        onNext()
      }
    }

    // 校验音乐是否可用；获取音乐专辑封面和url播放路径
    const getSong = async (song: ISong, isNext = true) => {
      try {
        await checkSong(song.id)
        const { data } = await getSongUrl(song.id)
        const { songs } = await getSongDetail(song.id.toString())
        const { lrc, nolyric } = await getLyric(song.id)
        // 切换歌曲时把之前的歌词计时器关闭 防止出现抖动现象
        lyricRef.value?.stop()
        if (!nolyric) {
          lyricRef.value = new lyricParser(lrc.lyric, ({ lineNum, txt }) => {
            currentLineLyric.value = lineNum
            currentPlayLyric.value = txt
            if (lineNum > 5) {
              const lineInstance = lyricLineInstance.value!.children[lineNum - 5]
              lyricContainerInstance.value!.scrollToElement(lineInstance, 1000)
            } else {
              lyricContainerInstance.value!.scrollTo(0, 0, 1000)
            }
          })
          if (store.state.isPlaying) {
            lyricRef.value.play()
          }
        } else {
          currentLineLyric.value = -1
          currentPlayLyric.value = '纯音乐，暂无歌词'
          lyricRef.value = new lyricParser('纯音乐，暂无歌词')
        }
        songRef.value = songs[0]
        songUrlRef.value = data[0].url
        store.dispatch('dispatchSavePlayHistory', song)
      } catch {
        isNext ? onNext() : onPrevious()
      }
    }

    // 音乐的歌手拼接
    const getSongDesc = (song: ISong) => {
      const artists: string[] = []
      song.ar.forEach((item) => artists.push(item.name))
      return artists.join('/')
    }

    const formatTime = (interval: number) => {
      interval = interval | 0
      const minute = (interval / 60) | 0
      const second = interval % 60
      return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
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
      albumWrapperInstance.value!.style.transition = ''
      albumWrapperInstance.value!.style[transformStyle('transform') as any] = ''
    }
    const onLeave = (el: Element, done: () => void) => {
      const { x, y } = offsetPosition.value
      albumWrapperInstance.value!.style.transition = 'all 0.4s'
      albumWrapperInstance.value!.style[
        transformStyle('transform') as any
      ] = `translate3d(${x}px, ${y}px, 0) scale(${offsetScale.value})`
      albumWrapperInstance.value!.addEventListener('transitionend', done)
    }

    const onTouchStart = (event: TouchEvent) => {
      touchInfo.initiated = true
      const touch = event.touches[0]
      touchInfo.startX = touch.pageX
      touchInfo.startY = touch.pageY
    }
    const onTouchMove = (event: TouchEvent) => {
      if (!touchInfo.initiated) return
      const touch = event.touches[0]
      const deltaX = touch.pageX - touchInfo.startX
      const deltaY = touch.pageY - touchInfo.startY
      if (Math.abs(deltaY) <= Math.abs(deltaX)) {
        const left = currentPage.value === 'cd' ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        touchInfo.percent = Math.abs(offsetWidth / window.innerWidth)
        lyricContainerInstance.value!.$el.style[
          transformStyle('transform')
        ] = `translate3d(${offsetWidth}px, 0, 0)`
        lyricContainerInstance.value!.$el.style.transition = ''
        albumContainerInstance.value!.style.opacity = String(1 - touchInfo.percent)
        albumContainerInstance.value!.style.transition = ''
      } else {
        touchInfo.percent = 0
      }
    }
    const onTouchEnd = (event: TouchEvent) => {
      let offsetWidth = 0
      let opacity = 0
      if (currentPage.value === 'cd') {
        if (touchInfo.percent > 0.1 && touchInfo.percent !== 0) {
          offsetWidth = -window.innerWidth
          currentPage.value = 'lyric'
        } else {
          opacity = 1
        }
      } else {
        if (touchInfo.percent < 0.9 && touchInfo.percent !== 0) {
          currentPage.value = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
        }
      }
      lyricContainerInstance.value!.$el.style[
        transformStyle('transform')
      ] = `translate3d(${offsetWidth}px, 0, 0)`
      lyricContainerInstance.value!.$el.style.transition = 'all 0.3s'
      albumContainerInstance.value!.style.opacity = String(opacity)
      albumContainerInstance.value!.style.transition = 'all 0.3s'
    }

    watch(
      () => store.getters.playingSong,
      (nextSong: ISong, prevSong: ISong) => {
        if (!nextSong) {
          playListPicker.value = false
          return
        }
        if (!prevSong || nextSong.id !== prevSong.id) {
          // 解决手机浏览器从后台切换至前台发生的js延迟问题
          setTimeout(() => {
            getSong(nextSong, isNext)
          }, 1000)
        }
      }
    )

    watch(
      () => store.state.isPlaying,
      async (value) => {
        await nextTick()
        if (value) {
          const animation = {
            0: {
              transform: 'rotate(0)'
            },
            100: {
              transform: 'rotate(360deg)'
            }
          }
          animations.registerAnimation({
            name: 'rotate',
            animation,
            presets: {
              duration: 20000,
              easing: 'linear',
              iterations: 'infinite'
            }
          })
          animations.runAnimation(albumInstance.value!, 'rotate')
          animations.runAnimation(miniAlbumInstance.value!, 'rotate')
          audioInstance.value?.play()
          lyricRef.value?.togglePlay()
        } else {
          albumInstance.value!.style.animationPlayState = 'paused'
          miniAlbumInstance.value!.style.animationPlayState = 'paused'
          audioInstance.value?.pause()
          lyricRef.value?.stop()
        }
      }
    )

    watch(songUrlRef, async (value) => {
      if (value) {
        await nextTick()
        audioInstance.value!.play()
      }
    })

    return () => {
      const classes = classesRef.value
      const playList = store.state.playList
      const isFullScreen = store.state.isFullScreen
      const song = songRef.value
      const songUrl = songUrlRef.value
      const lyric = lyricRef.value
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
          >
            <div v-show={playList.length && isFullScreen} class={classes.normalContainer}>
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
              <div
                class={classes.content}
                onTouchstart={onTouchStart}
                onTouchmove={onTouchMove}
                onTouchend={onTouchEnd}
              >
                <div ref={albumContainerInstance} class={classes.contentLeft}>
                  <div ref={albumWrapperInstance} class={classes.contentAlbumWrapper}>
                    <div class={classes.contentAlbum}>
                      <img
                        ref={albumInstance}
                        class={classes.albumImg}
                        src={song?.al.picUrl}
                        alt=""
                      />
                    </div>
                  </div>
                  <div class={classes.playingLyricContainer}>
                    <div class={classes.playingLyric}>{currentPlayLyric.value}</div>
                  </div>
                </div>
                <ScrollView
                  ref={lyricContainerInstance}
                  class={classes.contentRight}
                  data={lyric?.lines}
                >
                  <div ref={lyricLineInstance} class={classes.contentLyric}>
                    {lyric
                      ? lyric.lines.map((item, index) => (
                          <p
                            class={`${classes.contentLyricText} ${
                              currentLineLyric.value === index ? 'active' : ''
                            }`}
                          >
                            {item.txt}
                          </p>
                        ))
                      : ''}
                  </div>
                </ScrollView>
              </div>
              <div class={classes.footer}>
                <div class={classes.footerDotContainer}>
                  <div
                    class={`${classes.footerDot} ${currentPage.value === 'cd' ? 'active' : ''}`}
                  ></div>
                  <div
                    class={`${classes.footerDot} ${currentPage.value === 'lyric' ? 'active' : ''}`}
                  ></div>
                </div>
                <div class={classes.footerProgress}>
                  <span class={`${classes.footerProgressTime} left`}>
                    {formatTime(currentTime.value)}
                  </span>
                  <div style="flex: 1">
                    <ProgressBar
                      percent={percent.value}
                      onChange={(percent) => {
                        audioInstance.value!.currentTime = durationTime.value * percent
                        lyricRef.value?.seek(audioInstance.value!.currentTime * 1000)
                        store.commit('SET_IS_PLAYING', true)
                      }}
                    />
                  </div>
                  <span class={`${classes.footerProgressTime} right`}>
                    {formatTime(durationTime.value)}
                  </span>
                </div>
                <div class={classes.footerOperators}>
                  <div onClick={() => store.dispatch('dispatchPlayMode')}>
                    <Icon icon={store.state.playMode} />
                  </div>
                  <div onClick={onPrevious}>
                    <Icon icon="shangyishou" />
                  </div>
                  <div onClick={() => store.commit('SET_IS_PLAYING', !store.state.isPlaying)}>
                    <Icon class="center" icon={store.state.isPlaying ? 'zanting' : 'bofang'} />
                  </div>
                  <div onClick={onNext}>
                    <Icon icon="xiayishou" />
                  </div>
                  <Icon icon="" />
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
              <ProgressCircle percent={percent.value}>
                <img
                  ref={miniAlbumInstance}
                  class={classes.miniAlbumImg}
                  src={song?.al.picUrl}
                  alt=""
                  onClick={() => store.commit('SET_IS_FULL_SCREEN', true)}
                />
              </ProgressCircle>
              <div class={classes.miniDesc}>
                <h2>{song?.name}</h2>
                <p>{song && getSongDesc(song)}</p>
              </div>
              <div
                class={classes.miniOperators}
                onClick={() => (playListPicker.value = !playListPicker.value)}
              >
                <Icon class="center" icon="liebiao" color="#d93f30" />
              </div>
              <div
                class={classes.miniOperators}
                onClick={() => store.commit('SET_IS_PLAYING', !store.state.isPlaying)}
              >
                <Icon
                  class="center"
                  icon={store.state.isPlaying ? 'zanting' : 'bofang'}
                  color="#d93f30"
                />
              </div>
            </div>
          </Transition>
          <PlayList v-model={playListPicker.value} />
          <audio
            ref={audioInstance}
            src={songUrl}
            onCanplay={() => {
              songReady = true
              durationTime.value = audioInstance.value!.duration
            }}
            onError={() => (songReady = true)}
            onEnded={onEnded}
            onTimeupdate={(event) => {
              //@ts-ignore
              currentTime.value = event.target.currentTime
            }}
          ></audio>
        </Fragment>
      )
    }
  }
})
