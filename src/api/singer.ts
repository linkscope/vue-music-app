/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 17:40:52
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-23 10:39:33
 */
import request from './request'
import Api from './api'
import { ISinger, ISong } from '@/types'

export function getSingerList(
  limit: number
): Promise<{
  artists: ISinger[]
}> {
  return request({
    url: Api.getSingerList,
    method: 'get',
    params: {
      limit
    }
  })
}

export function getSongList(
  id: number,
  offset?: number,
  order = 'hot'
): Promise<{
  songs: ISong[]
  total: number
}> {
  return request({
    url: Api.getSongList,
    method: 'get',
    params: {
      id,
      offset,
      order
    }
  })
}

export function checkSong(
  id: number
): Promise<{
  success: boolean
}> {
  return request({
    url: Api.checkSong,
    method: 'get',
    params: {
      id
    }
  })
}

export function getSongUrl(
  id: number
): Promise<{
  data: {
    url: string
  }[]
}> {
  return request({
    url: Api.getSongUrl,
    method: 'get',
    params: {
      id
    }
  })
}

export function getSongDetail(
  ids: string
): Promise<{
  songs: ISong[]
}> {
  return request({
    url: Api.getSongDetail,
    method: 'get',
    params: {
      ids
    }
  })
}

export function getLyric(
  id: string | number
): Promise<{
  lrc: {
    lyric: string
  }
}> {
  return request({
    url: Api.getLyric,
    method: 'get',
    params: {
      id
    }
  })
}
