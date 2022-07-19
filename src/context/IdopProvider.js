import React from 'react'

const IdopContext = React.createContext();

function IdopProvider({children,user,signOut,amplifyUser,user_group,setPoID,setSoID}) {

  return (
    <IdopContext.Provider value={{
      user,
      signOut,
      amplifyUser,
      user_group,
      setPoID,
      setSoID
    }}>
      {children}
  </IdopContext.Provider>
  )
}

export { IdopContext, IdopProvider}