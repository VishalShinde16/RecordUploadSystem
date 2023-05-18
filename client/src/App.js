import React from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'

// import Navbar from './mycomponents/Navbar'
// import Home from './mycomponents/Home'
// import Header from './mycomponents/Header'
// import Footer from './mycomponents/Footer'
// import Passport from './mycomponents/Passport'
// import Visa from './mycomponents/Visa'
// import HealthRecords from './mycomponents/HealthRecords'
// import Confidential from './mycomponents/Confidential'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/HomePage'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
// const NavContainer = styled.div`
//   flex:20%;
//   background-color: #144734;
//   overflow: hidden;
// `
// const MainContainer = styled.div`
//   flex: 80%;
//   background-color: #f6ede8;
// `

const App = () => {
  return (

    <Container>


      {localStorage.getItem('userid') ?
        <>
          <HomePage />
        </> :
        <>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </>

      }

    </Container>
  )
}

export default App
