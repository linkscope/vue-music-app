/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-29 09:48:26
 * @LastEditors: linkscope
 * @LastEditTime: 2021-04-05 12:32:58
 */
import {
  computed,
  defineComponent,
  PropType,
  Transition,
  withModifiers,
  ref,
  watch,
  TransitionGroup
} from 'vue'
import { useStore } from 'vuex'
import { createUseStyles } from 'vue-jss'
import { IStore, ISong } from '@/types'
import { Color, Font } from '@/assets/variables'
import { noWrap } from '@/assets/mixin'

import Icon from '@/components/Icon'
import ScrollView from '@/components/ScrollView'
import { Dialog } from 'vant'
import SongAdjunction from './SongAdjunction'

const useStyle = createUseStyles({
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 200,
    backgroundColor: Color['$color-background-dark'],
    '& .wrapper': {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: '#f2f2f2'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    padding: '20px 30px 10px 20px'
  },
  headerIcon: {
    marginRight: 10,
    fontSize: 30
  },
  headerText: {
    flex: 1,
    fontSize: Font['$font-size-small'],
    color: Color['$color-theme-dark']
  },
  headerClear: {
    fontSize: Font['$font-size-medium'],
    color: Color['$color-text-dark']
  },
  section: {
    maxHeight: 240,
    overflow: 'hidden'
  },
  sectionListItem: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    padding: '0 30px 0 20px',
    overflow: 'hidden'
  },
  sectionListItemCurrentIcon: {
    flex: '0 0 30px',
    width: 30,
    fontSize: Font['$font-size-medium']
  },
  sectionListItemText: {
    ...(noWrap as any),
    flex: 1,
    fontSize: Font['$font-size-small'],
    color: Color['$color-text-dark']
  },
  sectionListItemDeleteIcon: {
    fontSize: Font['$font-size-big']
  },
  add: {
    width: 140,
    margin: '20px auto 30px auto'
  },
  addWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    border: `1px solid ${Color['$color-text-dark']}`,
    borderRadius: 100,
    color: Color['$color-text-dark']
  },
  addIcon: {
    marginRight: 5,
    fontSize: Font['$font-size-medium']
  },
  addText: {
    fontSize: Font['$font-size-smallest']
  },
  close: {
    textAlign: 'center',
    height: 50,
    lineHeight: '50px',
    backgroundColor: Color.$white,
    fontSize: Font['$font-size-medium'],
    color: Color['$color-text-dark']
  },
  transitionActive: {
    transition: 'opacity .3s',
    '& .wrapper': {
      transition: 'all .3s'
    }
  },
  transitionEnter: {
    opacity: 0,
    '& .wrapper': {
      transform: 'translate3d(0, 100%, 0)'
    }
  },
  listTransitionActive: {
    transition: 'all 0.1s linear'
  },
  listTransitionEnter: {
    height: 0
  }
})

export default defineComponent({
  name: 'PlayerPlayList',
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props, { emit }) {
    const store = useStore<IStore>()
    const classesRef = useStyle()
    const scrollViewInstance = ref()
    const playListInstance = ref()
    const picker = computed({
      get: () => props.modelValue || false,
      set: (value) => emit('update:modelValue', value)
    })
    const adjunctPicker = ref(false)
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
      const children = playListInstance.value?.$el.children
      const index = store.state.playList.findIndex((item) => item.id === song.id)
      scrollViewInstance.value.scrollToElement(children[index], 300)
    }

    const selectSong = (index: number) => {
      store.commit('SET_PLAYING_INDEX', index)
      store.commit('SET_IS_PLAYING', true)
    }

    const deleteAll = () => {
      Dialog.confirm({
        title: '确认清空播放列表？',
        theme: 'round-button'
      }).then(() => {
        store.dispatch('dispatchDeleteSong')
      })
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
        if (!nextSong || !picker.value || nextSong.id === previousSong.id || adjunctPicker.value)
          return
        scrollToCurrentSong(nextSong)
      }
    )

    watch(adjunctPicker, (value) => {
      // 如果是在添加歌曲到队列页面，播放列表没有刷新可能会导致滚动报错，所以每次关闭添加时滚动校正一次
      if (!value) {
        scrollToCurrentSong(store.getters.playingSong)
      }
    })

    return () => {
      const classes = classesRef.value
      const playList = store.state.playList
      return (
        <>
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
                  <div onClick={deleteAll}>
                    <Icon class={classes.headerClear} color="#222" icon="shanchu" />
                  </div>
                </h1>
                <ScrollView ref={scrollViewInstance} data={playList} class={classes.section}>
                  <TransitionGroup
                    ref={playListInstance}
                    tag="ul"
                    enterActiveClass={classes.listTransitionActive}
                    leaveActiveClass={classes.listTransitionActive}
                    enterFromClass={classes.listTransitionEnter}
                    leaveToClass={classes.listTransitionEnter}
                  >
                    {playList.map((item, index) => (
                      <li
                        key={item.id}
                        class={classes.sectionListItem}
                        onClick={() => selectSong(index)}
                      >
                        <Icon
                          class={classes.sectionListItemCurrentIcon}
                          icon={store.getters.playingSong.id === item.id ? 'bofang' : ''}
                          color="#d93f30"
                        />
                        <span class={classes.sectionListItemText}>{item.name}</span>
                        <div
                          style="margin: 0 15px"
                          onClick={withModifiers(() => store.dispatch('dispatchDeleteSong', item), [
                            'stop'
                          ])}
                        >
                          <Icon
                            class={classes.sectionListItemDeleteIcon}
                            icon="shanchu3"
                            color="#d93f30"
                          />
                        </div>
                      </li>
                    ))}
                  </TransitionGroup>
                </ScrollView>
                <div class={classes.add}>
                  <div class={classes.addWrapper} onClick={() => (adjunctPicker.value = true)}>
                    <Icon class={classes.addIcon} icon="add" color="#222" />
                    <span class={classes.addText}>添加歌曲到队列</span>
                  </div>
                </div>
                <div class={classes.close} onClick={() => (picker.value = false)}>
                  关闭
                </div>
              </div>
            </div>
          </Transition>
          <SongAdjunction v-model={adjunctPicker.value} />
        </>
      )
    }
  }
})
