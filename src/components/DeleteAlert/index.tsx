import * as Dialog from '@radix-ui/react-dialog'
import { BeatLoader } from 'react-spinners'
import { useState } from 'react'

import { api } from '@/libs/axios'
import { Button } from '../Button'
import {
  ButtonWrapper,
  CloseButton,
  Content,
  DeleteAlertWrapper,
  Overlay,
  Title,
} from '@/styles/components/deleteAlert'

interface DeleteAlertProps {
  postId: number
  refreshPosts: () => void
}

export function DeleteAlert({ postId, refreshPosts }: DeleteAlertProps) {
  const [loading, setLoading] = useState<boolean>(false)

  async function handleDeletePost() {
    try {
      setLoading(true)
      await api.delete(`/${postId}/`)
      refreshPosts()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <DeleteAlertWrapper>
          <Title>Are you sure you want to delete this item?</Title>

          <ButtonWrapper>
            <CloseButton asChild>
              <Button type="button" variant="cancel">
                Cancel
              </Button>
            </CloseButton>
            <Button
              onClick={() => handleDeletePost()}
              variant="delete"
              disabled={loading}
            >
              {loading ? <BeatLoader color="#fff" /> : 'Delete'}
            </Button>
          </ButtonWrapper>
        </DeleteAlertWrapper>
      </Content>
    </Dialog.Portal>
  )
}
