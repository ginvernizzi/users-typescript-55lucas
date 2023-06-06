import { useState } from 'react'
import { User } from '../types.d'

interface Prop {
  users: User[]
  assignOrderByCOuntry: () => void,
  orderByCountry: boolean,
  deleteUser: (id: string) => void,
  resetUsers: () => void,
  filterByCountry: (e: any) => void
}

const UsersList = ({ users, orderByCountry, assignOrderByCOuntry, deleteUser, resetUsers, filterByCountry }: Prop) => {
  const [colors, setColors] = useState(false)

  const toggleColors = () => {
    setColors(!colors)
  }

  return (
    <div className=''>
      <header className='header-userlist'>
        <button onClick={toggleColors}>Colorear files</button>
        <button onClick={() => assignOrderByCOuntry()}>{orderByCountry ? "Dejar de ordenar" : "Ordenar por pais"} </button>
        <button onClick={() => resetUsers()}>Reseatar usuarios </button>
        <input onChange={filterByCountry} type="text" name="country" />
      </header>
      <section>
        <table className={colors ? 'table-striped' : ''}>
          <thead>
            <tr>
              <td>Foto</td>
              <td>Nombre</td>
              <td>Apellido</td>
              <td>Pais</td>
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody className='bicolor'>
            {
              users.map((u) =>
                <tr key={u.login.uuid}>
                  <td><img src={u.picture.thumbnail} alt="foto usuario" /></td>
                  <td>{u.name.first}</td>
                  <td>{u.name.last}</td>
                  <td>{u.location.country}</td>
                  <td><button onClick={() => deleteUser(u.login.uuid)}>Eliminar</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default UsersList