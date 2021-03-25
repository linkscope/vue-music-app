/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 18:26:10
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-15 10:22:17
 */
import { RouteLocation, NavigationFailure } from 'vue-router'

// router-link客制化标签时slot传过来的类型
export interface IRouterLinkSlot {
  route: import('vue').ComputedRef<
    RouteLocation & {
      href: string
    }
  >
  href: import('vue').ComputedRef<string>
  isActive: import('vue').ComputedRef<boolean>
  isExactActive: import('vue').ComputedRef<boolean>
  navigate: (e?: MouseEvent) => Promise<void | NavigationFailure>
}

export interface IStore {
  isLoading: boolean
  singerInfo: {
    id: number
    title: string
    avatar: string
  } | null
  isPlaying: boolean
  isFullScreen: boolean
  playList: ISong[]
  sequenceList: ISong[]
  playMode: 'sequence' | 'loop' | 'random'
  playingIndex: number
  searchHistory: string[]
}

export interface IBanner {
  bannerId: string
  pic: string
  url: string | null
}

export interface IRecommend {
  id: number
  name: string
  copywriter: string
  picUrl: string
}

export interface IPlayList {
  coverImgUrl: string
  id: number
  description: string
  name: string
  trackIds: {
    id: number
  }[]
}

export interface IAlbum {
  id: number
  name: string
  picUrl: string
  artist: ISinger
}

export interface ISinger {
  id: number
  name: string
  img1v1Url: string
}

export interface ISong {
  id: number
  name: string
  ar: {
    id: number
    name: string
  }[]
  al: {
    id: number
    name: string
    picUrl?: string
  }
}

export interface IRank {
  coverImgUrl: string
  description: string
  id: number
  name: string
}
