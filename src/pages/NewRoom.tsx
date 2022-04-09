import React, { FormEvent, useState } from 'react'

import { Link, useNavigate } from '@reach/router'

import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import { Button } from '../components/Button'

import { database } from '../service/firebase'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'

export function NewRoom() {

  const location = useNavigate()
  const { user } = useAuth()
  const [ newRoow, setNewRoow ] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    //verificando se está vazio o campo
    if(newRoow.trim() === '') {
      return;
    }

    //criando sala no firebase
    const roomRef = database.ref('rooms') 

    //enviando os dados para o firebase
    const firebaseRoow = await roomRef.push({
      title: newRoow,
      authorId: user?.id
    })

    //navegando em uma rota
    location(`/rooms/${firebaseRoow.key}`)
      
  }

  return(
    <div id="page-auth">
    <aside>
        <img src={illustration} alt='logo'></img>
        <strong>Toda pergunta tem uma resposta</strong>
        <p>Aprende e compartilhe conhecimento com outras pessoas</p>
    </aside>
    <main>
        <div className='main-content'>
            <img src={logo} alt='logoLetme'/>
            <h2>Crie uma nova sala</h2>
            <form onSubmit={handleCreateRoom}>
                <input 
                    type='text' 
                    placeholder='Nome da sala' 
                    onChange={event => setNewRoow(event.target.value)} 
                    value={newRoow} />
                <Button type='submit'>
                    Criar sala
                </Button> 
            </form>
            <p>Quer entrar em uma sala existente <Link to='/'>click aqui</Link></p>
        </div>
    </main>
</div>
  )
}