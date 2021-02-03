/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 13:18:34
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-03 10:21:30
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
    path: '/singer',
    name: 'Singer',
    component: () => import('@/views/singer'),
    children: [
      {
        path: 'detail/:id',
        name: 'SingerDetail',
        component: () => import('@/views/singer/detail'),
        meta: {
          title: '歌手详情'
        }
      }
    ],
    meta: {
      title: '歌手'
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
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search'),
    meta: {
      title: '搜索'
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
