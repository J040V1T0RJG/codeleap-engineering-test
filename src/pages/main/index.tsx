'use client'

import Head from 'next/head'
import { SignOut } from 'phosphor-react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'

import {
  ErrorMessage,
  Header,
  MainBox,
  MainContainer,
} from '@/styles/pages/main'
import { api } from '@/libs/axios'
import { AuthContext } from '@/contexts/AuthContext'
import { AxiosResponse } from 'axios'
import { Post } from '@/components/Post'
import { CreatePostForm } from '@/components/CreatePostForm'
import { PostSkeleton } from '@/components/Post/PostSkeleton'

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
  const { usernameData, logout } = useContext(AuthContext)
  const {
    data: postsData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    '/',
    (url) =>
      api.get(url).then((response: AxiosResponse<MainProps>) => response.data),
    { refreshInterval: 60 * 1000 },
  )

  if (typeof window !== 'undefined') {
    const isThereUser = localStorage.getItem(
      '@codeleap-engineering-test:auth-1.0.0',
    )
    if (!isThereUser) {
      push('/signup')
    }
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
          <CreatePostForm
            accountOwnerName={usernameData}
            refreshPosts={mutate}
          />

          {error ? (
            <ErrorMessage>
              <p>An error occurred while fetching the posts.</p>
            </ErrorMessage>
          ) : isLoading ? (
            [1, 2, 3].map((element) => {
              return <PostSkeleton key={element} />
            })
          ) : (
            postsData?.results.map((post) => {
              return (
                <Post
                  key={post.id}
                  accountOwnerName={usernameData}
                  {...post}
                  refreshPosts={mutate}
                />
              )
            })
          )}
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
