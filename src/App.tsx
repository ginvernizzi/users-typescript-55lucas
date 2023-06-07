import { useEffect, useMemo, useRef, useState } from "react"
import UsersList from "./components/UsersList"
import { User } from "./types.d"

function App () {
  const [users, setUsers] = useState<Array<User>>([])
  const [orderByCountry, setOrderByCountry] = useState(false) //ordenar por pais
  const [filter, setFilter] = useState('')
  const usersOriginal = useRef<User[]>([])

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then(res => res.json())
      .then(data => {
        setUsers(data.results)
        usersOriginal.current = data.results
      })
      .catch(error => console.log("se pudrio todo", error))
  }, [])

  const assignOrderByCOuntry = () => {
    setOrderByCountry(!orderByCountry)
  }

  ///////////////////////
  const filterByCountry = useMemo(() => {
    console.log("filtrar por pais, term", filter)
    if (filter !== '' && filter.length >= 1) {
      const userWithFilter = [...users].filter((u) => u.location.country.toLowerCase().startsWith(filter.toLocaleLowerCase()))
      if (userWithFilter === undefined) {
        return users
      } else {
        return userWithFilter
      }
    } else {
      return users
    }
  }, [filter, users])

  const orderUserByCountry = useMemo(() => {
    console.log("ordernar por pais")
    if (orderByCountry) {
      return filterByCountry.sort((a: User, b: User) => a.location.country.localeCompare(b.location.country))
    } else {
      return filterByCountry
    }
  }, [orderByCountry, filterByCountry])
  ///////////////////////


  const enableFilterByCountry = (e) => {
    console.log("seteo filter")
    setFilter(e.target.value)
  }

  const deleteUser = (id: string) => {
    console.log("Delete user")
    setUsers(users.filter((u) => u.login.uuid !== id))
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
      <UsersList users={orderUserByCountry}
        assignOrderByCOuntry={assignOrderByCOuntry}
        orderByCountry={orderByCountry}
        deleteUser={deleteUser}
        resetUsers={resetUsers}
        filterByCountry={enableFilterByCountry} />
    </>
  )
}

export default App
