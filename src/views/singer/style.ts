/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 18:56:19
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-02 15:55:33
 */
import { createUseStyles } from 'vue-jss'

const style = createUseStyles({
  container: {
    position: 'fixed',
    top: '194px',
    bottom: 0,
    width: '100%'
  },
  scrollView: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  shortcutWrapper: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 99
  }
})

export default style
