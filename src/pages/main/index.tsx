import Head from 'next/head'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NotePencil, Trash } from 'phosphor-react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'

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
import { GetServerSideProps } from 'next'
import { api } from '@/libs/axios'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

const postDataSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  content: z.string().nonempty({ message: 'Content is required' }),
})

type postDataType = z.infer<typeof postDataSchema>

interface MainProps {
  posts: {
    count: number
    next: any
    previous: any
    results: {
      id: number
      username: string
      created_datetime: string
      title: string
      content: string
    }[]
  }
}

export default function Main({ posts }: MainProps) {
  const { isFallback, push } = useRouter()
  const { usernameData } = useContext(AuthContext)
  const { register, watch, handleSubmit } = useForm<postDataType>({
    resolver: zodResolver(postDataSchema),
  })

  async function handleCreatePost({ title, content }: postDataType) {
    try {
      await api.post('/', { title, content, username: usernameData?.username })
    } catch (error) {
      console.error(error)
    }
  }

  const isButtonDisabled: boolean = !!(
    watch('title')?.length === 0 ||
    !watch('title') ||
    watch('content')?.length === 0 ||
    !watch('content')
  )

  function Redirect() {
    useEffect(() => {
      push('/signup')
    }, [])

    return <></>
  }

  if (!usernameData) {
    return <Redirect />
  }

  if (isFallback) {
    return (
      <>
        <p>carregando...</p>
      </>
    )
  }

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

          {posts.results.map((post) => {
            return (
              <PostWrapper key={post.id}>
                <PostTitle>
                  <h3>{post.title}</h3>
                  {usernameData?.username === post.username && (
                    <span className="postButtonBox">
                      <Trash size={22} weight="bold" />
                      <NotePencil size={22} weight="bold" />
                    </span>
                  )}
                </PostTitle>
                <PostContent>
                  <span>
                    <strong>{post.username}</strong>
                    <p>
                      {formatDistanceToNow(new Date(post.created_datetime), {
                        addSuffix: true,
                      })}
                    </p>
                  </span>
                  <p>{post.content}</p>
                </PostContent>
              </PostWrapper>
            )
          })}
        </MainBox>
      </MainContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data }: { data: MainProps } = await api.get('/')

  return {
    props: { posts: data },
  }
}
