import { defineComponent, ref, renderSlot, PropType, onMounted, watch } from 'vue'
import BScroll from '@better-scroll/core'
import BScrollBar from '@better-scroll/scroll-bar'

/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 14:15:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 16:09:13
 */

BScroll.use(BScrollBar)

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
    }
  },
  setup(props, { slots }) {
    const scrollViewInstance = ref<HTMLDivElement | null>(null)
    const scrollInstance = ref<BScroll | null>(null)

    const initScroll = () => {
      if (!scrollViewInstance.value) return

      scrollInstance.value = new BScroll(scrollViewInstance.value, {
        probeType: props.probeType,
        click: props.click,
        scrollY: true,
        scrollbar: true
      })
    }

    onMounted(() => {
      setTimeout(() => {
        initScroll()
      }, 20)
    })

    watch(
      () => props.data,
      () => {
        setTimeout(() => {
          scrollInstance.value!.refresh()
        }, 500)
      }
    )

    return () => {
      return <div ref={scrollViewInstance}>{renderSlot(slots, 'default')}</div>
    }
  }
})
