/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:45:00
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 21:56:21
 */
import request from './request'
import Api from './api'
import { IBanner } from '@/types'

export function getBannerList(
  type: number
): Promise<{
  code: number
  banners: IBanner[]
}> {
  return request({
    url: Api.getBanner,
    method: 'get',
    params: {
      type
    }
  })
}
