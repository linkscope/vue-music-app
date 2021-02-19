/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-19 15:53:25
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-19 16:27:37
 */

declare module 'create-keyframe-animation' {
  interface IAnimation {
    registerAnimation: (config: IRegisterAnimationConfig) => void
    runAnimation: (element: Element, name: string, done: () => void) => void
    unregisterAnimation: (name: string) => void
  }
  interface IRegisterAnimationConfig {
    name?: string
    animation?: any
    presets?: {
      duration?: number
      easing?: string
    }
  }
  const animation = ''
  export default animation as IAnimation
}
