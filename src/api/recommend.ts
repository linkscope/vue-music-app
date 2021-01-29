/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:45:00
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 13:49:10
 */
import request from './request'
import Api from './api'
import { IBanner, IRecommend } from '@/types'

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

export function getRecommendList(): Promise<{
  result: IRecommend[]
}> {
  return request({
    url: Api.getRecommendList,
    method: 'get'
  })
}
