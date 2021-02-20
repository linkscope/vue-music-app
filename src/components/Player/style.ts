/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-19 09:44:36
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-20 10:51:40
 */
import { createUseStyles } from 'vue-jss'
import { Color, Font } from '@/assets/variables'
import { noWrap } from '@/assets/mixin'

const useStyle = createUseStyles({
  normalContainer: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 150,
    backgroundColor: Color['$color-background']
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.6,
    filter: 'blur(20px)'
  },
  header: {
    position: 'relative',
    marginBottom: 25
  },
  headerBack: {
    position: 'absolute',
    top: 0,
    left: 6,
    zIndex: 50,
    padding: 9,
    width: 18,
    height: 18,
    transform: 'rotate(-90deg)'
  },
  headerTitle: {
    ...(noWrap as any),
    width: '70%',
    margin: '0 auto',
    lineHeight: '40px',
    textAlign: 'center',
    fontSize: Font['$font-size-medium'],
    color: Color.$white
  },
  headerSubTitle: {
    lineHeight: '20px',
    textAlign: 'center',
    fontSize: Font['$font-size-small'],
    color: Color.$white
  },
  content: {
    position: 'fixed',
    width: '100%',
    top: 80,
    bottom: 170,
    whiteSpace: 'nowrap',
    fontSize: 0
  },
  contentLeft: {
    display: 'inline-block',
    verticalAlign: 'top',
    position: 'relative',
    height: 0,
    width: '100%',
    paddingTop: '80%'
  },
  contentAlbumWrapper: {
    position: 'absolute',
    top: 0,
    left: '10%',
    width: '80%',
    height: '100%'
  },
  contentAlbum: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: '10px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '50%'
  },
  albumImg: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)',
    borderRadius: '50%'
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%'
  },
  footerOperators: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    boxSizing: 'border-box',
    '& .icon': {
      height: 50,
      width: 50
    },
    '& .center': {
      width: 100,
      height: 100
    }
  },
  miniContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 150,
    width: '100%',
    height: 60,
    backgroundColor: Color.$white
  },
  miniAlbumImg: {
    flex: '0 0 30px',
    width: 30,
    margin: '0 10px 0 20px',
    borderRadius: '50%'
  },
  miniDesc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    lineHeight: '20px',
    overflow: 'hidden',
    '& h2': {
      ...noWrap,
      marginBottom: 2,
      fontSize: Font['$font-size-small'],
      color: Color['$color-text']
    },
    '& p': {
      ...noWrap,
      fontSize: Font['$font-size-smaller'],
      color: Color['$color-text-dark']
    }
  },
  miniOperators: {
    flex: '0 0 30px',
    padding: '0 20px',
    '& .center': {
      width: 30,
      height: 30
    }
  },
  normalEnterActive: {
    transition: 'all 0.4s',
    '& .header-0-1-7, & .footer-0-1-16': {
      transition: 'all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)'
    }
  },
  normalEnter: {
    opacity: 0,
    '& .header-0-1-7': {
      transform: 'translate3d(0, -100px, 0)'
    },
    '& .footer-0-1-16': {
      transform: 'translate3d(0, 100px, 0)'
    }
  },
  miniEnterActive: {
    transition: 'all 0.4s'
  },
  miniEnter: {
    opacity: 0
  }
})

export default useStyle
