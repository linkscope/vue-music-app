/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:29:36
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 16:01:06
 */
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { IRank } from '@/types'
import { getTopList } from '@/api/rank'
import useStyle from './style'
import usePlayListHeight from '@/hooks/usePlayListHeight'

import RankItem from './components/RankItem'
import ScrollView from '@/components/ScrollView'

export default defineComponent({
  name: 'Rank',
  setup() {
    const router = useRouter()
    const classesRef = useStyle()
    const rankListRef = ref<IRank[]>([])
    const rankContainerInstance = ref<HTMLDivElement | null>(null)
    const scrollViewInstance = ref()

    usePlayListHeight((playList) => {
      const bottom = playList.length > 0 ? '60px' : ''
      rankContainerInstance.value!.style.bottom = bottom
      scrollViewInstance.value!.onRefresh()
    })

    onMounted(async () => {
      const { list } = await getTopList()
      rankListRef.value = list
    })

    return () => {
      const classes = classesRef.value
      const rankList = rankListRef.value
      return (
        <div ref={rankContainerInstance} class={classes.container}>
          <ScrollView ref={scrollViewInstance} class={classes.rankListContainer} data={rankList}>
            <ul>
              {rankList.map((rank) => (
                <RankItem
                  rank={rank}
                  onClick={(id) =>
                    router.push({
                      path: `/rank/detail/${id}`
                    })
                  }
                />
              ))}
            </ul>
          </ScrollView>
        </div>
      )
    }
  }
})
