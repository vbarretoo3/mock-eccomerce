import React, { useContext, useState, useEffect } from 'react';
import { auth } from './Firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider( {children } ) {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState()

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(email)
  }

  function changeEmail(email) {
    return updateEmail(currentUser, email)
  }

  function changePassword(password) {
    return updatePassword(currentUser, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(true)
    })

    return unsubscribe
  }, [])

  const value = {
    signup,
    logIn,
    logout,
    resetPassword,
    currentUser,
    changeEmail,
    changePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {loading && children}
    </AuthContext.Provider>
  )
}
