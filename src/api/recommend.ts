/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:45:00
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 14:14:34
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

export function getRecommendList(
  limit = 100
): Promise<{
  result: IRecommend[]
}> {
  return request({
    url: Api.getRecommendList,
    method: 'get',
    params: {
      limit
    }
  })
}

export function getRecommendDetail(
  id: number
): Promise<{
  playlist: {
    coverImgUrl: string
    id: number
    description: string
    name: string
    trackIds: {
      id: number
    }[]
  }
}> {
  return request({
    url: Api.getReccomendDetail,
    method: 'get',
    params: {
      id
    }
  })
}
