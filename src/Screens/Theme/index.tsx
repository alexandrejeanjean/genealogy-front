import React from 'react'
import Navbar from '../../SharedComponents/Navbar'
import { UserContext } from '../../store/UserProvider'
import PageTitle from '../../SharedComponents/PageTitle/PageTitle'
import './theme.scss'

type Props = {
  children: any
  isLogged?: boolean
  pageTitle?: string
}

function Main({ children, isLogged, pageTitle }: Props) {
  return (
    <>
      <UserContext.Consumer>
        {(value) => <Navbar isLogged={value.isLogged} />}
      </UserContext.Consumer>
      <main className='main-theme-wrapper'>
        <PageTitle pageTitle={pageTitle} />
        {children}
      </main>
    </>
  )
}

export default Main
