'use client'

import Head from 'next/head'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NotePencil, SignOut, Trash } from 'phosphor-react'
import { formatDistanceToNow } from 'date-fns'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { BeatLoader } from 'react-spinners'
import { useContext, useState } from 'react'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'

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
import { api } from '@/libs/axios'
import { AuthContext } from '@/contexts/AuthContext'
import { EditItemModal } from '@/components/EditItemModal'
import { DeleteAlert } from '@/components/DeleteAlert'
import { AxiosResponse } from 'axios'

const postDataSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  content: z.string().nonempty({ message: 'Content is required' }),
})

type postDataType = z.infer<typeof postDataSchema>

interface MainProps {
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

export default function Main() {
  const { push } = useRouter()
  const {
    data: postsData,
    error,
    isLoading,
  } = useSWR('/', (url) =>
    api.get(url).then((response: AxiosResponse<MainProps>) => response.data),
  )
  const { usernameData, logout } = useContext(AuthContext)
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const { register, watch, handleSubmit, reset } = useForm<postDataType>({
    resolver: zodResolver(postDataSchema),
  })

  console.log('useSWR data =>', postsData)
  console.log('useSWR error =>', error)
  console.log('useSWR isLoading =>', isLoading)

  async function handleCreatePost({ title, content }: postDataType) {
    try {
      setIsButtonLoading(true)
      await api.post('/', { title, content, username: usernameData?.username })
    } catch (error) {
      console.error(error)
    } finally {
      reset()
      setIsButtonLoading(false)
    }
  }

  if (typeof window !== 'undefined') {
    const isThereUser = localStorage.getItem(
      '@codeleap-engineering-test:auth-1.0.0',
    )
    if (!isThereUser) {
      push('/signup')
    }
  }

  const isButtonDisabled: boolean = !!(
    watch('title')?.length === 0 ||
    !watch('title') ||
    watch('content')?.length === 0 ||
    !watch('content')
  )

  if (isLoading) {
    console.log('carregando')
  }

  return (
    <>
      <Head>
        <title>Main | CodeLeap</title>
      </Head>

      <MainContainer>
        <Header>
          <h1>CodeLeap Network</h1>
          <SignOut
            size={32}
            weight="bold"
            onClick={() => {
              logout()
              push('/signup')
            }}
          />
        </Header>
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
                disabled={isButtonDisabled || isButtonLoading}
              >
                {isButtonLoading ? <BeatLoader color="#fff" /> : 'Create'}
              </Button>
            </Form>
          </FormWrapper>

          {postsData?.results.map((post) => {
            return (
              <PostWrapper key={post.id}>
                <PostTitle>
                  <h3>{post.title}</h3>
                  {usernameData?.username === post.username && (
                    <span className="postButtonBox">
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <Trash size={22} weight="bold" />
                        </Dialog.Trigger>
                        <DeleteAlert postId={post.id} />
                      </Dialog.Root>

                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <NotePencil size={22} weight="bold" />
                        </Dialog.Trigger>
                        <EditItemModal postId={post.id} />
                      </Dialog.Root>
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
  return {
    props: {},
  }
}
