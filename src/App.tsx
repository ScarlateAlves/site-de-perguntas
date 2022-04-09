import React from 'react';
import { Router, RouteComponentProps } from '@reach/router'

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/Authcontext'

import './styles/global.scss'


function App() {

  return (
    <>
    <AuthContextProvider>
     <Router>
    <RouterPage path="/" pageComponent={<Home />} />
    <RouterPage path="/rooms/new" pageComponent={<NewRoom />} />
    <RouterPage path="/rooms/:id" pageComponent={<Room />} />
  </Router>
  </AuthContextProvider>
   </>
  );
}

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
   

export default App;
