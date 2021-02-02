/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:29:31
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-02 15:15:49
 */
import { defineComponent, onMounted, ref } from 'vue'

import { IBanner, IRecommend } from '@/types'
import { getBannerList, getRecommendList } from '@/api/recommend'
import useStyle from './style'

import Banner from './components/Banner'
import RecommendList from './components/RecommendList'
import ScrollView from '@/components/ScrollView'
import Loading from '@/components/Loading'

// 检查banner轮播是否成功渲染
let checkLoaded = false

export default defineComponent({
  name: 'Recommend',
  setup() {
    const classesRef = useStyle()
    const bannerListRef = ref<IBanner[]>([])
    const recommendListRef = ref<IRecommend[]>([])
    const scrollViewInstance = ref()

    onMounted(async () => {
      setTimeout(async () => {
        const bannerResult = await getBannerList(2)
        bannerListRef.value = bannerResult.banners
      }, 2000)

      const recommendListResult = await getRecommendList()

      recommendListRef.value = recommendListResult.result
    })

    // 监听轮播图图片加载，确保可以重新计算scroll高度问题
    const onBannerImgLoad = () => {
      if (!checkLoaded) {
        scrollViewInstance.value.onRefresh()
        checkLoaded = true
      }
    }

    return () => {
      const classes = classesRef.value
      const bannerList = bannerListRef.value
      const recommendList = recommendListRef.value
      return (
        <div class={classes.container}>
          <ScrollView
            ref={scrollViewInstance}
            class={classes.scrollViewWrapper}
            data={recommendList}
          >
            <div>
              <div class={classes.bannerContainer}>
                <Banner bannerList={bannerList} onBannerImgLoad={onBannerImgLoad} />
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
