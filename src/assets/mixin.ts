/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 14:18:12
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-28 14:26:09
 */
const noWrap = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
}

const extendClick = {
  position: 'relative',
  '&:before': {
    content: '',
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px'
  }
}

function backgroundImg(url: string) {
  return {
    backgroundImage: `url(${url}@2x.png)`,
    '@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)': {
      backgroundImage: `url(${url}@3x.png)`
    }
  }
}

export { noWrap, extendClick, backgroundImg }
