import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: '#fff',
      black: '#000',

      blue500: '#7695EC',

      gray100: '#DDDDDD',
      gray300: '#CCCCCC',
      gray500: '#999999',
      gray700: '#777777',

      red500: '#FF5151',

      green500: '#47B960',
    },
  },
})
