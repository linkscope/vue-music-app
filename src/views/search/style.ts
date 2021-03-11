/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-08 16:32:39
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-11 10:53:48
 */
import { createUseStyles } from 'vue-jss'
import { Color, Font } from '@/assets/variables'

const useStyle = createUseStyles({
  searchContainer: {
    margin: 20
  },
  container: {
    position: 'fixed',
    top: 274,
    bottom: 0,
    width: '100%',
    overflow: 'hidden'
  },
  searchListContainer: {
    height: '100%',
    overflow: 'hidden'
  },
  hotKeyContainer: {
    margin: '0 20px 20px 20px'
  },
  hotKeyTitle: {
    marginBottom: 20,
    fontSize: Font['$font-size-small'],
    color: Color['$color-text-dark']
  },
  hotKeyItem: {
    display: 'inline-block',
    padding: '5px 10px',
    margin: '0 20px 10px 0',
    borderRadius: 6,
    backgroundColor: Color['$color-highlight-background'],
    fontSize: Font['$font-size-small']
  },
  loadingContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 50,
    backgroundColor: Color['$color-background-dark']
  }
})

export default useStyle
