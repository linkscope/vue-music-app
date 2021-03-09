/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-08 17:25:58
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-09 15:00:53
 */
import request from './request'
import Api from './api'

import { ISong, ISinger, IPlayList } from '@/types'

type searchType = 'songs' | 'artists' | 'albums' | 'playlists'
export type searchSuggestType = {
  order: searchType[]
  songs?: ISong[]
  artists?: ISinger[]
  playlists?: IPlayList[]
  albums?: IPlayList[]
}

export function getHotKeyList(): Promise<{
  result: {
    hots: {
      first: string
    }[]
  }
}> {
  return request({
    url: Api.getHotKeyList,
    method: 'get'
  })
}

// songs, artists, albums, playlists
export function searchSuggest(
  keywords: string
): Promise<{
  result: searchSuggestType
}> {
  return request({
    url: Api.searchSuggest,
    method: 'get',
    params: {
      keywords
    }
  })
}
