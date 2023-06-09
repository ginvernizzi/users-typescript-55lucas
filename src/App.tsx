import { SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import UsersList from "./components/UsersList"
import { User, UserColumnsOrder } from "./types.d"

function App () {
  const [users, setUsers] = useState<Array<User>>([])
  const [orderBy, setOrderBy] = useState(UserColumnsOrder.none) //ordenar por pais
  const [filter, setFilter] = useState('')
  const usersOriginal = useRef<User[]>([])

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then(res => res.json())
      .then(data => {
        setUsers(data.results)
        usersOriginal.current = data.results
      })
      .catch(error => console.log("se pudrio todo", error))
  }, [])

  const assignOrderByCountry = (columnOrder: UserColumnsOrder) => {
    setOrderBy(prev => {
      return columnOrder
    })
  }

  ///////////////////////
  const filterByCountry = useMemo(() => {
    console.log("filtrar por pais, term", filter)
    if (filter !== '' && filter.length >= 1) {
      return users.filter((u) => u.location.country.toLowerCase().startsWith(filter.toLocaleLowerCase()))
    } else {
      return users
    }
  }, [filter, users])

  const orderUserBy = useMemo(() => {
    const columnActionOrder = {
      country: () => [...filterByCountry].sort((a: User, b: User) => a.location.country.localeCompare(b.location.country)),
      name: () => [...filterByCountry].sort((a: User, b: User) => a.name.first.localeCompare(b.name.first)),
      last: () => [...filterByCountry].sort((a: User, b: User) => a.name.last.localeCompare(b.name.last))
    }

    console.log({ orderBy })

    if (orderBy === 'none') { return [...filterByCountry] }
    if (orderBy === 'name') { return [...filterByCountry].sort((a: User, b: User) => a.name.first.localeCompare(b.name.first)) }
    if (orderBy === 'last') { return [...filterByCountry].sort((a: User, b: User) => a.name.last.localeCompare(b.name.last)) }
    if (orderBy === 'country') { return [...filterByCountry].sort((a: User, b: User) => a.location.country.localeCompare(b.location.country)) }

    return filterByCountry

  }, [orderBy, filterByCountry])
  ///////////////////////

  // const orderByColumn(columnOrder: UserColumnsOrder) => {

  //   const columnActionOrder = {
  //     country: () => [...filterByCountry].sort((a: User, b: User) => a.location.country.localeCompare(b.location.country)),
  //     name: () => [...filterByCountry].sort((a: User, b: User) => a.name.first.localeCompare(b.name.first)),
  //     last: () => [...filterByCountry].sort((a: User, b: User) => a.name.last.localeCompare(b.name.last))
  //   } 

  //   return columnActionOrder.name
  // }


  const enableFilterByCountry = (e: { target: { value: SetStateAction<string> } }) => {
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
      <UsersList users={orderUserBy}
        assignOrderByCountry={assignOrderByCountry}
        orderBy={orderBy}
        deleteUser={deleteUser}
        resetUsers={resetUsers}
        filterByCountry={enableFilterByCountry} />
    </>
  )
}

export default App
