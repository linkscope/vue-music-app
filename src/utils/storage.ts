/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-15 23:13:49
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-15 23:18:55
 */
const prefix = 'NET_EAST_MUSIC'

export function setItem(key: string, value: any, pre?: string) {
  if (typeof value === 'object') {
    localStorage.setItem(`${pre || prefix}_${key}`, JSON.stringify(value))
  } else {
    localStorage.setItem(`${pre || prefix}_${key}`, value)
  }
}

export function getItem(key: string, pre?: string) {
  let storage: any
  try {
    storage = JSON.parse(localStorage.getItem(`${pre || prefix}_${key}`)!)
  } catch {
    storage = localStorage.getItem(`${pre || prefix}_${key}`)
  }
  return storage
}
