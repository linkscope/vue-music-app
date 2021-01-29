import { defineComponent, PropType, ref, watchEffect } from 'vue'
import { createUseStyles } from 'vue-jss'
import BScroll from '@better-scroll/core'
import BSlide from '@better-scroll/slide'

import { IBanner } from '@/types'
import { Color } from '@/assets/variables'
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 22:05:49
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 13:37:19
 */
const useStyle = createUseStyles({
  container: {
    position: 'relative',
    minHeight: 1
  },
  bannerList: {
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  bannerItem: {
    float: 'left',
    boxSizing: 'border-box',
    overflow: 'hidden',
    textAlign: 'center',
    '& a': {
      display: 'block',
      width: '100%',
      overflow: 'hidden',
      textDecoration: 'none'
    },
    '& img': {
      display: 'block',
      width: '100%'
    }
  },
  dotList: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 12,
    textAlign: 'center',
    fontSize: 0
  },
  dotItem: {
    display: 'inline-block',
    margin: '0 4px',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: Color['$color-text-light']
  },
  dotItemActive: {
    width: 20,
    borderRadius: 5,
    backgroundColor: Color['$color-text-lighter']
  }
})

BScroll.use(BSlide)

export default defineComponent({
  name: 'RecommendBanner',
  props: {
    bannerList: {
      type: Array as PropType<IBanner[]>,
      required: true
    },
    loop: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    autoPlay: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    interval: {
      type: [Number, String] as PropType<number | string>,
      default: 3000
    }
  },
  setup(props) {
    const classesRef = useStyle()
    const sliderContainerInstance = ref<HTMLDivElement | null>(null)
    const bannerListInstance = ref<HTMLDivElement | null>(null)
    const currentPageIndex = ref(0)

    // 计算轮播图的总宽度
    const computeSliderWidth = () => {
      if (!sliderContainerInstance.value || !bannerListInstance.value) return

      const sliderContainerWidth = sliderContainerInstance.value.clientWidth
      const children = bannerListInstance.value.children
      let totalWidth = 0
      for (const child of children) {
        ;(child as HTMLDivElement).style.width = sliderContainerWidth + 'px'
        totalWidth += sliderContainerWidth
      }

      // 如果是循环轮播 需要两个空位供循环使用
      if (props.loop) {
        totalWidth += sliderContainerWidth * 2
      }

      bannerListInstance.value.style.width = totalWidth + 'px'
    }

    const initScroll = () => {
      const scroll = new BScroll(sliderContainerInstance.value!, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        slide: {
          loop: props.loop,
          threshold: 0.3,
          speed: 500,
          interval: +props.interval,
          autoplay: props.autoPlay
        },
        bounce: false
      })

      scroll.on('scrollEnd', () => {
        const pageIndex = scroll.getCurrentPage().pageX
        currentPageIndex.value = pageIndex
      })
    }

    watchEffect(() => {
      const length = bannerListInstance.value?.children.length
      // TODO: 最后一次监听只能监听到length为0 length为0代表列表是有数据的，这时用计时器重新渲染一下，暂时这样写。。。
      if (length === 0 && props.bannerList.length) {
        setTimeout(() => {
          computeSliderWidth()
          initScroll()
        }, 20)
      }
    })

    return () => {
      const classes = classesRef.value
      const { bannerList } = props
      return (
        <div ref={sliderContainerInstance} class={classes.container}>
          <div ref={bannerListInstance} class={classes.bannerList}>
            {bannerList.map((item) => (
              <div key={item.bannerId} class={classes.bannerItem}>
                <a href={item.url || '#'}>
                  <img src={item.pic} alt="" />
                </a>
              </div>
            ))}
          </div>
          <div class={classes.dotList}>
            {bannerList.map((item, index) => (
              <span
                class={`${classes.dotItem} ${
                  currentPageIndex.value === index ? classes.dotItemActive : ''
                }`}
              />
            ))}
          </div>
        </div>
      )
    }
  }
})
