import React from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { axiosprivate } from '../api/axios';
import Footer from './Footer';
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
  justify-content: flex-end;
  margin-bottom: 20px;
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


const Certificates = () => {

    const [allCertificates, setallCertificates] = React.useState([]);
    const getCertificates = async () => {
        try {
            const Certificatesdata = await axiosprivate.get(`/uploadcertificates/certificate/${localStorage.getItem('userid')}`)
            setallCertificates(Certificatesdata.data)
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        getCertificates();
    }, [])

    React.useEffect(() => {
        console.log(allCertificates)
    }, [allCertificates])

    async function deletecertificate(id, index) {
        
        try {
            // confirm("Are you sure you want to delete this certificate?")
            if (window.confirm("Are you sure you want to delete this certificate?") ===true) {
                await axiosprivate.delete(`uploadcertificates/certificate/${localStorage.getItem('userid')}/${id}`)
                window.location.reload(false)
              } else {
                //do nothing
              }
           
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <Header/>
        <Container>
            <TopContainer>
                {/* <Heading>All Certificates</Heading> */}
                <Link to='./add'>
                    <Addcertificate>+ Add certificate</Addcertificate>
                </Link>
            </TopContainer>

            <TableContainer>

                <Table id='allCertificatestable'>
                    <tbody>

                        <TableRow>
                            <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                            <TableHeading>Certificate Name</TableHeading>
                            <TableHeading>Organization</TableHeading>
                            <TableHeading>Issue Date</TableHeading>
                            <TableHeading>Expiry Date</TableHeading>

                            <TableHeading style={{ borderRight: 'none' }}>Action</TableHeading>

                        </TableRow>

                        {allCertificates.length > 0 &&

                            allCertificates.map(({ _id, certificatename, organization, issuedate, expirydate, certificate }, index) => (

                                <TableRow key={_id}>


                                    <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>

                                    <TableData>{certificatename}</TableData>
                                    <TableData>{organization}</TableData>
                                    <TableData>{issuedate.slice(0, 10)}</TableData>
                                    <TableData>{expirydate.slice(0, 10)}</TableData>


                                    <TableData style={{ borderRight: 'none' }}>
                                        <Link to={`http://localhost:5000/${certificate}`} target='_blank'>
                                            <Button><VisibilityIcon /></Button>
                                        </Link>

                                        <Button onClick={() => deletecertificate(_id)}><DeleteForeverOutlinedIcon /></Button>
                                    </TableData>

                                </TableRow>
                            ))

                        }

                    </tbody>
                </Table>
            </TableContainer>
        </Container>
        <Footer/>
        </>
    )
}

export default Certificates
