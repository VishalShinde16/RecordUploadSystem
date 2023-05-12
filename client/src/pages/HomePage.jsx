import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import Navbar from '../mycomponents/Navbar'
import Home from '../mycomponents/Home'
import Header from '../mycomponents/Header'
import Footer from '../mycomponents/Footer'
import Passport from '../mycomponents/Passport'
import Visa from '../mycomponents/Visa'
import HealthRecords from '../mycomponents/HealthRecords'
import Login from './Login'
import { axiosprivate } from '../api/axios'
import EditPassport from '../mycomponents/EditPassport'
import EditVisa from '../mycomponents/EditVisa'
import Certificates from '../mycomponents/Certificates'
import AddCertificate from '../mycomponents/AddCertificate'
import AddHealthRecord from '../mycomponents/AddHealthRecord'
import Notifications from '../mycomponents/Notifications'

// import Register from './Register'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
const NavContainer = styled.div`
  flex:20%;
  background-color: #144734;
  overflow: hidden;
`
const MainContainer = styled.div`
  flex: 80%;
  background-color: #f6ede8;
  overflow-y: scroll;
  overflow-x: hidden;
`

const HomePage = () => {

  return (

    <Container>
      {localStorage.getItem('userid') ?
        <>
          <NavContainer>
            <Navbar />
          </NavContainer>

          <MainContainer>
            {/* <Header /> */}
            <Routes>
              <Route path='/' element={<Home />} />

              <Route path='/passport' element={<Passport />} />
              <Route path='/passport/edit' element={<EditPassport />} />

              <Route path='/visa' element={<Visa />} />
              <Route path='/visa/edit' element={<EditVisa />} />

              <Route path='/certificates' element={<Certificates />} />
              <Route path='/certificates/add' element={<AddCertificate/>}/>
              
              <Route path='/healthrecords' element={<HealthRecords />} />
              <Route path='/healthrecords/add' element={<AddHealthRecord />} />

              <Route path='/notifications' element={<Notifications />} />



            </Routes>
            {/* <Footer /> */}
          </MainContainer>
        </> :
        <Login />
      }

    </Container>
  )
}

export default HomePage
