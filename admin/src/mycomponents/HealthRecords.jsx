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

const TableContainer = styled.div`
  display: flex;
  /* justify-content: center;
  align-items: center; */
  background-color: white;
  padding: 10px;
  margin: 20px;
  box-shadow: 0 4px 8px lightgray;
  overflow-x: scroll;


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

const HealthRecords = () => {

    const [allHealthRecords, setallHealthRecords] = React.useState([]);
    const [searchtext,setSearchtext] = React.useState('');

    const getHealthRecords = async () => {
        try {
            const HealthRecordsdata = await axiosprivate.get(`/uploadhealthrecords/allhealthrecords/${localStorage.getItem('userid')}`)
            setallHealthRecords(HealthRecordsdata.data.filter((user)=>user.name.toLowerCase().includes(searchtext.toLowerCase())))
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        getHealthRecords();
    }, [searchtext])

    React.useEffect(() => {
        console.log(allHealthRecords)
    }, [allHealthRecords])

    async function deleterecord(id, index) {
        
        try {
            // confirm("Are you sure you want to delete this certificate?")
            if (window.confirm("Are you sure you want to delete this record?") ===true) {
                await axiosprivate.delete(`uploadhealthrecords/healthrecords/${localStorage.getItem('userid')}/${id}`)
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
                {/* <Heading>All HealthRecords</Heading> */}
                {/* <Link to='./add'>
                    <Addcertificate>+ Add certificate</Addcertificate>
                </Link> */}
                <Search type='text' value={searchtext} onChange={handlesearch} placeholder='search name'/>
            </TopContainer>

            <TableContainer>

                <Table id='allHealthRecordstable'>
                    <tbody>

                        <TableRow>
                            <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                            <TableHeading>Name</TableHeading>
                            <TableHeading>Age</TableHeading>
                            <TableHeading>Blood Group</TableHeading>

                            <TableHeading>Medication</TableHeading>
                            <TableHeading>Vaccination</TableHeading>
                            <TableHeading>Allergies</TableHeading>
                            <TableHeading>Chronic Conditions</TableHeading>
                            <TableHeading>Recent Hospitalization</TableHeading>
                            <TableHeading>Emergency Contact</TableHeading>


                            <TableHeading style={{ borderRight: 'none' }}>Action</TableHeading>

                        </TableRow>

                        {allHealthRecords.length > 0 &&

                            allHealthRecords.map(({ _id, name,age,bloodgroup,allergies,medication,vaccination,chronicconditions,recenthospitalization,emergencycontact,healthrecord }, index) => (

                                <TableRow key={_id}>


                                    <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>

                                    <TableData>{name}</TableData>
                                    <TableData>{age}</TableData>
                                    <TableData>{bloodgroup}</TableData>

                                    <TableData>{medication ? medication:'none'}</TableData>
                                    <TableData>{vaccination ? vaccination:'none'}</TableData>
                                    <TableData>{allergies ? allergies:'none'}</TableData>
                                    <TableData>{chronicconditions ? chronicconditions:'none'}</TableData>
                                    <TableData>{recenthospitalization ? recenthospitalization:'none'}</TableData>
                                    <TableData>{emergencycontact ? emergencycontact:'-'}</TableData>



                                    <TableData style={{ borderRight: 'none' }}>
                                        <a href={`http://localhost:5000/${healthrecord}`} target='_blank' style={{ color: 'black' }}><VisibilityIcon /></a>
                                        <Button onClick={() => deleterecord(_id)}><DeleteForeverOutlinedIcon /></Button>
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

export default HealthRecords
