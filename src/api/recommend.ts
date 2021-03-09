/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 21:45:00
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-08 15:39:46
 */
import request from './request'
import Api from './api'
import { IBanner, IRecommend, IPlayList } from '@/types'

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
  limit = 20
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
  playlist: IPlayList
}> {
  return request({
    url: Api.getReccomendDetail,
    method: 'get',
    params: {
      id
    }
  })
}
