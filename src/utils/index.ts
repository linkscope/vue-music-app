/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-04 10:37:30
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-04 10:46:44
 */

// 自动判断浏览器前缀
export function transformStyle(style: string) {
  const transformName = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  const div = document.createElement('div')

  for (const key in transformName) {
    if ((div as any)[transformName[key as keyof typeof transformName]] !== undefined) {
      return key !== 'standard' ? `${key}${style.charAt(0).toUpperCase()}${style.substr(1)}` : style
    }
  }

  return style
}
