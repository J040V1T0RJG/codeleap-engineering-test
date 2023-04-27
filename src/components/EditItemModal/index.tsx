import {
  ButtonWrapper,
  CloseButton,
  Content,
  Form,
  FormWrapper,
  InputWrapper,
  Overlay,
} from '@/styles/components/EditItemModal'
import * as Dialog from '@radix-ui/react-dialog'
import { z } from 'zod'
import { Button } from '../Button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BeatLoader } from 'react-spinners'
import { api } from '@/libs/axios'

const postDataSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  content: z.string().nonempty({ message: 'Content is required' }),
})

type postDataType = z.infer<typeof postDataSchema>

export function EditItemModal({ postId }: { postId: number }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { register, watch, handleSubmit, reset } = useForm<postDataType>({
    resolver: zodResolver(postDataSchema),
  })

  async function handleEditPost({ title, content }: postDataType) {
    console.log('{ title, content } =>', { title, content })

    try {
      setLoading(true)
      await api.patch(`/${postId}/`, { title, content })
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
          <h2>Edit item</h2>
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
