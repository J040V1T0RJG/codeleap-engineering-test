import Head from 'next/head'
import { GetStaticProps } from 'next'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormWrapper,
  InputWrapper,
  SignUpContainer,
} from '@/styles/pages/signup'
import { Button } from '@/components/Button'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { AuthContext } from '@/contexts/AuthContext'

const signUpDataSchema = z.object({
  username: z
    .string()
    .nonempty({ message: 'Username is required' })
    .transform((name) => {
      return name.trim()
    }),
})

type signUpDataType = z.infer<typeof signUpDataSchema>

export default function SignUp() {
  const { push } = useRouter()
  const { authenticateUser } = useContext(AuthContext)
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit, watch } = useForm<signUpDataType>({
    resolver: zodResolver(signUpDataSchema),
  })

  function handleRegisterUserName({ username }: signUpDataType) {
    const stateJSON = JSON.stringify({ username })
    localStorage.setItem('@codeleap-engineering-test:auth-1.0.0', stateJSON)
    setLoading(true)
    authenticateUser({ username })
    push('/main')
  }

  const isButtonDisabled: boolean = !!(
    watch('username')?.length === 0 || !watch('username')
  )

  return (
    <>
      <Head>
        <title>SignUp | CodeLeap</title>
      </Head>

      <SignUpContainer>
        <FormWrapper>
          <h2>Welcome to CodeLeap network!</h2>
          <Form onSubmit={handleSubmit(handleRegisterUserName)}>
            <InputWrapper>
              <label htmlFor="username">Please enter your username</label>
              <input
                type="text"
                {...register('username')}
                placeholder="John doe"
              />
            </InputWrapper>

            <Button
              type="submit"
              variant="primary"
              disabled={isButtonDisabled || loading}
            >
              {loading ? <BeatLoader color="#fff" /> : 'ENTER'}
            </Button>
          </Form>
        </FormWrapper>
      </SignUpContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  }
}
