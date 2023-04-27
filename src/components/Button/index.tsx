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
          backgroundColor: '$gray700',
          border: '1px solid $gray700',
        },
      },
      cancel: {
        backgroundColor: 'transparent',
        border: '1px solid $gray700',
      },
      delete: {
        backgroundColor: '$red500',
        border: '1px solid $red500',
        color: '$white',

        '&:disabled': {
          backgroundColor: '$gray700',
          border: '1px solid $gray700',
        },
      },
      save: {
        backgroundColor: '$green500',
        border: '1px solid $green500',
        color: '$white',

        '&:disabled': {
          backgroundColor: '$gray700',
          border: '1px solid $gray700',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})
