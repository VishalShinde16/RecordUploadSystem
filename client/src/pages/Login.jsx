import React, { useState } from 'react'
import styled from 'styled-components'
import axios from '../api/axios'
import bg1 from '../images/loginimg.jpg'

import Register from './Register'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f6ede8;
    height: 100vh;
    width:100vw;
    background: linear-gradient(rgba(100,100,100,0.5),rgba(100,100,100,0.8)),
    url(${bg1});
    background-size: cover;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color:#f5f5f5;
    padding: 2rem 1rem;
    box-shadow: 2px 4px 6px gray;
    border-radius: 1rem;
`
const Title = styled.h1`
  align-self: center;
  color:#144734;
  font-weight: 600;
  letter-spacing: 3px;
  margin-bottom: 1rem;
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem 0;
`

const Email = styled.input`
 font-size:medium;
 padding:3px 5px;
  width: 20rem;

`
const Password = styled.input`
 font-size:medium;
 padding:3px 5px;
  width: 20rem;
`

const Submit = styled.button`
  width: 50%;
  align-self: center;
  padding: 0.5rem 1rem;
  border: 1px solid #144734;
  background-color: #144734;
  color: whitesmoke;
  border-radius: 0.5rem;
  cursor: pointer;

  /* :hover{
    background-color: whitesmoke;
    color:#144734;
  } */
`

const Links = styled.a`
    text-decoration: underline;
    margin: 5px 0 ;
    cursor: pointer;
    color: gray;
    font-size: small;
    
`

const Login = () => {
  
  const[userCredentials,setUserCredentials] = useState({
    email:'',
    password:''
  }) 

  // const [accessToken,setAccessToken] = useState('');

  const handleChange = (event)=>{
    setUserCredentials(
      {
        ...userCredentials,
        [event.target.name] : event.target.value
      }
    )
  }

  const handleLogin = async()=>{
    try{
      const res = await axios.post('/auth/login',{
        email:userCredentials.email,
        password:userCredentials.password
      })

      // console.log(res);

      if(res.status === 200 ){

        // setAccessToken(res.data.accessToken)
        
        localStorage.setItem('token',JSON.stringify(res.data.accessToken))
        localStorage.setItem('userid',JSON.stringify(res.data._id))
        
        window.location.href = '/'
      }
      else{
        alert('Invalid email or password');
      }
    }catch(err){
      console.log(err)
      alert(err.response.data)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Main>
            
            <Row>Email :<Email type='email' name = 'email'value={userCredentials.email} onChange={handleChange} /></Row>
            <Row>Password :<Password type='password' name = 'password' value={userCredentials.password} onChange={handleChange}/></Row>
            
            <Submit onClick={handleLogin}>Login</Submit> 

            <span>
            <Links href='#'>Forgot password ?</Links><br/>
            <Links href='/register'>Create a new account</Links>     
            </span>
        </Main>
      </Wrapper>
    </Container>
  )
}

export default Login