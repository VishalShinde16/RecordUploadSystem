import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  height: 60px;
  background-color: whitesmoke;
  box-shadow: 1px 2px 2px lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`

const TextSection = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
`

const ProfileSection = styled.div`

  display: flex;
  align-items: center;
  gap:1rem;
`

const ProfileName = styled.h3`
  font-weight: 300;
`

const ProfileImage = styled.button`
  background-color: #144734;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border:'none';
  cursor: pointer;
  color: whitesmoke;
  font-size: larger;
`
const Header = () => {
  return (
    <HeaderContainer>
      <TextSection>
        Passport Information
      </TextSection>

      <ProfileSection>
        <ProfileName>Vishal Shinde</ProfileName>
        <ProfileImage>V</ProfileImage>
      </ProfileSection>
    </HeaderContainer>
  )
}

export default Header