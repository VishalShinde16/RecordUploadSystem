import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { axiosprivate } from '../api/axios';
import Header from './Header';

const Container = styled.div`
  /* background-color: yellow; */
  height: 100vh;
  padding: 20px;
  margin-top: 15px;
  font-size: 1rem;
`
const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 0 1rem;
`
const Heading = styled.h2`
  font-weight: 400;
  /* margin-bottom: 20px; */
`
const Addcertificate = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #144734;
  border: none;
  color: white;

  :hover{
    color:#c6a856;
  }

`
const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
  margin: 20px;
  box-shadow: 0 4px 8px lightgray;

  /* background-color: yellow; */
`

const Table = styled.table`
  /* border: 1px solid lightgray; */
  border-collapse: collapse;
  width: 100%;
`

const TableHeading = styled.th`
  border: 1px solid lightgray;
  border-collapse:collapse;
  border-top: none;
  padding: 5px 30px;
  font-weight: 500;
  color: #c6a856;

`

const TableRow = styled.tr``

const TableData = styled.td`
  border: 1px solid lightgray;
  border-collapse:collapse;
  padding: 5px 5px;
  text-align: center;
  font-size: 0.9rem;
`

const Button = styled.button`
  padding: 2px 5px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  background-color: white;

 
`
const Search = styled.input`
    padding: 0.3rem;
    font-size: medium;
    width:20%;
    align-self:flex-start;
    border:1px solid lightgray;
    border-radius: 5px;

    ::placeholder{
        color: #9b9b9b;
    }
`

const Users = () => {

    const [allUsers, setallUsers] = React.useState([]);
    const [searchtext,setSearchtext] = React.useState('');

    const getUsers = async () => {
        try {
            const Usersdata = await axiosprivate.get(`/user/allusers/${localStorage.getItem('userid')}`)
            setallUsers(Usersdata.data.filter((user)=>user.username.toLowerCase().includes(searchtext.toLowerCase())))
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        getUsers();
    }, [searchtext])

    React.useEffect(() => {
        console.log(allUsers)
    }, [allUsers])

    async function deleteuser(id, index) {
        
        try {
            // confirm("Are you sure you want to delete this certificate?")
            if (window.confirm("Are you sure you want to delete this user?") ===true) {
                await axiosprivate.delete(`user/${id}`)
                window.location.reload(false)
              } else {
                //do nothing
              }
           
        } catch (err) {
            console.log(err)
        }
    }

     //handle search text
     function handlesearch(event){
        setSearchtext(event.target.value)
    }

    console.log(searchtext)
    return (
        <>
        <Header/>
        <Container>
            <TopContainer>
                {/* <Heading>All Users</Heading> */}
                {/* <Link to='./add'>
                    <Addcertificate>+ Add certificate</Addcertificate>
                </Link> */}
                <Search type='text' value={searchtext} onChange={handlesearch} placeholder='search name'/>
            </TopContainer>

            <TableContainer>

                <Table id='allUserstable'>
                    <tbody>

                        <TableRow>
                            <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                            <TableHeading>Name</TableHeading>
                            <TableHeading>Department</TableHeading>
                            <TableHeading>Job Role</TableHeading>
                            <TableHeading>Is Admin</TableHeading>

                            <TableHeading style={{ borderRight: 'none' }}>Action</TableHeading>

                        </TableRow>

                        {allUsers.length > 0 &&

                            allUsers.map(({ _id, username,department,jobtitle,isAdmin }, index) => (

                                <TableRow key={_id}>


                                    <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>

                                    <TableData>{username}</TableData>
                                    <TableData>{department}</TableData>
                                    <TableData>{jobtitle}</TableData>
                                    <TableData>{isAdmin.toString()}</TableData>


                                    <TableData style={{ borderRight: 'none' }}>
                                        <Link to={`/staffprofile/${_id}`}>
                                            <Button><VisibilityIcon /></Button>
                                        </Link>

                                        <Button onClick={() => deleteuser(_id)}><DeleteForeverOutlinedIcon /></Button>
                                    </TableData>

                                </TableRow>
                            ))

                        }

                    </tbody>
                </Table>
            </TableContainer>
        </Container>
        </>
    )
}

export default Users
