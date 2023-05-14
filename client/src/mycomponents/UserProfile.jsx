// import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { axiosprivate, axiospublic } from '../api/axios'
// import bg1 from '../images/wSprite.png'
import bg3 from '../images/bg3.jpg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Header from './Header';
import CloseIcon from '@mui/icons-material/Close';
import bg from '../images/wSprite.png';
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    /* background-image: url(${bg}); */

`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color:#f5f5f5;
    padding: 1rem 1rem 2rem 1rem;
    box-shadow: 2px 4px 6px gray;
    border-radius: 1rem;
    width: 50%;
`
const Title = styled.h2`
  align-self: center;
  color:#c6a856;
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

const ProfileLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Table = styled.table`
 border-spacing: 1rem 1rem ;
 margin-top: 2rem;
 /* background-color: gray; */
 width: 100%;
`
const TableRow = styled.tr`
  /* margin:1rem; */
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

const Department = styled.select`
  width: 50%;
`
const JobTitle = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%;  
`

const Submit = styled.button`
  width: 50%;
  align-self: center;
  padding: 0.5rem 1rem;
  border:none;
  background-color: #144734;
  color: whitesmoke;
  border-radius: 0.5rem;
  margin:0.5rem 0;
  cursor: pointer;

  :hover{
    
    color:#c6a856;
  }
`
const Links = styled.a`
    text-decoration: underline;
    /* margin: 5px 0 0 0 ; */
    cursor: pointer;
    color: gray;
    font-size: small;
    
`
const UserProfile = () => {

    const [userdata, setUserdata] = useState({})


    const getUser = async () => {
        try {
            const user = await axiosprivate.get(`user/${localStorage.getItem('userid')}`)
            console.log(user)
            setUserdata(user.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getUser();
    },[])

    const handleChange = (event) => {

        setUserdata({
            ...userdata,
            [event.target.name]: event.target.value
        })
    }
    const updateUser = async () => {
        let flag = true;
        let error = '';
        var nameregex = /^[a-zA-Z ]*$/;

        if (userdata.username && userdata.email && userdata.password && userdata.department && userdata.jobtitle) {

            if (!(userdata.username.match(nameregex))) {
                flag = false;
                error = "Name should only contains characters";
            }
            
            if (userdata.password.length < 6) {
                flag = false;
                error = "Password should be at least 6 characters";
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
                    const response = await axiosprivate.put(`/user/${localStorage.getItem('userid')}`, userdata)

                    console.log(response);
                    alert("Profile update successfull !")
                    
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

    const close = ()=>{
        window.location.href='/'
    }
    return (
        <>
        <Container>
            <Wrapper>
                {/* <Title>Your Profile</Title> */}
                { Object.keys(userdata).length > 0 ?
                <Main>
                    <CloseIcon style={{color:'#144734',alignSelf:'flex-end',fontSize:'2rem',cursor:'pointer'}} onClick={close}/>
                    <ProfileLogo>
                        <AccountCircleIcon style={{fontSize:'10rem',color:'#144734'}}/>
                        <Title>{userdata.username}</Title>
                    </ProfileLogo>
                    
                    <Table>
                        <tbody>
                            <TableRow>
                                <TableDataI>Full Name :</TableDataI>
                                <TableDataII><Name type='text' placeholder='' value={userdata.username} name='username' onChange={handleChange} /></TableDataII>
                            </TableRow>

                            <TableRow>
                                <TableDataI>Email : </TableDataI>
                                <TableDataII><Email type='email' placeholder='example@gmail.com' value={userdata.email} name='email' readOnly /></TableDataII>
                            </TableRow>

                            <TableRow>
                                <TableDataI>Password : </TableDataI>
                                <TableDataII><Password type='password' placeholder='6 characters or more' value={userdata.password} name='password' onChange={handleChange} /></TableDataII>
                            </TableRow>

                            <TableRow>
                                <TableDataI>Department : </TableDataI>
                                <TableDataII>
                                    <Department onChange={handleChange} name='department' defaultValue={(userdata.department).toString()}>
                                        <option value="none" disabled hidden>--select--</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                    </Department>
                                </TableDataII>
                            </TableRow>

                            <TableRow>
                                <TableDataI>Job Title :</TableDataI>
                                <TableDataII><JobTitle type='text' placeholder='' value={userdata.jobtitle} name='jobtitle' onChange={handleChange} /></TableDataII>
                            </TableRow>

                        </tbody>
                    </Table>

                    <Submit onClick={updateUser}>Save</Submit>
                    
                    
                </Main>
                :
                <p>Loading...</p>
                }
            </Wrapper>
        </Container>
        </>
    )
}

export default UserProfile
