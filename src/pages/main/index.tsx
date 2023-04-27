'use client'

import Head from 'next/head'
import { SignOut } from 'phosphor-react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'

import { Header, MainBox, MainContainer } from '@/styles/pages/main'
import { api } from '@/libs/axios'
import { AuthContext } from '@/contexts/AuthContext'
import { AxiosResponse } from 'axios'
import { Post } from '@/components/Post'
import { CreatePostForm } from '@/components/CreatePostForm'

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
    // eslint-disable-next-line no-unused-vars
    error,
    isLoading,
  } = useSWR('/', (url) =>
    api.get(url).then((response: AxiosResponse<MainProps>) => response.data),
  )

  if (typeof window !== 'undefined') {
    const isThereUser = localStorage.getItem(
      '@codeleap-engineering-test:auth-1.0.0',
    )
    if (!isThereUser) {
      push('/signup')
    }
  }

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
          <CreatePostForm accountOwnerName={usernameData} />

          {postsData?.results.map((post) => {
            return (
              <Post key={post.id} accountOwnerName={usernameData} {...post} />
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
