/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-08 17:25:58
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-11 10:35:10
 */
import request from './request'
import Api from './api'

import { ISong, ISinger, IPlayList, IAlbum } from '@/types'

type searchSuggestOrderType = 'songs' | 'artists' | 'albums' | 'playlists'
type searchOrderType = 'song' | 'artist' | 'album' | 'playlist'

export type searchSuggestType = {
  order: searchSuggestOrderType[]
  songs?: ISong[]
  artists?: ISinger[]
  playlists?: IPlayList[]
  albums?: IAlbum[]
}

export type searchType = {
  orders: searchOrderType[]
  song?: ISong[]
  artist?: ISinger[]
  playlist?: IPlayList[]
  album?: IAlbum[]
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

export function search(
  keywords: string
): Promise<{
  result: searchType
}> {
  return request({
    url: Api.search,
    method: 'get',
    params: {
      keywords
    }
  })
}

export function searchSongs(
  keywords: string,
  offset = 0,
  limit = 30
): Promise<{
  result: {
    songCount: number
    songs: ISong[]
  }
}> {
  return request({
    url: Api.searchSongs,
    method: 'get',
    params: {
      keywords,
      offset,
      limit
    }
  })
}

export function getAlbum(
  id: number
): Promise<{
  album: IAlbum
  songs: ISong[]
}> {
  return request({
    url: Api.getAlbums,
    method: 'get',
    params: {
      id
    }
  })
}
