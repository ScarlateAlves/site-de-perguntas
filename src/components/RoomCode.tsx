import React from 'react'


import copy from '../assets/images/copy.svg'

import '../styles/romm-code.scss'


type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {

  //copiar codigo
function copyRoomCode() {
  navigator.clipboard.writeText(props.code)
}

  return(
      <button className='room-code' onClick={copyRoomCode}>
        <div>
          <img src={copy} alt='copy' />
        </div>
        <span>Sala #{props.code}</span>
      </button>
  )
}