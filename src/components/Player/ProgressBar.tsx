/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-22 10:05:28
 * @LastEditors: linkscope
 * @LastEditTime: 2021-04-04 16:32:44
 */
import { defineComponent, PropType, watch, ref } from 'vue'
import { createUseStyles } from 'vue-jss'

import { Color } from '@/assets/variables'
import { transformStyle } from '@/utils'

const useStyle = createUseStyles({
  container: {
    height: 30
  },
  wrapper: {
    position: 'relative',
    top: 13,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, .3)'
  },
  progress: {
    position: 'absolute',
    height: '100%',
    backgroundColor: Color['$color-theme']
  },
  progressBtnWrapper: {
    position: 'absolute',
    left: -8,
    top: -13,
    width: 30,
    height: 30
  },
  progressBtn: {
    position: 'relative',
    top: 9,
    left: 7,
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: Color.$white
  }
})

// 触摸的信息共享
const touchInfo = {
  initiated: false,
  startX: 0,
  offsetX: 0
}

export default defineComponent({
  name: 'PlayerProgressBar',
  props: {
    percent: {
      type: Number as PropType<number>,
      default: 0
    },
    onChange: {
      type: Function as PropType<(percent: number) => void>,
      default: () => ''
    }
  },
  setup(props) {
    const classesRef = useStyle()
    const progressContainerInstance = ref<HTMLDivElement | null>(null)
    const progressInstance = ref<HTMLDivElement | null>(null)
    const progressBtnInstance = ref<HTMLDivElement | null>(null)

    const progressBtnOffset = (offsetWidth: number) => {
      progressInstance.value!.style.width = `${offsetWidth}px`
      progressBtnInstance.value!.style[
        transformStyle('transform') as any
      ] = `translate3d(${offsetWidth}px, 0, 0)`
    }

    const onTouchStart = (event: TouchEvent) => {
      touchInfo.initiated = true
      touchInfo.startX = event.touches[0].pageX
      touchInfo.offsetX = progressInstance.value!.clientWidth
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!touchInfo.initiated) return
      const deltaX = event.touches[0].pageX - touchInfo.startX
      const offset = Math.min(
        Math.max(0, touchInfo.offsetX + deltaX),
        progressContainerInstance.value!.clientWidth - 12
      )
      progressBtnOffset(offset)
    }

    const onTouchEnd = () => {
      touchInfo.initiated = false
      const barWidth = progressContainerInstance.value!.clientWidth - 12
      const percent = progressInstance.value!.clientWidth / barWidth
      props.onChange(percent)
    }

    const onClick = (event: MouseEvent) => {
      const rect = progressContainerInstance.value!.getBoundingClientRect()
      const barWidth = progressContainerInstance.value!.clientWidth - 12
      // 用滑动后距离左部的距离减去容器左部的距离 这样哪怕点击按钮本身都可以获得正确的偏移量
      const offsetWidth = event.pageX - rect.left
      progressBtnOffset(offsetWidth)
      props.onChange(offsetWidth / barWidth)
    }

    watch(
      () => props.percent,
      (value) => {
        if (value >= 0 && !touchInfo.initiated) {
          const barWidth = progressContainerInstance.value!.clientWidth - 12
          const offsetWidth = value * barWidth
          progressBtnOffset(offsetWidth)
        }
      }
    )

    return () => {
      const classes = classesRef.value
      return (
        <div ref={progressContainerInstance} class={classes.container} onClick={onClick}>
          <div class={classes.wrapper}>
            <div ref={progressInstance} class={classes.progress}></div>
            <div
              ref={progressBtnInstance}
              class={classes.progressBtnWrapper}
              onTouchstart={onTouchStart}
              onTouchmove={onTouchMove}
              onTouchend={onTouchEnd}
            >
              <div class={classes.progressBtn}></div>
            </div>
          </div>
        </div>
      )
    }
  }
})
