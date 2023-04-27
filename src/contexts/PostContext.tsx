import { api } from '@/libs/axios'
import { AxiosError, AxiosResponse } from 'axios'
import { ReactNode, createContext } from 'react'
import useSWR from 'swr'

interface PostsProviderProps {
  children: ReactNode
}

type PostsDataType = {
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

type AuthContextType = {
  postsData: PostsDataType | undefined
  error: AxiosError | undefined
  isLoading: boolean
  mutate: () => void
}

export const PostsContext = createContext({} as AuthContextType)

export function PostsProvider({ children }: PostsProviderProps) {
  const {
    data: postsData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    '/',
    (url) =>
      api
        .get(url)
        .then((response: AxiosResponse<PostsDataType>) => response.data),
    { refreshInterval: 60 * 1000 },
  )

  return (
    <PostsContext.Provider value={{ postsData, error, isLoading, mutate }}>
      {children}
    </PostsContext.Provider>
  )
}
