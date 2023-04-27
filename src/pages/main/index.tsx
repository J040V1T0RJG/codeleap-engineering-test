'use client'

import Head from 'next/head'
import { SignOut } from 'phosphor-react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { GetServerSideProps } from 'next'

import {
  ErrorMessage,
  Header,
  MainBox,
  MainContainer,
} from '@/styles/pages/main'
import { AuthContext } from '@/contexts/AuthContext'
import { Post } from '@/components/Post'
import { CreatePostForm } from '@/components/CreatePostForm'
import { PostSkeleton } from '@/components/Post/PostSkeleton'
import { PostsContext } from '@/contexts/PostContext'

export default function Main() {
  const { push } = useRouter()
  const { usernameData, logout } = useContext(AuthContext)
  const { postsData, error, isLoading } = useContext(PostsContext)

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
          <CreatePostForm accountOwnerName={usernameData} />

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
                <Post key={post.id} accountOwnerName={usernameData} {...post} />
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
