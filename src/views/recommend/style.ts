/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-29 13:32:43
 * @LastEditors: linkscope
 * @LastEditTime: 2021-01-29 15:35:27
 */
import { createUseStyles } from 'vue-jss'
import { Font, Color } from '@/assets/variables'

const style = createUseStyles({
  container: {
    position: 'fixed',
    width: '100%',
    top: 194,
    bottom: 0
  },
  scrollViewWrapper: {
    height: '100%',
    overflow: 'hidden'
  },
  bannerContainer: {
    width: '100%',
    overflow: 'hidden'
  },
  recommendTitle: {
    height: 65,
    lineHeight: '65px',
    textAlign: 'center',
    fontSize: Font['$font-size-small'],
    color: Color['$color-theme'],
    margin: 0
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)'
  }
})

export default style
