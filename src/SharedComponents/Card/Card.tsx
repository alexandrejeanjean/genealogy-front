import React from 'react'
import deletePic from '../../assets/delete.svg'
import './card.scss'

type TCard = {
  text: any
  picture: any
  handleClick: () => any
  handleDelete: () => any
}

const Card = ({ text, handleClick, handleDelete, picture }: TCard) => {
  return (
    <div className='card-wrapper'>
      <button className='card' onClick={() => handleClick()}>
        <img src={picture} alt='' />
        {text}
      </button>
      <button className='delete-btn' onClick={() => handleDelete()}>
        <img src={deletePic} alt='delete button' />
      </button>
    </div>
  )
}

export default Card
