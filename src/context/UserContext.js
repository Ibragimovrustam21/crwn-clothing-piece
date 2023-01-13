import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.component";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    // onAuthStateChangedListener bu shunday listenerki biz sign in or sign out qilganimizda bu buni darhola sezib 
    // bizga malumot bera olarkan
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user) // bu googleSignIn qilish un (set firestore)

      setCurrentUser(user) // user => object(data) or null bo`lishi mn
    })

    return unsubscribe
  }, [])


  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}