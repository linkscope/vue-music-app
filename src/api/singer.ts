/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 17:40:52
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 17:52:45
 */
import request from './request'
import Api from './api'
import { ISinger } from '@/types'

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
