import Head from 'next/head'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NotePencil, Trash } from 'phosphor-react'
import { formatDistanceToNow } from 'date-fns'

import {
  Form,
  FormWrapper,
  Header,
  InputWrapper,
  MainBox,
  MainContainer,
  PostContent,
  PostTitle,
  PostWrapper,
} from '@/styles/pages/main'
import { Button } from '@/components/Button'

const postDataSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  content: z.string().nonempty({ message: 'Content is required' }),
})

type postDataType = z.infer<typeof postDataSchema>

export default function Main() {
  const { register, watch, handleSubmit } = useForm<postDataType>({
    resolver: zodResolver(postDataSchema),
  })

  function handleCreatePost({ title, content }: postDataType) {
    console.log('{ title, content } =>', { title, content })
  }

  const isButtonDisabled: boolean = !!(
    watch('title')?.length === 0 ||
    !watch('title') ||
    watch('content')?.length === 0 ||
    !watch('content')
  )

  return (
    <>
      <Head>
        <title>Main | CodeLeap</title>
      </Head>

      <MainContainer>
        <Header>CodeLeap Network</Header>
        <MainBox>
          <FormWrapper>
            <h2>What`s on your mind?</h2>
            <Form onSubmit={handleSubmit(handleCreatePost)}>
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
              <Button
                type="submit"
                variant="primary"
                disabled={isButtonDisabled}
              >
                Create
              </Button>
            </Form>
          </FormWrapper>

          <PostWrapper>
            <PostTitle>
              <h3>My First Post at CodeLeap Network!</h3>
              <span className="postButtonBox">
                <Trash size={22} weight="bold" />
                <NotePencil size={22} weight="bold" />
              </span>
            </PostTitle>
            <PostContent>
              <span>
                <strong>@Victor</strong>
                <p>
                  {formatDistanceToNow(
                    new Date('2023-04-26T14:27:00.236480Z'),
                    {
                      addSuffix: true,
                    },
                  )}
                </p>
              </span>
              <p>
                Curabitur suscipit suscipit tellus. Phasellus consectetuer
                vestibulum elit. Pellentesque habitant morbi tristique senectus
                et netus et malesuada fames ac turpis egestas. Maecenas egestas
                arcu quis ligula mattis placerat. Duis vel nibh at velit
                scelerisque suscipit. Duis lobortis massa imperdiet quam. Aenean
                posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu
                sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel
                sem. Nullam cursus lacinia erat.
              </p>
            </PostContent>
          </PostWrapper>
        </MainBox>
      </MainContainer>
    </>
  )
}
