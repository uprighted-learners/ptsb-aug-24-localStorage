import { useState, useEffect } from 'react'
import './App.css'
import Auth from './components/Auth'
import AllTeams from './components/AllTeams'

function App() {

  const [sessionToken, setSessionToken] = useState(undefined)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
    console.log(sessionToken)
  }, [sessionToken])

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  }

  const logoutUser = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
      setSessionToken(undefined)
    }
  }

  const showLogoutBtn = () => !sessionToken ? null : (
    <button onClick={logoutUser}>Logout</button>
  )

  const handleView = () => {
    return !sessionToken
      ? <Auth updateLocalStorage={updateLocalStorage} />
      : <AllTeams sessionToken={sessionToken} />
  }

  return (
    <>
      {showLogoutBtn()}
      {handleView()}
    </>
  )
}

export default App
