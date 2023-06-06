import { useEffect, useState } from "react"
import { User } from "./types"
import UsersList from "./components/UsersList"

function App() {
  const [users, setUsers] = useState<Array<User>>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(data => setUsers(data.results))
      .catch(error => console.log("se pudrio todo", error))
  }, [])

  return (
    <>
      <UsersList users={users} />
    </>
  )
}

export default App
