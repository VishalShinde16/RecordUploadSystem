import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import Navbar from '../mycomponents/Navbar'
import Home from '../mycomponents/Home'
import Login from './Login'
import HealthRecords from '../mycomponents/HealthRecords'
import Notifications from '../mycomponents/Notifications'
import Confidential from '../mycomponents/Confidential'
import UserProfile from '../mycomponents/UserProfile'
import Users from '../mycomponents/Users'
import Staffprofile from '../mycomponents/Staffprofile'
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
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/healthrecords' element={<HealthRecords />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/confidential' element={<Confidential />} />
              <Route path='/staffmembers' element={<Users/>} />
              <Route path='/staffprofile/:staffid' element={<Staffprofile/>} />
              <Route path='/userprofile' element={<UserProfile />} />

            </Routes>
          </MainContainer>
          
        </> :
        <Login />
      }

    </Container>
  )
}

export default HomePage
