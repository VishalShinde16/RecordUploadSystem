// import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { axiospublic } from '../api/axios'
// import bg1 from '../images/wSprite.png'
import bg3 from '../images/bg3.jpg'


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #f6ede8; */
    height: 100vh;
    width:100vw;
    background: linear-gradient(rgba(100, 100, 100, 0.5),rgba(100,100,100,0.8)),
    url(${bg3});
    background-size: cover;

`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color:#f5f5f5;
    padding: 2rem 1rem;
    box-shadow: 2px 4px 6px gray;
    border-radius: 1rem;
    width: 39%;
`
const Title = styled.h1`
  align-self: center;
  color:#144734;
  font-weight: 600;
  letter-spacing: 3px;
  /* margin-bottom: 1rem; */
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem 0;
`
const Table = styled.table`
 border-spacing: 1rem 2rem ;
 /* background-color: gray; */
 width: 100%;
`
const TableRow = styled.tr`
  margin:1rem;
  /* background-color: yellow; */
`
const TableDataI = styled.td`
  width: 40%;
  /* background-color: aqua; */
`
const TableDataII = styled.td`
  width:60% ;
`
const Name = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%; 
`
const Email = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%;  

`
const Password = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%;  
`
const ConfirmPassword = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%;  
`
const Department = styled.select`
  width: 50%;
`
const JobTitle = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%;  
`
const Terms = styled.input`
 

`
const Submit = styled.button`
  width: 50%;
  align-self: center;
  padding: 0.5rem 1rem;
  border: 1px solid #144734;
  background-color: #144734;
  color: whitesmoke;
  border-radius: 0.5rem;
  margin:0.5rem 0;
  cursor: pointer;

  /* :hover{
    background-color: whitesmoke;
    color:#144734;
  } */
`
const Links = styled.a`
    text-decoration: underline;
    /* margin: 5px 0 0 0 ; */
    cursor: pointer;
    color: gray;
    font-size: small;
    
`
const Register = () => {

  const [userdata, setUserdata] = useState(
    {
      username: "",
      email: "",
      password: "",
      confpassword: "",
      department: "",
      jobtitle: ""
    }
  )

  const handleChange = (event) => {

    setUserdata({
      ...userdata,
      [event.target.name]: event.target.value
    })
  }
  const handleRegister = async () => {
    let flag = true;
    let error = '';
    var nameregex = /^[a-zA-Z ]*$/;
    var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (userdata.username && userdata.email && userdata.password && userdata.confpassword && userdata.department && userdata.jobtitle) {

      if (!(userdata.username.match(nameregex))) {
        flag = false;
        error = "Name should only contains characters";
      }
      if (!(userdata.email.match(emailregex))) {
        flag = false;
        error = "Please enter valid email";
      }
      if (userdata.password.length < 6) {
        flag = false;
        error = "Password should be at least 6 characters";
      }
      if (userdata.confpassword !== userdata.password) {
        flag = false;
        error = "Password and confirm password is not same";
      }
      if (userdata.department === 'none') {
        flag = false;
        error = "Please select department";
      }
      if (!userdata.jobtitle) {
        flag = false;
        error = "Please select Job Title"
      }

      if (flag) {


        try {
          const response = await axiospublic.post("/auth/register", userdata)

          console.log(response);
          alert("Registration Successfull !")
          window.location.href = '/login'
        } catch (err) {
          console.log(err)
        }

      } else {
        alert(error);
      }

    } else {
      alert("Please fill all the fields!")
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Register</Title>
        <Main>
          <Table>
            <tbody>
              <TableRow>
                <TableDataI>Full Name :</TableDataI>
                <TableDataII><Name type='text' placeholder='' value={userdata.name} name='username' onChange={handleChange} /></TableDataII>
              </TableRow>

              <TableRow>
                <TableDataI>Email : </TableDataI>
                <TableDataII><Email type='email' placeholder='example@gmail.com' value={userdata.email} name='email' onChange={handleChange} /></TableDataII>
              </TableRow>

              <TableRow>
                <TableDataI>Password : </TableDataI>
                <TableDataII><Password type='password' placeholder='6 characters or more' value={userdata.password} name='password' onChange={handleChange} /></TableDataII>
              </TableRow>

              <TableRow>
                <TableDataI>Confirm Password :</TableDataI>
                <TableDataII><ConfirmPassword type='password' placeholder='' value={userdata.confpassword} name='confpassword' onChange={handleChange} /></TableDataII>
              </TableRow>

              <TableRow>
                <TableDataI>Department : </TableDataI>
                <TableDataII>
                  <Department onChange={handleChange} name='department' defaultValue='none'>
                    <option value="none" disabled hidden>--select--</option>
                    <option value='Administration'>Administration</option>
                    <option value='Academic'>Academic</option>
                    <option value='Admissions'>Admissions</option>
                    <option value='Finance'>Finance</option>
                    <option value='Human Resource'>Human Resource</option>
                    <option value='IT'>IT</option>
                    <option value='Extra Curricular'>Extra Curricular</option>


                  </Department>
                </TableDataII>
              </TableRow>

              <TableRow>
                <TableDataI>Job Title :</TableDataI>
                <TableDataII><JobTitle type='text' placeholder='' value={userdata.jobtitle} name='jobtitle' onChange={handleChange} /></TableDataII>
              </TableRow>

            </tbody>
          </Table>
          
          <p style={{ fontSize: 'small', margin: '0.5rem 0' }}><Terms type='checkbox' width='1rem' /> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero asperiores est eligendi dicta, ipsa dolore!</p>
          <Submit onClick={handleRegister}>Register</Submit>
          <Links href='/login'>Already have an account ? click here</Links>

        </Main>
      </Wrapper>
    </Container>
  )
}

export default Register
