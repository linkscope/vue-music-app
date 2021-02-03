/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-03 11:20:50
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-03 21:02:26
 */
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createUseStyles } from 'vue-jss'

import { ISong } from '@/types'
import { Font, Color } from '@/assets/variables'
import { noWrap } from '@/assets/mixin'
import Icon from '@/components/Icon'
import ScrollView from '@/components/ScrollView'
import Loading from '@/components/Loading'

const useStyle = createUseStyles({
  container: {
    position: 'fixed',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 6,
    zIndex: 102
  },
  icon: {
    padding: 10,
    height: Font['$font-size-big'],
    width: Font['$font-size-biggest'],
    color: Color['$color-theme']
  },
  title: {
    ...(noWrap as any),
    zIndex: 102,
    position: 'absolute',
    top: 0,
    left: '10%',
    width: '80%',
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: Font['$font-size-medium'],
    color: '#fff'
  },
  backgroundImgWrapper: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingTop: '70%',
    transformOrigin: 'top',
    backgroundSize: 'cover'
  },
  backgroundFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(7, 17, 27, 0.4)'
  },
  contentWrapper: {
    position: 'relative',
    height: '100%'
  },
  songListContainer: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: '100%'
  },
  songItem: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: 64
  },
  songContent: {
    flex: 1,
    lineHeight: '20px',
    overflow: 'hidden'
  },
  songItemName: {
    ...(noWrap as any),
    color: Color['$color-text'],
    fontSize: Font['$font-size-small']
  },
  songItemDesc: {
    ...(noWrap as any),
    marginTop: 4,
    color: Color['$color-text-dark'],
    fontSize: Font['$font-size-smaller']
  },
  loadingContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 120,
    backgroundColor: Color['$color-background-dark']
  }
})

// scroll滚动可以覆盖掉背景图的距离
let scrollDiff = -1
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-03 11:20:50
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-03 16:05:13
 */
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
    }
  },
  setup(props) {
    const router = useRouter()
    const classesRef = useStyle()
    const scrollYRef = ref(0)
    const scrollViewInstance = ref()
    const backgroundImgInstance = ref<HTMLDivElement | null>()

    const getSongDesc = (song: ISong) => {
      const artists: string[] = []
      song.ar.forEach((item) => artists.push(item.name))
      return `${artists.join('/')} - ${song.al.name}`
    }

    const onScroll = (x: number, y: number) => {
      scrollYRef.value = y
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
        backgroundImgStyle.transform = `scale(${1 +
          value / backgroundImgInstance.value.clientHeight})`
      }
      if (-value > scrollDiff) {
        backgroundImgStyle.paddingTop = '0'
        backgroundImgStyle.height = '40px'
        backgroundImgStyle.zIndex = '10'
      } else {
        backgroundImgStyle.paddingTop = '70%'
        backgroundImgStyle.height = '0'
        backgroundImgStyle.zIndex = '0'
      }
    })

    return () => {
      const classes = classesRef.value
      const { title, bgImg, songList, loading, onPullUp } = props
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
                {songList.map((song) => (
                  <li key={song.id} class={classes.songItem}>
                    <div class={classes.songContent}>
                      <h2 class={classes.songItemName}>{song.name}</h2>
                      <p class={classes.songItemDesc}>{getSongDesc(song)}</p>
                    </div>
                  </li>
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
