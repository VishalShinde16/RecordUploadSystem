import React from 'react'
import styled from 'styled-components'

import Login from './pages/Login'
import HomePage from './pages/HomePage'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`


const App = () => {
  return (

    <Container>
      {localStorage.getItem('userid') ?
        <>
          <HomePage />
        </> :
        <>
          <Login/>
        </>

      }

    </Container>
  )
}

export default App
