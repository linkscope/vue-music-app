/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 18:26:10
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 21:55:21
 */
import { RouteLocation, NavigationFailure } from 'vue-router'

// router-link客制化标签时slot传过来的类型
export interface IRouterLinkSlot {
  route: import('vue').ComputedRef<
    RouteLocation & {
      href: string
    }
  >
  href: import('vue').ComputedRef<string>
  isActive: import('vue').ComputedRef<boolean>
  isExactActive: import('vue').ComputedRef<boolean>
  navigate: (e?: MouseEvent) => Promise<void | NavigationFailure>
}

export interface IBanner {
  bannerId: string
  pic: string
  url: string | null
}
