import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GetStaticProps } from 'next'

import logoImage from '@/assets/logo.svg'
import { HomeContainer } from '@/styles/pages/home'

export default function Home() {
  const { push } = useRouter()

  if (typeof window !== 'undefined') {
    const isThereUser = localStorage.getItem(
      '@codeleap-engineering-test:auth-1.0.0',
    )
    if (!isThereUser) {
      push('/signup')
    } else {
      push('/main')
    }
  }

  return (
    <HomeContainer>
      <Image src={logoImage} alt={''} />
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  }
}
