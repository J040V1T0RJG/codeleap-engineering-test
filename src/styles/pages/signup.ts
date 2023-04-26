import { styled } from '@/styles'

export const SignUpContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: '$gray100',
})

export const FormWrapper = styled('div', {
  width: '31.25rem',
  padding: '1.5rem',

  background: '$white',
  border: '1px solid $gray300',
  borderRadius: '1rem',

  h2: {
    fontWeight: 700,
    fontSize: '1.375rem',
    lineHeight: '26px',
  },
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  marginTop: '1.5rem',
  gap: '2rem',

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
})
