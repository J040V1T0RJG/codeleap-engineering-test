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

/// /////////////////

export const FormWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  background: '$white',
  border: '1px solid $gray300',
  borderRadius: '1rem',
  padding: '1.5rem',
  marginTop: '1.5rem',
  gap: '1.5rem',

  h2: {
    fontWeight: 700,
    fontSize: '1.375rem',
    lineHeight: '26px',
  },
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',

  '> :last-child': {
    marginLeft: 'auto',
  },
})

export const InputWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  label: {
    fontSize: '1rem',
    lineHeight: '20px',
  },

  input: {
    background: '&white',
    border: '1px solid $gray700',
    borderRadius: '8px',
    padding: '0.5rem',
  },

  textarea: {
    minHeight: '4.625rem',
    background: '&white',
    border: '1px solid $gray700',
    borderRadius: '8px',
    padding: '0.5rem',
  },
})
