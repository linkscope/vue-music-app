import { defineComponent, onMounted, ref } from 'vue'
import cnchar from 'cnchar'

import { getSingerList } from '@/api/singer'
import { ISinger } from '@/types'
import useStyle from './style'

import ScrollView from '@/components/ScrollView'
import SingerItem from './components/SingerItem'
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:29:22
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 19:17:00
 */

export type SingerType = {
  title: string
  item: ISinger[]
}

export default defineComponent({
  name: 'Singer',
  setup() {
    const classesRef = useStyle()
    const singerListRef = ref<SingerType[]>([])

    const normalizeSingerList = (singerList: ISinger[]) => {
      const singerMap = new Map<string, SingerType>()

      // 将歌手按照首字母分类
      singerList.forEach((item, index) => {
        const temp = {
          accountId: item.accountId,
          img1v1Url: item.img1v1Url,
          name: item.name
        }

        if (index < 10) {
          const items = singerMap.get('Hot')?.item || []
          singerMap.set('Hot', {
            title: 'Hot',
            item: items.concat(temp)
          })
        }
        const key = cnchar.spell(item.name[0], 'first', 'up') as string
        const items = singerMap.get(key)?.item || []
        singerMap.set(key.toUpperCase(), {
          title: key.toUpperCase(),
          item: items.concat(temp)
        })
      })

      // 处理map，得到最后的有序列表
      let hot: SingerType[] = []
      let ret: SingerType[] = []
      for (const [key, value] of singerMap) {
        if (key === 'Hot') {
          hot = hot.concat(value)
        } else {
          ret = ret.concat(value)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(ret)
    }

    onMounted(async () => {
      const result = await getSingerList(100)
      singerListRef.value = normalizeSingerList(result.artists)
    })

    return () => {
      const classes = classesRef.value
      const singerList = singerListRef.value
      return (
        <div class={classes.container}>
          <ScrollView class={classes.scrollView} data={singerList}>
            <ul>
              {singerList.map((item) => (
                <SingerItem singer={item} />
              ))}
            </ul>
          </ScrollView>
        </div>
      )
    }
  }
})
