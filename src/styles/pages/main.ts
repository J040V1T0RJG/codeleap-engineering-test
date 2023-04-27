import { styled } from '..'

export const MainContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '$gray100',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  width: '50rem',
  height: '5rem',

  backgroundColor: '$blue500',
  paddingLeft: '2.375rem',

  fontWeight: 700,
  fontSize: '1.375rem',
  lineHeight: '26px',
  color: '$white',

  '@media (max-width: 50rem)': {
    width: '100%',
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
