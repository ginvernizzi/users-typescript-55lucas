import React from 'react'
import { User } from '../types'

interface Prop {
  users: User[]
}

const UsersList = ({ users }: Prop) => {
  return (
    <>
      <header className='header-userlist'>

      </header>
      <section>
        <table className='table-userlist'>
          <thead>
            <tr>
              <td>Foto</td>
              <td>Nombre</td>
              <td>Apellido</td>
              <td>Pais</td>
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody>
            {
              users.map((u) =>
                <tr key={u.login.uuid}>
                  <td><img src={u.picture.thumbnail} alt="foto usuario" /></td>
                  <td>{u.name.first}</td>
                  <td>{u.name.last}</td>
                  <td>{u.location.country}</td>
                  <td><button>Eliminar</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    </>
  )
}

export default UsersList