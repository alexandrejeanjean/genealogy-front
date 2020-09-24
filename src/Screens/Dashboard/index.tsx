import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Main from '../Theme/index'
import apiClient from '../../api'
import ListWrapper from '../../SharedComponents/ListWrapper/ListWrapper'
import FamilyForm from './FamilyForm'
import './dashboard.scss'

type TFamily = {
  id: number
  name: string
}

type TGetFamilies = TFamily[]

function Dashboard() {
  const [list, setList] = useState<TGetFamilies>([])
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const getFamilies = async () => {
    try {
      const response = await apiClient.get('/families')
      console.log('response', response)
      const families = response.data
      console.log('families :: ', families)
      if (families) {
        setList(families)
      }
    } catch (err) {
      if (err && err.response) {
        const axiosError = err
        console.log('Error :: get families', axiosError.response)
        return axiosError.response.data
      }

      throw err
    }
  }

  useEffect(() => {
    getFamilies()
  }, [])

  const deleteFamily = async (family: TFamily) => {
    const familyId: number = family.id
    try {
      const response = await apiClient.delete(`/families/${familyId}`)
      console.log('removed :: ', response)
      if (response) getFamilies()
    } catch (err) {
      if (err && err.response) {
        const axiosError = err
        console.log('Error :: delete family', axiosError.response)
        return axiosError.response.data
      }
      throw err
    }
  }

  const createFamily = async (family: { name: string }) => {
    console.log('family :: ', family)

    try {
      const response = await apiClient.post(`/families`, { name: family.name })
      console.log('create family :: ', response)
      if (response) getFamilies()
    } catch (err) {
      if (err && err.response) {
        const axiosError = err
        console.log('Error :: create family', axiosError.response)
        setErrorMsg(
          'Sorry, an error occured. Please try again or contact us if problem persists.'
        )
        return axiosError.response.data
      }
      throw err
    }
  }

  const goTo = (familyId: number) => {
    return history.push({
      pathname: '/family',
      state: { datas: familyId },
    })
  }

  return (
    <Main pageTitle='Dashboard'>
      <section>
        <ListWrapper
          datas={list}
          handleClick={(familyId: number) => goTo(familyId)}
          handleDelete={(family: TFamily) => deleteFamily(family)}
        />
        <Container fluid>
          <button className='new-item-btn' onClick={() => setModalShow(true)}>
            New
          </button>
        </Container>

        <FamilyForm
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleSubmit={createFamily}
          errorMsg={errorMsg}
        />
        {errorMsg && <p className='error-text ml-5'>{errorMsg}</p>}
      </section>
    </Main>
  )
}

export default Dashboard
