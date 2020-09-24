import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Main from '../Theme/index'
import ListWrapper from '../../SharedComponents/ListWrapper/ListWrapper'
import apiClient from '../../api/index'

import './family.scss'

type TPerson = {
  id: number
  familyId: number
  generationId: number
  firstname: string
  lastname: string
}
type TGeneration = {
  id: number
  position: number
  familyId: number
  peoples: TPerson[]
}

type TGetGenerations = TGeneration[]

interface TFamilyProps {
  location: { state: { datas: number } }
}

function Family({ location }: any) {
  const history = useHistory()
  const [genList, setGenerationList] = useState<TGetGenerations>([])

  const getFamilyGenerations = async (familyId: number) => {
    try {
      const response = await apiClient.get(`/families/${familyId}/generations`)
      const generation = response.data
      console.log('generation :: ', generation)
      if (generation) {
        let list = generation
        setGenerationList(list)
      }
    } catch (err) {
      if (err && err.response) {
        const axiosError = err
        console.log('Error :: get generation', axiosError.response)
        return axiosError.response.data
      }

      throw err
    }
  }

  useEffect(() => {
    if (location?.state?.datas) {
      getFamilyGenerations(location.state.datas)
    }
  }, [location])

  const deletePersonFromFamily = async (person: TPerson) => {
    console.log(person)
    const familyId: number = person.familyId
    const generationId: number = person.generationId
    const personId: number = person.id

    try {
      const response = await apiClient.delete(
        `/families/${familyId}/generations/${generationId}/peoples/${personId}`
      )
      console.log('removed :: ', response)
      if (response) getFamilyGenerations(location.state.datas)
    } catch (err) {
      if (err && err.response) {
        const axiosError = err
        console.log('Error :: delete family', axiosError.response)
        return axiosError.response.data
      }
      throw err
    }
  }

  const renderGenerations = () => {
    return (
      genList &&
      genList.map((gen: TGeneration, i: number) => {
        return (
          <div className='generations-wrapper' key={gen.position}>
            <h2>Génération : {gen.position}</h2>
            <ListWrapper
              datas={gen.peoples}
              handleClick={() => console.log('click')}
              handleDelete={(person: TPerson) => deletePersonFromFamily(person)}
            />
          </div>
        )
      })
    )
  }

  return (
    <Main pageTitle='Family'>
      <button className='btn-primary back-btn' onClick={() => history.goBack()}>
        {`< Back`}
      </button>
      {renderGenerations()}
    </Main>
  )
}

export default Family
