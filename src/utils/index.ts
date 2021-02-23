/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-04 10:37:30
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-22 16:29:27
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

export function getRandom(max: number, min: number) {
  return (Math.random() * (max - min + 1) + min) | 0
}

// 洗牌
export function shuffleArray(arr: any[]) {
  const newArr = [...arr]
  for (let i = 0, len = newArr.length; i < len; i++) {
    const random = getRandom(0, i)
    const temp = newArr[i]
    newArr[i] = newArr[random]
    newArr[random] = temp
  }
  return newArr
}
