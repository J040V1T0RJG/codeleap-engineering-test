import { styled } from '..'

export const PostWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const PostTitle = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  minHeight: '4.375rem',

  background: '$blue500',
  color: '$white',
  borderRadius: '16px 16px 0px 0px',
  padding: '1.5rem',

  h3: {
    fontWeight: 700,
    fontSize: '1.375rem',
    lineHeight: '26px',
  },

  '.postButtonBox': {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',

    svg: {
      cursor: 'pointer',
      transition: 'all .2s ease-in-out',

      '&:hover': {
        transform: 'scale(1.2)',
      },
    },
  },
})

export const PostContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  gap: '1rem',

  borderRight: '1px solid $gray500',
  borderLeft: '1px solid $gray500',
  borderBottom: '1px solid $gray500',
  borderRadius: '0px 0px 16px 16px',

  p: {
    fontSize: '1.125rem',
    lineHeight: '22px',
  },

  '> span': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    color: '$gray700',

    strong: {
      fontWeight: 700,
    },
  },
})
