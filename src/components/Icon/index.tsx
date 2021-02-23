import { defineComponent, PropType } from 'vue'

/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:46:18
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-22 16:05:47
 */
export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String as PropType<string>,
      required: true
    },
    prefix: {
      type: String as PropType<string>,
      default: 'icon'
    },
    color: {
      type: String as PropType<string>,
      default: '#fff'
    }
  },
  setup(props) {
    return () => {
      const { icon, prefix, color } = props
      return (
        <svg class="icon" aria-hidden="true">
          <use href={`#${prefix}${icon}`} color={color}></use>
        </svg>
      )
    }
  }
})
