import { defineComponent, onMounted, ref, watch } from 'vue'
import cnchar from 'cnchar'

import { getSingerList } from '@/api/singer'
import { ISinger } from '@/types'
import useStyle from './style'

import ScrollView from '@/components/ScrollView'
import SingerItem from './components/SingerItem'
import Shortcut from './components/Shortcut'
/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:29:22
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-01 14:25:17
 */

export type SingerType = {
  title: string
  item: ISinger[]
}

// 每个歌手分类下的高度
const heightList: number[] = [0]

export default defineComponent({
  name: 'Singer',
  setup() {
    const classesRef = useStyle()
    const singerListRef = ref<SingerType[]>([])
    const shortcutListRef = ref<string[]>([])
    const scrollYRef = ref(-1)
    const currentIndexRef = ref(0)
    const scrollInstance = ref()
    const singerListInstance = ref()

    const onTouchMoveElement = (index: number) => {
      if (scrollInstance.value && singerListInstance.value.children.length !== 0) {
        scrollYRef.value = -heightList[index]
        scrollInstance.value.scrollToElement(singerListInstance.value.children[index], 0)
      }
    }

    const onScroll = (x: number, y: number) => {
      scrollYRef.value = y
    }

    const calculateSingerItemList = () => {
      let height = 0
      const singerList = singerListInstance.value.children
      for (const item of singerList) {
        height += item.clientHeight
        heightList.push(height)
      }
    }

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
      singerListRef.value.map((item) => {
        shortcutListRef.value.push(item.title === 'Hot' ? '热' : item.title.substr(0, 1))
      })
      setTimeout(() => {
        calculateSingerItemList()
      }, 20)
    })

    watch(scrollYRef, (value) => {
      if (value > 0) return
      for (let i = 0, len = heightList.length; i < len; i++) {
        const height1 = heightList[i]
        const height2 = heightList[i + 1]
        if (!height2 || (-value >= height1 && -value < height2)) {
          currentIndexRef.value = i
          return
        }
      }
      currentIndexRef.value = 0
    })

    return () => {
      const classes = classesRef.value
      const singerList = singerListRef.value
      const shortcutList = shortcutListRef.value
      return (
        <div class={classes.container}>
          <ScrollView
            ref={scrollInstance}
            listenScroll
            class={classes.scrollView}
            data={singerList}
            onScroll={onScroll}
          >
            <ul ref={singerListInstance}>
              {singerList.map((item) => (
                <SingerItem singer={item} />
              ))}
            </ul>
          </ScrollView>
          <div class={classes.shortcutWrapper}>
            <Shortcut
              shortcutList={shortcutList}
              onTouchMoveElement={onTouchMoveElement}
              activeIndex={currentIndexRef.value}
            />
          </div>
        </div>
      )
    }
  }
})
