/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:29:27
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-09 15:41:51
 */
import { defineComponent, onMounted, ref, watch } from 'vue'

import useStyle from './style'
import { getHotKeyList, searchSuggest, searchSuggestType } from '@/api/search'

import Search from './components/Search'
import SuggestList from './components/SuggestList'

let T = 0

export type searchSuggestListType = {
  id: number
  name: string
  icon: string
}[]

export default defineComponent({
  name: 'Search',
  setup() {
    const classesRef = useStyle()
    const searchValue = ref('')
    const hotKeyListRef = ref<
      {
        first: string
      }[]
    >([])
    const suggestSearchList = ref<searchSuggestListType>([])

    const normalizeSuggestSearch = (result: searchSuggestType) => {
      const newList: searchSuggestListType = []
      result.order.map((key) => {
        //@ts-ignore
        result[key]!.map((item: any) =>
          newList.push({
            id: item.id,
            name: item.name,
            icon: key
          })
        )
      })
      return newList
    }

    onMounted(async () => {
      const { result } = await getHotKeyList()
      hotKeyListRef.value = result.hots
    })

    watch(searchValue, (value) => {
      if (!value) {
        clearTimeout(T)
        suggestSearchList.value = []
        return
      }
      if (T) {
        clearTimeout(T)
      }
      T = setTimeout(async () => {
        const { result } = await searchSuggest(value)
        suggestSearchList.value = normalizeSuggestSearch(result)
        console.log(suggestSearchList.value)
      }, 500)
    })

    return () => {
      const classes = classesRef.value
      const hotKeyList = hotKeyListRef.value
      return (
        <>
          <div class={classes.searchContainer}>
            <Search v-model={searchValue.value} />
          </div>
          <div class={classes.container}>
            <SuggestList
              v-show={suggestSearchList.value.length}
              suggestList={suggestSearchList.value}
            />
            <div class={classes.hotKeyContainer}>
              <h1 class={classes.hotKeyTitle}>热门搜索</h1>
              <ul>
                {hotKeyList.map((item, index) => (
                  <li
                    key={index}
                    class={classes.hotKeyItem}
                    onClick={() => (searchValue.value = item.first)}
                  >
                    {item.first}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )
    }
  }
})
