import { defineComponent, PropType, renderSlot } from 'vue'
import { createUseStyles } from 'vue-jss'

import { Color } from '@/assets/variables'
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-22 14:56:15
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-22 15:28:45
 */

const useStyle = createUseStyles({
  container: {
    position: 'relative',
    margin: '0 20px 0 10px',
    '& circle': {
      strokeWidth: 8,
      transformOrigin: 'center'
    }
  },
  progressBackground: {
    transform: 'scale(0.9)',
    stroke: Color['$color-theme-dark']
  },
  progressBar: {
    transform: 'scale(0.9) rotate(-90deg)',
    stroke: Color['$color-theme']
  }
})

export default defineComponent({
  name: 'PlayerProgressCircle',
  props: {
    width: {
      type: [String, Number] as PropType<string | number>,
      default: 36
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: 36
    },
    percent: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  setup(props, { slots }) {
    const classesRef = useStyle()
    return () => {
      const classes = classesRef.value
      const { width, height, percent } = props
      return (
        <div class={classes.container}>
          <svg width={width} height={height} viewBox="0 0 100 100">
            <circle class={classes.progressBackground} r="50" cx="50" cy="50" fill="transparent" />
            <circle
              class={classes.progressBar}
              r="50"
              cx="50"
              cy="50"
              fill="transparent"
              stroke-dasharray={Math.PI * 100}
              stroke-dashoffset={Math.PI * 100 * (1 - percent)}
            />
          </svg>
          {renderSlot(slots, 'default')}
        </div>
      )
    }
  }
})
