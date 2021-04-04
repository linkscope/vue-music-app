/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-29 09:57:26
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-29 11:14:12
 */
import { createUseStyles } from 'vue-jss'
import { Color, Font } from '@/assets/variables'
import { noWrap } from '@/assets/mixin'

const useStyle = createUseStyles({
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 200,
    backgroundColor: Color['$color-background-dark'],
    '& .wrapper': {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: '#f2f2f2'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    padding: '20px 30px 10px 20px'
  },
  headerIcon: {
    marginRight: 10,
    fontSize: 30
  },
  headerText: {
    flex: 1,
    fontSize: Font['$font-size-small'],
    color: Color['$color-theme-dark']
  },
  headerClear: {
    fontSize: Font['$font-size-medium'],
    color: Color['$color-text-dark']
  },
  section: {
    maxHeight: 240,
    overflow: 'hidden'
  },
  sectionListItem: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    padding: '0 30px 0 20px',
    overflow: 'hidden'
  },
  sectionListItemCurrentIcon: {
    flex: '0 0 30px',
    width: 30,
    fontSize: Font['$font-size-medium']
  },
  sectionListItemText: {
    ...(noWrap as any),
    flex: 1,
    fontSize: Font['$font-size-small'],
    color: Color['$color-text-dark']
  },
  sectionListItemFavoriteIcon: {
    marginRight: 15,
    fontSize: Font['$font-size-big']
  },
  sectionListItemDeleteIcon: {
    fontSize: Font['$font-size-big']
  },
  close: {
    textAlign: 'center',
    height: 50,
    lineHeight: '50px',
    backgroundColor: Color.$white,
    fontSize: Font['$font-size-medium'],
    color: Color['$color-text-dark']
  },
  transitionActive: {
    transition: 'opacity .3s',
    '& .wrapper': {
      transition: 'all .3s'
    }
  },
  transitionEnter: {
    opacity: 0,
    '& .wrapper': {
      transform: 'translate3d(0, 100%, 0)'
    }
  },
  listTransitionActive: {
    transition: 'all 0.1s linear'
  },
  listTransitionEnter: {
    height: 0
  }
})

export default useStyle
