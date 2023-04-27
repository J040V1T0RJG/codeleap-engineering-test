import * as Dialog from '@radix-ui/react-dialog'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BeatLoader } from 'react-spinners'

import { api } from '@/libs/axios'
import { Button } from '../Button'
import {
  ButtonWrapper,
  CloseButton,
  Content,
  Form,
  FormWrapper,
  InputWrapper,
  Overlay,
  Title,
} from '@/styles/components/EditItemModal'

const postDataSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  content: z.string().nonempty({ message: 'Content is required' }),
})

type postDataType = z.infer<typeof postDataSchema>

interface EditItemMotalProps {
  postId: number
  refreshPosts: () => void
}

export function EditItemModal({ postId, refreshPosts }: EditItemMotalProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const { register, watch, handleSubmit, reset } = useForm<postDataType>({
    resolver: zodResolver(postDataSchema),
  })

  async function handleEditPost({ title, content }: postDataType) {
    try {
      setLoading(true)
      await api.patch(`/${postId}/`, { title, content })
      refreshPosts()
    } catch (error) {
      console.error(error)
    } finally {
      reset()
      setLoading(false)
    }
  }

  const isButtonDisabled: boolean = !!(
    watch('title')?.length === 0 ||
    !watch('title') ||
    watch('content')?.length === 0 ||
    !watch('content')
  )

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <FormWrapper>
          <Title>Edit item</Title>
          <Form onSubmit={handleSubmit(handleEditPost)}>
            <InputWrapper>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Hello world"
                {...register('title')}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                placeholder="Content here"
                {...register('content')}
              />
            </InputWrapper>

            <ButtonWrapper>
              <CloseButton asChild>
                <Button type="button" variant="cancel">
                  Cancel
                </Button>
              </CloseButton>
              <Button
                type="submit"
                variant="save"
                disabled={isButtonDisabled || loading}
              >
                {loading ? <BeatLoader color="#fff" /> : 'Save'}
              </Button>
            </ButtonWrapper>
          </Form>
        </FormWrapper>
      </Content>
    </Dialog.Portal>
  )
}
