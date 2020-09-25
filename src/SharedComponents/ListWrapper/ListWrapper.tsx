import React from 'react'
import Card from '../Card/Card'
import family from '../../assets/family.svg'
import './listWrapper.scss'

type TListWrapper = {
  datas: any
  children?: any
  handleClick: (id: number) => void
  handleDelete: (item: any) => void
}

const ListWrapper = ({
  datas,
  children,
  handleClick,
  handleDelete,
}: TListWrapper) => {
  return (
    <div className='list-item-wrapper'>
      <ul className='list-items'>
        {datas &&
          datas.map((item: any, i: number) => (
            <li key={i + `_person`}>
              <Card
                picture={family}
                text={item.name || item.firstname}
                handleClick={() => handleClick(item.id)}
                handleDelete={() => handleDelete(item)}
              />
            </li>
          ))}
        <li>{children}</li>
      </ul>
    </div>
  )
}

export default ListWrapper
