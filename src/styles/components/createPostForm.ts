import { styled } from '..'

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
