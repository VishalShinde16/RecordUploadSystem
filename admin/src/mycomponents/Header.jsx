import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LanguageIcon from '@mui/icons-material/Language';
import { axiosprivate } from '../api/axios';
const HeaderContainer = styled.div`
  height: 10vh;
  width: 100%;
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

const ProfileImage = styled.div`
  background-color: #144734;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border:'none';
  cursor: pointer;
  color: whitesmoke;
  font-size: larger;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Header = () => {
  let currenturl = (window.location.href).toString().split("/")[3];

  let heading = ''


  if (currenturl === '') {
    heading = 'All Documents'
  }
  else if (currenturl === 'passport') {
    heading = 'Passport Information'
  }
  else if (currenturl === 'visa') {
    heading = 'Visa Information'
  }
  else if (currenturl === 'certificates') {
    heading = 'All Certificates'
  }
  else if (currenturl === 'healthrecords') {
    heading = 'Health Records'
  }
  else if (currenturl === 'notifications') {
    heading = 'Notifications'
  }
  else if (currenturl === 'staffmembers') {
    heading = 'All Users'
  }
  else if (currenturl === 'staffprofile') {
    heading = 'User Data'
  }
  else if (currenturl === 'confidential') {
    heading = 'Confidential Data'
  }


  const [username, setUsername] = useState('');

  // console.log(str2);

  const getUserdata = async () => {

    try {
      const user = await axiosprivate.get(`/user/${localStorage.getItem('userid')}`);
      setUsername(user.data.username)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserdata()
  }, [])

  const handleClick = ()=>{
    window.location.href = `/userprofile`
  }

  return (
    <HeaderContainer>
      <TextSection>
        {heading ==='A S B' ? <span style={{fontSize:'larger'}}><b>A S B</b></span>:heading}
      </TextSection>

      <ProfileSection>
        <ProfileName>{username}</ProfileName>
        <ProfileImage onClick={handleClick}>{username.charAt(0).toUpperCase()}</ProfileImage>
      </ProfileSection>
    </HeaderContainer>
  )
}

export default Header