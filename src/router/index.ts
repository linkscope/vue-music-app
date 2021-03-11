/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-11 11:38:04
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import('@/views/recommend'),
    meta: {
      title: '推荐'
    }
  },
  {
    path: '/recommend/detail/:id',
    name: 'RecommendDetail',
    component: () => import('@/views/recommend/detail'),
    meta: {
      title: '歌单详情'
    }
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import('@/views/singer'),
    meta: {
      title: '歌手'
    }
  },
  {
    path: '/singer/detail/:id',
    name: 'SingerDetail',
    component: () => import('@/views/singer/detail'),
    meta: {
      title: '歌手详情'
    }
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import('@/views/rank'),
    meta: {
      title: '排行'
    }
  },
  {
    path: '/rank/detail/:id',
    name: 'RankDetail',
    component: () => import('@/views/rank/detail'),
    meta: {
      title: '排行详情'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: () => import('@/views/albums'),
    meta: {
      title: '专辑详情'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `网易云音乐 | ${to.meta.title}`
  next()
})

export default router
