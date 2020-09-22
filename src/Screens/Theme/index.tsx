import React from 'react'
import Navbar from '../../SharedComponents/Navbar'
import { UserContext } from '../../store/UserProvider'
import './theme.scss'

type Props = {
  children: any
  isLogged?: boolean
}

function Main({ children, isLogged }: Props) {
  return (
    <>
      <UserContext.Consumer>
        {(value) => <Navbar isLogged={value.isLogged} />}
      </UserContext.Consumer>
      <main className='main-theme-wrapper'>{children}</main>
    </>
  )
}

export default Main
