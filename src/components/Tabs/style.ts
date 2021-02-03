/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-01-28 17:42:26
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-03 10:13:50
 */
import { createUseStyles } from 'vue-jss'
import { Font, Color } from '@/assets/variables'

const style = createUseStyles({
  container: {
    display: 'flex',
    height: 44,
    lineHeight: '44px',
    fontSize: Font['$font-size-smaller']
  },
  item: {
    flex: 1,
    textAlign: 'center'
  },
  routerActive: {
    color: Color['$color-theme'],
    borderBottom: `2px solid ${Color['$color-theme']}`
  }
})

export default style
