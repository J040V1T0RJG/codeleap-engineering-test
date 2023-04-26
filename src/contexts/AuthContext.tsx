import { ReactNode, createContext, useEffect, useState } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

type UsernameType = {
  username: string
}

type AuthContextType = {
  usernameData: UsernameType | null
  authenticateUser: ({ username }: UsernameType) => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [usernameData, setUsernameData] = useState<UsernameType | null>(null)

  useEffect(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@codeleap-engineering-test:auth-1.0.0',
    )
    if (storedStateAsJSON) {
      const storedStateAsObject: UsernameType = JSON.parse(storedStateAsJSON)
      setUsernameData(storedStateAsObject)
    }
  }, [])

  function authenticateUser({ username }: UsernameType) {
    const stateJSON = JSON.stringify({ username })
    localStorage.setItem('@codeleap-engineering-test:auth-1.0.0', stateJSON)
    setUsernameData({ username })
  }

  return (
    <AuthContext.Provider value={{ authenticateUser, usernameData }}>
      {children}
    </AuthContext.Provider>
  )
}
