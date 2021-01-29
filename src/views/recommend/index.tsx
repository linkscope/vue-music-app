/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:29:31
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 17:31:57
 */
import { defineComponent, onMounted, ref } from 'vue'

import { IBanner, IRecommend } from '@/types'
import { getBannerList, getRecommendList } from '@/api/recommend'
import useStyle from './style'

import Banner from './components/Banner'
import RecommendList from './components/RecommendList'
import ScrollView from '@/components/ScrollView'
import Loading from '@/components/Loading'

export default defineComponent({
  name: 'Recommend',
  setup() {
    const classesRef = useStyle()
    const bannerListRef = ref<IBanner[]>([])
    const recommendListRef = ref<IRecommend[]>([])

    onMounted(async () => {
      const bannerResult = await getBannerList(2)
      const recommendListResult = await getRecommendList()
      bannerListRef.value = bannerResult.banners
      recommendListRef.value = recommendListResult.result
    })

    return () => {
      const classes = classesRef.value
      const bannerList = bannerListRef.value
      const recommendList = recommendListRef.value
      return (
        <div class={classes.container}>
          <ScrollView class={classes.scrollViewWrapper} data={recommendListRef.value}>
            <div>
              <div class={classes.bannerContainer}>
                <Banner bannerList={bannerList} />
              </div>
              <h1 class={classes.recommendTitle}>热门歌单推荐</h1>
              <RecommendList recommendList={recommendList} />
            </div>
            <div class={classes.scrollViewWrapper} v-show={!recommendList.length}>
              <Loading />
            </div>
          </ScrollView>
        </div>
      )
    }
  }
})
