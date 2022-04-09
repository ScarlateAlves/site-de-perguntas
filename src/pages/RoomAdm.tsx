import Reacrt from 'react'

import logo from '../assets/images/logo.svg'
import empty from '../assets/images/empty-questions.svg'
import { Button } from '../components/Button'

import '../styles/auth.scss'

export function Room() {
  return(
    <div>
      <header>
        <div>
        <img src={logo} alt='logo' />
        <Button>sala</Button>
        <Button>Encerrar sala</Button>
        </div>
      </header>
      <main>
        <div>
          <h1>Sala react Q$A</h1>
          <div className='main-content'>
            <img src={empty} alt="Questao" />
            <h2>Nenhuma pergunta por aqui</h2>
            <p>
              Envie o codigo desta sala para seus amigos e comece a responder perguntas
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}