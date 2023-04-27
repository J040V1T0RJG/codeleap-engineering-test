import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',

  img: {
    maxWidth: '50rem',
    width: '100%',
  },
})
