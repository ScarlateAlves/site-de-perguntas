import React, { FormEvent, useEffect, useState } from 'react'

import { useParams } from '@reach/router'

import logo from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../service/firebase'

type Parans = {
  id: string
}

type FirebaseQuestion = {

}

export function Room() {
 const parans = useParams<Parans>()
 const { user } = useAuth()
 const [newQuestion, setNewQuestion] = useState('')

 const id = parans.id

 useEffect(() => {
   const roomRef = database.ref(`rooms/${id}`)

   roomRef.once('value', room => {
    const databaseRoom = room.val()
    const firebaseQuestion: FirebaseQuestion = databaseRoom.questions ?? {}

    const parsedQuestions = Object.entries(firebaseQuestion)
   })
 }, [id])

 async function handleQuestions(event: FormEvent) {
  event.preventDefault();

   if(newQuestion.trim() === ''){
     return;
   }

   if(!user){
     throw new Error('errou!!!!!!!!!')
   }

   const question = {
     content: newQuestion,
     author: {
       name: user.name,
       avatar: user.avatar
     },
     isHighlighted: false,
     isAnswered: false
   }

   await database.ref(`rooms/${id}/questions`).push(question)

   setNewQuestion('')

 }
 
  return(
    <div id="page-room">
      <header>
        <div className="content">
        <img src={logo} alt='logo' />
        <RoomCode code={id}/>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala react Q$A</h1>
          <span>perguntas</span>
          </div>

            <form onSubmit={handleQuestions}>
              <textarea 
                placeholder='O que voce quer fazer'
                onChange={event => setNewQuestion(event.target.value)}
                value={newQuestion}
                />

              <div className="form-footer">
                { user ? 
                (
                  <div className='user-info'>
                    <img src={user.avatar} />
                    <span>{user.name}</span>
                  </div>
                )
                 :  <span>Para enviar uma pergunta <button>Faça seu login</button></span> }
                <Button disabled={!user} type='submit'>Enviar pergunta</Button>
              </div>
              </form>
      </main>
    </div>
  )
}