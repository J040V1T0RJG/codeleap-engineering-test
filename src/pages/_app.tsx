import { AuthProvider } from '@/contexts/AuthContext'
import { PostsProvider } from '@/contexts/PostContext'
import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PostsProvider>
        <Component {...pageProps} />
      </PostsProvider>
    </AuthProvider>
  )
}
