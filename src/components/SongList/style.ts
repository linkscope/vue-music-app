/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-04 10:56:55
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 16:39:17
 */
import { createUseStyles } from 'vue-jss'
import { Font, Color } from '@/assets/variables'
import { noWrap, backgroundImg } from '@/assets/mixin'
import { compile } from 'vue'

const useStyle = createUseStyles({
  container: {
    position: 'fixed',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 6,
    zIndex: 20
  },
  icon: {
    padding: 10,
    height: 18,
    width: 18
  },
  title: {
    ...(noWrap as any),
    zIndex: 20,
    position: 'absolute',
    top: 0,
    left: '10%',
    width: '80%',
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: Font['$font-size-medium'],
    color: '#fff'
  },
  backgroundImgWrapper: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingTop: '70%',
    transformOrigin: 'top',
    backgroundSize: 'cover'
  },
  playContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    bottom: 20,
    transform: 'translateX(-50%)',
    width: 135,
    padding: '5px 10px',
    textAlign: 'center',
    boxSizing: 'border-box',
    border: '1px solid #3754fd',
    borderRadius: 100,
    fontSize: 0,
    zIndex: 5
  },
  playIcon: {
    marginRight: 6,
    width: 20,
    height: 20
  },
  playText: {
    fontSize: Font['$font-size-smaller'],
    color: '#3754fd'
  },
  backgroundFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(7, 17, 27, 0.4)'
  },
  contentWrapper: {
    position: 'relative',
    height: '100%'
  },
  songListContainer: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: '100%'
  },
  songItem: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: 64
  },
  songRank: {
    flex: '0 0 25px',
    width: 25,
    marginRight: 30,
    textAlign: 'center'
  },
  songRankText: {
    color: Color['$color-theme'],
    fontSize: Font['$font-size-bigger']
  },
  songContent: {
    flex: 1,
    lineHeight: '20px',
    overflow: 'hidden'
  },
  songItemName: {
    ...(noWrap as any),
    color: Color['$color-text'],
    fontSize: Font['$font-size-small']
  },
  songItemDesc: {
    ...(noWrap as any),
    marginTop: 4,
    color: Color['$color-text-dark'],
    fontSize: Font['$font-size-smaller']
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
