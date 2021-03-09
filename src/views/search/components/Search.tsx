/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-08 16:48:57
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-08 17:24:20
 */
import { defineComponent, PropType, ref, computed } from 'vue'
import { createUseStyles } from 'vue-jss'

import { Color, Font } from '@/assets/variables'
import Icon from '@/components/Icon'
import search from '..'

const useStyle = createUseStyles({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    padding: '0 10px',
    height: 40,
    borderRadius: 20,
    backgroundColor: Color['$color-highlight-background']
  },
  searchInput: {
    flex: 1,
    margin: '0 5px',
    lineHeight: '18px',
    color: Color['$color-text'],
    fontSize: Font['$font-size-small'],
    backgroundColor: Color['$color-highlight-background'],
    outline: 0,
    border: 'none'
  }
})

export default defineComponent({
  name: 'SearchInput',
  props: {
    placeholder: {
      type: String as PropType<string>,
      default: '搜索歌曲、歌手、歌单'
    },
    modelValue: {
      type: String as PropType<string>
    }
  },
  setup(props, { emit }) {
    const classesRef = useStyle()
    const inputInstance = ref<HTMLInputElement | null>(null)
    const search = computed({
      get: () => props.modelValue || '',
      set: (value) => emit('update:modelValue', value)
    })

    return () => {
      const classes = classesRef.value
      const { placeholder } = props
      return (
        <div class={classes.searchContainer}>
          <Icon color={Color['$color-background']} icon="sousuo" style="font-size: 16px" />
          <input
            ref={inputInstance}
            class={classes.searchInput}
            type="text"
            placeholder={placeholder}
            v-model={search.value}
          />
          <div
            v-show={search.value}
            onClick={() => {
              search.value = ''
              inputInstance.value!.focus()
            }}
          >
            <Icon color={Color['$color-background']} icon="shanchu3" style="font-size: 14px" />
          </div>
        </div>
      )
    }
  }
})
