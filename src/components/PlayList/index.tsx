/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-29 09:48:26
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-29 11:46:03
 */
import { computed, defineComponent, PropType, Transition, withModifiers, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { IStore, ISong } from '@/types'
import useStyle from './style'

import Icon from '@/components/Icon'
import ScrollView from '@/components/ScrollView'

export default defineComponent({
  name: 'PlayList',
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props, { emit }) {
    const store = useStore<IStore>()
    const classesRef = useStyle()
    const scrollViewInstance = ref()
    const playListInstance = ref<HTMLUListElement>()
    const picker = computed({
      get: () => props.modelValue || false,
      set: (value) => emit('update:modelValue', value)
    })
    const playModeText = computed(() => {
      const playMode = store.state.playMode
      switch (playMode) {
        case 'loop':
          return '单曲循环'
        case 'random':
          return '随机播放'
        case 'sequence':
          return '列表循环'
        default:
          return ''
      }
    })

    const scrollToCurrentSong = (song: ISong) => {
      const index = store.state.playList.findIndex((item) => item.id === song.id)
      scrollViewInstance.value.scrollToElement(playListInstance.value?.children[index], 300)
    }

    const selectSong = (index: number) => {
      store.commit('SET_PLAYING_INDEX', index)
      store.commit('SET_IS_PLAYING', true)
    }

    watch(picker, (value) => {
      if (value) {
        setTimeout(() => {
          scrollViewInstance.value.onRefresh()
          scrollToCurrentSong(store.getters.playingSong)
        }, 20)
      }
    })

    watch(
      () => store.getters.playingSong,
      (nextSong, previousSong) => {
        if (!picker.value || nextSong.id === previousSong.id) return
        scrollToCurrentSong(nextSong)
      }
    )

    return () => {
      const classes = classesRef.value
      const playList = store.state.playList
      return (
        <Transition
          enterActiveClass={classes.transitionActive}
          leaveActiveClass={classes.transitionActive}
          enterFromClass={classes.transitionEnter}
          leaveToClass={classes.transitionEnter}
        >
          <div
            v-show={picker.value}
            class={classes.container}
            onClick={() => (picker.value = false)}
          >
            <div class="wrapper" onClick={withModifiers(() => '', ['stop'])}>
              <h1 class={classes.header}>
                <div
                  onClick={() => {
                    store.dispatch('dispatchPlayMode')
                    scrollToCurrentSong(store.getters.playingSong)
                  }}
                >
                  <Icon class={classes.headerIcon} color="#222" icon={store.state.playMode} />
                </div>
                <span class={classes.headerText}>{playModeText.value}</span>
                <Icon class={classes.headerClear} color="#222" icon="shanchu" />
              </h1>
              <ScrollView ref={scrollViewInstance} data={playList} class={classes.section}>
                <ul ref={playListInstance}>
                  {playList.map((item, index) => (
                    <li
                      key={index}
                      class={classes.sectionListItem}
                      onClick={() => selectSong(index)}
                    >
                      <Icon
                        class={classes.sectionListItemCurrentIcon}
                        icon={store.getters.playingSong.id === item.id ? 'bofang' : ''}
                        color="#d93f30"
                      />
                      <span class={classes.sectionListItemText}>{item.name}</span>
                      <Icon
                        class={classes.sectionListItemFavoriteIcon}
                        icon="xihuan"
                        color="#d93f30"
                      />
                      <Icon
                        class={classes.sectionListItemDeleteIcon}
                        icon="shanchu3"
                        color="#d93f30"
                      />
                    </li>
                  ))}
                </ul>
              </ScrollView>
              <div class={classes.close} onClick={() => (picker.value = false)}>
                关闭
              </div>
            </div>
          </div>
        </Transition>
      )
    }
  }
})
