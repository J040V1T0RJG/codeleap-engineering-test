import { styled } from '..'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)',
})

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

export const Title = styled(Dialog.Title, {
  fontWeight: 700,
  fontSize: '1.375rem',
  lineHeight: '26px',
})

export const CloseButton = styled(Dialog.Close, {})

export const DeleteAlertWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '41.25rem',

  background: '$white',
  border: '1px solid $gray300',
  borderRadius: '1rem',
  padding: '1.5rem',
  marginTop: '1.5rem',
  gap: '3rem',
})

export const ButtonWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',

  marginLeft: 'auto',
})
