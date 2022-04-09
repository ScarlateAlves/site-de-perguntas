import React, { createContext, ReactNode, useEffect, useState } from 'react'

import { auth,firebase } from '../service/firebase';

type AuthType = {
  user: UseProps | undefined
  singInWithGoogle: () => Promise<void>
}

type UseProps = {
  id: string
  name: string
  avatar: string
}

type AuthContextProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthType)

export function AuthContextProvider(props: AuthContextProps) {
  const [user, setUSer] = useState<UseProps>()

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { uid, displayName, photoURL } = user

        if(!displayName || !photoURL) {
          throw new Error('Error no google')
        }

        setUSer({ id: uid, name: displayName, avatar: photoURL })
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

 async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider

    const result = await auth.signInWithPopup(provider)
      if(result.user){
        const { displayName, photoURL, uid } = result.user

        if(!displayName || !photoURL) {
          throw new Error('Error no google')
        }

        setUSer({ id: uid, name: displayName, avatar: photoURL })
      }
  }
  return(
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {props.children}
     </AuthContext.Provider>
  )
}