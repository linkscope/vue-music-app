/*
 * @Description:
 * @Author: linkscope
 * @Date: 2021-02-23 10:52:41
 * @LastEditors: linkscope
 * @LastEditTime: 2021-02-24 10:00:07
 */
class LyricParser {
  lrc: string
  lines: {
    txt: string
    time: number
  }[]

  constructor(
    lyric: string,
    lyricChange?: (line: { lineNum: number; txt: string }) => void
  ): LyricParser
  play: () => void
  togglePlay: () => void
  stop: () => void
  seek: (time: number) => void
}

export default LyricParser
