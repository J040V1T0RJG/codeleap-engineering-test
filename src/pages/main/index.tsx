import Head from 'next/head'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NotePencil, Trash } from 'phosphor-react'
import { formatDistanceToNow } from 'date-fns'
import * as Dialog from '@radix-ui/react-dialog'

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
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { BeatLoader } from 'react-spinners'
import { EditItemModal } from '@/components/EditItemModal'

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
  // const { isFallback, push } = useRouter()
  const { usernameData } = useContext(AuthContext)
  const [loading, setLoading] = useState<boolean>(false)
  const { register, watch, handleSubmit, reset } = useForm<postDataType>({
    resolver: zodResolver(postDataSchema),
  })

  async function handleCreatePost({ title, content }: postDataType) {
    try {
      setLoading(true)
      await api.post('/', { title, content, username: usernameData?.username })
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

  // function Redirect() {
  //   useEffect(() => {
  //     push('/signup')
  //   }, [])

  //   return <></>
  // }

  // console.log('isFallback ==>', isFallback)
  // if (isFallback) {
  //   return (
  //     <>
  //       <p>carregando...</p>
  //     </>
  //   )
  // }

  // console.log('!usernameData ==>', !usernameData)
  // if (!usernameData) {
  //   return <Redirect />
  // }

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
                disabled={isButtonDisabled || loading}
              >
                {loading ? <BeatLoader color="#fff" /> : 'Create'}
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
  const { data }: { data: MainProps } = await api.get('/')

  return {
    props: { posts: data },
  }
}
