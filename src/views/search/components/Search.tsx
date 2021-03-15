/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-08 16:48:57
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-15 09:59:24
 */
import { defineComponent, PropType, ref, computed } from 'vue'
import { createUseStyles } from 'vue-jss'

import { Color, Font } from '@/assets/variables'
import Icon from '@/components/Icon'

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
    },
    onEnter: {
      type: Function as PropType<(event: KeyboardEvent) => void>,
      default: () => ''
    },
    onFocus: {
      type: Function as PropType<() => void>,
      default: () => ''
    }
  },
  setup(props, { emit }) {
    const classesRef = useStyle()
    const inputInstance = ref<HTMLInputElement | null>(null)
    const search = computed({
      get: () => props.modelValue || '',
      set: (value) => emit('update:modelValue', value)
    })

    return {
      inputInstance,
      search,
      classes: classesRef
    }
  },
  render() {
    const { placeholder, onEnter, onFocus } = this.$props
    return (
      <div class={this.classes.searchContainer}>
        <Icon color={Color['$color-background']} icon="sousuo" style="font-size: 16px" />
        <input
          ref="inputInstance"
          class={this.classes.searchInput}
          type="text"
          placeholder={placeholder}
          v-model={this.search}
          onFocus={onFocus}
          onKeypress={(event) => (event.key === 'Enter' ? onEnter(event) : '')}
        />
        <div
          v-show={this.search}
          onClick={() => {
            this.search = ''
            this.inputInstance!.focus()
          }}
        >
          <Icon color={Color['$color-background']} icon="shanchu3" style="font-size: 14px" />
        </div>
      </div>
    )
  }
})
