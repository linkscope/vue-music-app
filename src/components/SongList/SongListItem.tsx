/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-03-11 10:17:08
 * @LastEditors: linkscope
 * @LastEditTime: 2021-03-11 10:17:09
 */
import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

import { ISong } from '@/types'
import { Color, Font } from '@/assets/variables'
import { noWrap } from '@/assets/mixin'

const useStyle = createUseStyles({
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
  }
})

export default defineComponent({
  name: 'SongListItem',
  props: {
    isRank: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    song: {
      type: Object as PropType<ISong>,
      required: true
    },
    onSelectSong: {
      type: Function as PropType<(index: number) => void>,
      default: () => ''
    },
    index: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup(props) {
    const classesRef = useStyle()

    const getSongDesc = (song: ISong) => {
      const artists: string[] = []
      song.ar.forEach((item) => artists.push(item.name))
      return `${artists.join('/')} - ${song.al.name}`
    }

    return () => {
      const classes = classesRef.value
      const { isRank, song, onSelectSong, index } = props
      return (
        <li class={classes.songItem} onClick={() => onSelectSong(index)}>
          {isRank ? (
            <div class={classes.songRank}>
              <span class={classes.songRankText}>{index + 1}</span>
            </div>
          ) : (
            ''
          )}
          <div class={classes.songContent}>
            <h2 class={classes.songItemName}>{song.name}</h2>
            <p class={classes.songItemDesc}>{getSongDesc(song)}</p>
          </div>
        </li>
      )
    }
  }
})
