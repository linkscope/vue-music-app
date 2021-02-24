/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-24 15:44:28
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 15:48:47
 */
import { createUseStyles } from 'vue-jss'

const useStyle = createUseStyles({
  container: {
    position: 'fixed',
    width: '100%',
    top: 194,
    bottom: 0
  },
  rankListContainer: {
    height: '100%',
    overflow: 'hidden'
  }
})

const useDetailStyle = createUseStyles({
  slideActive: {
    transition: 'all 0.3s'
  },
  slideTo: {
    transform: 'translate3d(100%, 0, 0)'
  }
})

export { useDetailStyle }
export default useStyle
