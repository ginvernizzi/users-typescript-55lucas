import { useEffect, useRef, useState } from "react"
import UsersList from "./components/UsersList"
import { User, UserColumnsOrder } from "./types.d"

function App () {
  const [users, setUsers] = useState<Array<User>>([])
  const [orderByCountry, setOrderByCountry] = useState(false)
  const usersOriginal = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(data => {
        setUsers(data.results)
        usersOriginal.current = data.results
      })
      .catch(error => console.log("se pudrio todo", error))


  }, [])

  const assignOrderByCOuntry = () => {
    console.log("ordernar por pais")
    setOrderByCountry(!orderByCountry)
  }

  const deleteUser = (id: Uint8Array) => {
    console.log("Delete user")
    setUsers(users.filter((u) => u.login.uuid !== id))
  }

  const orderUserByCountry = () => {
    if (orderByCountry) {
      return [...users].sort((a: User, b: User) => a.location.country.localeCompare(b.location.country))
    } else {
      return users
    }
  }

  const resetUsers = () => {
    setUsers(usersOriginal.current)
  }

  // const orderUsers = () => {
  //   if (orderBy === UserColumnsOrder.none) {
  //     return users
  //   }
  //   if (orderBy === UserColumnsOrder.nombre) {
  //     return [...users].sort((a: User, b: User) => a.name.first.localeCompare(b.name.first))
  //   }
  //   if (orderBy === UserColumnsOrder.apellido) {
  //     return [...users].sort((a: User, b: User) => a.name.last.localeCompare(b.name.last))
  //   }
  //   if (orderBy === UserColumnsOrder.pais) {
  //     return [...users].sort((a: User, b: User) => a.location.country.localeCompare(b.location.country))
  //   }
  //   return users
  // }

  return (
    <>
      <h1>Prueba tecnica</h1>
      <UsersList users={orderUserByCountry()}
        assignOrderByCOuntry={assignOrderByCOuntry}
        orderByCountry={orderByCountry}
        deleteUser={deleteUser}
        resetUsers={resetUsers} />
    </>
  )
}

export default App
