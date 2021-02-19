import { defineComponent, ref, renderSlot, PropType, onMounted, watch } from 'vue'
import BScroll from '@better-scroll/core'
import BScrollBar from '@better-scroll/scroll-bar'
import BPullUp from '@better-scroll/pull-up'
import { EaseItem } from '@better-scroll/shared-utils'

/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 14:15:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-04 11:45:25
 */

BScroll.use(BScrollBar)
BScroll.use(BPullUp as any)

export default defineComponent({
  name: 'ScrollView',
  props: {
    probeType: {
      type: Number as PropType<number>,
      default: 3
    },
    click: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    listenScroll: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    onScroll: {
      type: Function as PropType<(x: number, y: number) => void>
    },
    onPullUp: {
      type: Function as PropType<() => void>
    }
  },
  setup(props) {
    const scrollViewInstance = ref<HTMLDivElement | null>(null)
    const scrollInstance = ref<BScroll | null>(null)

    const initScroll = () => {
      if (!scrollViewInstance.value) return

      scrollInstance.value = new BScroll(scrollViewInstance.value, {
        pullUpLoad: true,
        probeType: props.probeType,
        click: props.click,
        scrollY: true,
        scrollbar: true
      })

      if (props.listenScroll) {
        scrollInstance.value.on('scroll', (position: { x: number; y: number }) => {
          props.onScroll && props.onScroll(position.x, position.y)
        })
        scrollInstance.value.on('pullingUp', () => props.onPullUp && props.onPullUp())
      }
    }

    onMounted(() => {
      setTimeout(() => {
        initScroll()
      }, 20)
    })

    const scrollTo = (
      x: number,
      y: number,
      time?: number | undefined,
      easing?: EaseItem | undefined,
      extraTransform?:
        | {
            start: object
            end: object
          }
        | undefined
    ) => {
      scrollInstance.value?.scrollTo.call(scrollInstance.value, x, y, time, easing, extraTransform)
    }

    const scrollToElement = (
      el: string | HTMLElement,
      time: number,
      offsetX: number | boolean,
      offsetY: number | boolean,
      easing?: EaseItem | undefined
    ) => {
      scrollInstance.value?.scrollToElement.call(
        scrollInstance.value,
        el,
        time,
        offsetX,
        offsetY,
        easing
      )
    }

    const onRefresh = () => {
      scrollInstance.value?.refresh()
    }

    watch(
      () => props.data,
      () => {
        setTimeout(() => {
          onRefresh()
          scrollInstance.value?.finishPullUp()
        }, 500)
      }
    )

    return {
      scrollViewInstance,
      scrollTo,
      scrollToElement,
      onRefresh
    }
  },
  render() {
    return <div ref="scrollViewInstance">{renderSlot(this.$slots, 'default')}</div>
  }
})
