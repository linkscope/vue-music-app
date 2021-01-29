/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 18:56:19
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 19:02:10
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
  }
})

export default style
