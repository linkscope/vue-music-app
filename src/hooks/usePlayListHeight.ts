import { ISong } from '@/types'
import { onActivated, onMounted, watch, computed } from 'vue'
import store from '@/store'
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-24 10:58:00
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 11:21:52
 */
export default function usePlayListHeight(handlePlayListHeight: (playList: ISong[]) => void) {
  const playList = computed(() => store.state.playList)

  onMounted(() => {
    handlePlayListHeight(playList.value)
  })

  onActivated(() => {
    handlePlayListHeight(playList.value)
  })

  watch(
    () => playList.value,
    () => {
      handlePlayListHeight(playList.value)
    }
  )
}
