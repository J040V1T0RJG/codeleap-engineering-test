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

      gray500: '#777777',

      red500: '#FF5151',

      green500: '#47B960',
    },
  },
})
