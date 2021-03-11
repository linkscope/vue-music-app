/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-03 11:20:50
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-11 10:28:05
 */
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { ISong } from '@/types'
import { transformStyle } from '@/utils'
import usePlayListHeight from '@/hooks/usePlayListHeight'
import useStyle from './style'

import Icon from '@/components/Icon'
import ScrollView from '@/components/ScrollView'
import Loading from '@/components/Loading'
import SongListItem from './SongListItem'

// scroll滚动可以覆盖掉背景图的距离
let scrollDiff = -1

export default defineComponent({
  name: 'SongList',
  props: {
    bgImg: {
      type: String as PropType<string>,
      default: ''
    },
    songList: {
      type: Array as PropType<ISong[]>,
      default: []
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    onPullUp: {
      type: Function as PropType<() => void>,
      default: () => ''
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    isRank: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const classesRef = useStyle()
    const scrollYRef = ref(0)
    const scrollViewInstance = ref()
    const backgroundImgInstance = ref<HTMLDivElement | null>()
    const playBtnInstance = ref<HTMLDivElement | null>()

    usePlayListHeight((playList) => {
      const bottom = playList.length > 0 ? '60px' : ''
      scrollViewInstance.value!.$el.style.bottom = bottom
      scrollViewInstance.value!.onRefresh()
    })

    const onScroll = (x: number, y: number) => {
      scrollYRef.value = y
    }

    const selectSong = (index: number) => {
      store.dispatch('dispatchSelectSong', {
        songList: props.songList,
        index
      })
    }

    onMounted(() => {
      if (scrollViewInstance.value && backgroundImgInstance.value) {
        scrollViewInstance.value.$el.style.top = `${backgroundImgInstance.value.clientHeight}px`
        // 初始化一下滚动到背景图隐藏所需的距离 滚动时需要该数值进行判断
        scrollDiff = backgroundImgInstance.value.clientHeight - 40
      }
    })

    watch(scrollYRef, (value) => {
      if (!backgroundImgInstance.value) return

      const backgroundImgStyle = backgroundImgInstance.value.style
      // 当上拉时，有一个背景图片放大的动画效果
      if (value > 0) {
        backgroundImgStyle[transformStyle('transform') as any] = `scale(${1 +
          value / backgroundImgInstance.value.clientHeight})`
      }
      if (-value > scrollDiff) {
        backgroundImgStyle.paddingTop = '0'
        backgroundImgStyle.height = '40px'
        backgroundImgStyle.zIndex = '10'
        playBtnInstance.value!.style.display = 'none'
      } else {
        backgroundImgStyle.paddingTop = '70%'
        backgroundImgStyle.height = '0'
        backgroundImgStyle.zIndex = '0'
        playBtnInstance.value!.style.display = ''
      }
    })

    return () => {
      const classes = classesRef.value
      const { title, bgImg, songList, loading, onPullUp, isRank } = props
      return (
        <div class={classes.container}>
          <div class={classes.iconWrapper} onClick={() => router.back()}>
            <Icon class={classes.icon} icon="fanhui" />
          </div>
          <h1 class={classes.title}>{title}</h1>
          <div
            ref={backgroundImgInstance}
            class={classes.backgroundImgWrapper}
            style={`background-image: url(${bgImg})`}
          >
            <div
              v-show={songList.length > 0}
              ref={playBtnInstance}
              class={classes.playContainer}
              onClick={() => store.dispatch('dispatchRandomPlay', props.songList)}
            >
              <Icon class={classes.playIcon} icon="bofang" color="#3754fd" />
              <span class={classes.playText}>随机播放全部</span>
            </div>
            <div class={classes.backgroundFilter}></div>
          </div>
          <div class={classes.contentWrapper}>
            <ScrollView
              ref={scrollViewInstance}
              class={classes.songListContainer}
              data={songList}
              listenScroll
              onScroll={onScroll}
              onPullUp={onPullUp}
            >
              <ul style="padding: 20px 30px; background-color: #fff">
                {songList.map((song, index) => (
                  <SongListItem key={song.id} onSelectSong={selectSong} index={index} song={song} />
                ))}
              </ul>
              <div v-show={loading} class={classes.loadingContainer}>
                <Loading />
              </div>
            </ScrollView>
          </div>
        </div>
      )
    }
  }
})
