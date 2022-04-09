import React, { FormEvent, useContext, useState } from 'react';

import { useNavigate } from '@reach/router'

import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import google from '../assets/images/google-icon.svg'

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'
import { database } from '../service/firebase';


export function Home() {
    const location = useNavigate();
    const { user, singInWithGoogle } = useAuth()
    const [ room, setRoom ] = useState('')

    //entrando com o google
    async function navegation() {

        if (!user) {
            await singInWithGoogle()
        }

        location('/rooms/new')
    }

    //entrando em uma sala existente
    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if(room.trim() === '') {
            return
        }

        //verificando se codigo da sla existe
        const roomRef = await database.ref(`rooms/${room}`).get()

        if(!roomRef.exists()) {
            return
        }

        location(`rooms/${room}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustration} alt='logo'></img>
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Aprende e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logo} alt='logoLetme' />
                    <button onClick={navegation} className='create-room'>
                        <img src={google} alt='icoGoogle' />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type='text' 
                            placeholder='Digite o código da sala'
                            onChange={event => setRoom(event.target.value)}
                            value={room}
                            />
                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}