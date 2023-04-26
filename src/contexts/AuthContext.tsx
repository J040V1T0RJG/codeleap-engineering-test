import { ReactNode, createContext } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

type AuthContextType = {
  isUserAuthenticated: () => boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  function isUserAuthenticated(): boolean {
    const storedStateAsJSON = localStorage.getItem(
      '@codeleap-engineering-test:auth-1.0.0',
    )

    if (!storedStateAsJSON) {
      return false
    }

    return true
  }

  return (
    <AuthContext.Provider value={{ isUserAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
