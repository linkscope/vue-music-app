/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-24 14:45:06
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 14:49:12
 */
import request from './request'
import Api from './api'

import { IRank } from '@/types'

export function getTopList(): Promise<{
  list: IRank[]
}> {
  return request({
    url: Api.getTopList,
    method: 'get'
  })
}
