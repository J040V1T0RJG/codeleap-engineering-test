import { z } from 'zod'
import { BeatLoader } from 'react-spinners'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import { api } from '@/libs/axios'
import { Button } from '../Button'
import {
  Form,
  FormWrapper,
  InputWrapper,
} from '@/styles/components/createPostForm'

const postDataSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  content: z.string().nonempty({ message: 'Content is required' }),
})

type postDataType = z.infer<typeof postDataSchema>

interface CreatePostFormProps {
  accountOwnerName: { username: string } | null
  refreshPosts: () => void
}

export function CreatePostForm({
  accountOwnerName,
  refreshPosts,
}: CreatePostFormProps) {
  const { register, watch, handleSubmit, reset } = useForm<postDataType>({
    resolver: zodResolver(postDataSchema),
  })
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)

  async function handleCreatePost({ title, content }: postDataType) {
    try {
      setIsButtonLoading(true)
      await api.post('/', {
        title,
        content,
        username: accountOwnerName?.username,
      })
      refreshPosts()
    } catch (error) {
      console.error(error)
    } finally {
      reset()
      setIsButtonLoading(false)
    }
  }

  const isButtonDisabled: boolean = !!(
    watch('title')?.length === 0 ||
    !watch('title') ||
    watch('content')?.length === 0 ||
    !watch('content')
  )

  return (
    <FormWrapper>
      <h2>What`s on your mind?</h2>
      <Form onSubmit={handleSubmit(handleCreatePost)}>
        <InputWrapper>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Hello world" {...register('title')} />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Content here"
            {...register('content')}
          />
        </InputWrapper>
        <Button
          type="submit"
          variant="primary"
          disabled={isButtonDisabled || isButtonLoading}
        >
          {isButtonLoading ? <BeatLoader color="#fff" /> : 'Create'}
        </Button>
      </Form>
    </FormWrapper>
  )
}
