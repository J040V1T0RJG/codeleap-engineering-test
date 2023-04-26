import { styled } from '@/styles'

export const Button = styled('button', {
  all: 'unset',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '7.5rem',
  height: '2rem',
  borderRadius: '8px',

  cursor: 'pointer',

  fontWeight: 700,
  fontSize: '1rem',
  lineHeight: '20px',
  textAlign: 'center',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$blue500',
        border: '1px solid $blue500',
        color: '$white',

        '&:disabled': {
          backgroundColor: '$gray500',
          border: '1px solid $gray500',
        },
      },
      cancel: {
        backgroundColor: 'transparent',
        border: '1px solid $gray500',
      },
      delete: {
        backgroundColor: '$red500',
        border: '1px solid $red500',
        color: '$white',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})
