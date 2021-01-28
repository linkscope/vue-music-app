/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:29:31
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 22:25:22
 */
import { defineComponent, onMounted, ref } from 'vue'

import { IBanner } from '@/types'
import { getBannerList } from '@/api/recommend'

import Banner from './components/Banner'

export default defineComponent({
  name: 'Recommend',
  setup() {
    const bannerListRef = ref<IBanner[]>([])

    onMounted(async () => {
      const result = await getBannerList(2)
      bannerListRef.value = result.banners
    })

    return () => {
      const bannerList = bannerListRef.value
      return <Banner bannerList={bannerList} />
    }
  }
})
