import React from 'react'

type Props = {
  pageTitle?: string
}

const PageTitle = ({ pageTitle }: Props) =>
  pageTitle ? (
    <div className='title-wrapper'>
      <h1>{pageTitle}</h1>
    </div>
  ) : null

export default PageTitle
