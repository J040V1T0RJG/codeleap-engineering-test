import Image from 'next/image'

import logoImage from '@/assets/logo.svg'
import { HomeContainer } from '@/styles/pages/home'

export default function Home() {
  return (
    <HomeContainer>
      <Image src={logoImage} alt={''} />
    </HomeContainer>
  )
}
