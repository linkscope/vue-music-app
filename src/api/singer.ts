/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 17:40:52
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-03 20:18:36
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
