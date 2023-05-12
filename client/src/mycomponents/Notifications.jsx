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
`

const TableRow = styled.tr``

const TableData = styled.td`
  border: 1px solid lightgray;
  border-collapse:collapse;
  padding: 5px 5px;
  text-align: center;
  font-size: 0.9rem;
`

const Title = styled.div`
    font-weight: 600;
    text-align: start;
`

const Description = styled.div`
/* background-color: aqua; */
text-align: start;
padding: 0.5rem 1rem;
`


const Notifications = () => {

    const [allNotifications, setallNotifications] = React.useState([
        {
            _id: 1,
            date: '12-Mar-2021',
            title: "New Order",
            description: "This is descirpiton of notification"
        }
    ]);
    // const getNotifications = async () => {
    //     try {
    //         const Notificationsdata = await axiosprivate.get(`/uploadNotifications/certificate/${localStorage.getItem('userid')}`)
    //         setallNotifications(Notificationsdata.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // React.useEffect(() => {
    //     getNotifications();
    // }, [])

    // React.useEffect(() => {
    //     console.log(allNotifications)
    // }, [allNotifications])



    return (
        <>
            <Header />
            <Container>

                <TableContainer>

                    <Table id='allNotificationstable'>
                        <tbody>

                            <TableRow>
                                <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                                <TableHeading>Date</TableHeading>
                                <TableHeading style={{width:'70%'}}>Notification</TableHeading>

                            </TableRow>

                            {allNotifications.length > 0 &&

                                allNotifications.map(({ _id, date, title, description }, index) => (

                                    <TableRow key={_id}>


                                        <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>

                                        <TableData>{date}</TableData>
                                        <TableData style={{padding:'1rem'}}>
                                            
                                            <Title>{title}</Title>
                                            <Description >
                                                {description}
                                            </Description>
                                        </TableData>


                                    </TableRow>
                                ))

                            }

                        </tbody>
                    </Table>
                </TableContainer>
            </Container>
            <Footer />
        </>
    )
}

export default Notifications
