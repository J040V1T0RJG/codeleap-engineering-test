import { styled } from '..'

export const MainContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '$gray100',
})

export const Header = styled('header', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '50rem',
  width: '100%',
  height: '5rem',

  backgroundColor: '$blue500',
  paddingLeft: '2.375rem',
  paddingRight: '2.375rem',
  color: '$white',

  h1: {
    fontWeight: 700,
    fontSize: '1.375rem',
    lineHeight: '26px',
  },

  svg: {
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
})

export const MainBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '50rem',
  width: '100%',
  minHeight: '100vh',

  backgroundColor: 'White',
  gap: '1.5rem',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  paddingBottom: '3rem',
})

export const ErrorMessage = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  marginTop: '3rem',

  p: {
    fontWeight: 700,
    fontSize: '1.5rem',
    color: '$red500',
  },
})
