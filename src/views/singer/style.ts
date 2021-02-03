/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 18:56:19
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-03 10:14:40
 */
import { createUseStyles } from 'vue-jss'
import { Font } from '@/assets/variables'

const style = createUseStyles({
  container: {
    position: 'fixed',
    top: '194px',
    bottom: 0,
    width: '100%',
    overflow: 'hidden'
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
  },
  titleFixedWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  titleFixed: {
    height: 30,
    lineHeight: '30px',
    paddingLeft: 20,
    fontSize: Font['$font-size-smaller'],
    backgroundColor: 'rgb(240, 240, 240)'
  }
})

export default style
