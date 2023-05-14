import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'

import styled from 'styled-components'
import homebg from '../images/homepageimg.jpg'
import { axiosprivate } from '../api/axios'

import VisibilityIcon from '@mui/icons-material/Visibility';


const Container = styled.div``
const Wrapper = styled.div``
const ImageSection = styled.div`
  margin: 0.5rem 0;
  height: 60vh;
  width:100%;
  /* background: linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.1)),url(${homebg}); */
  background-size: cover;
  background-image: url(${homebg});
  /* background-repeat: no-repeat; */
`
const NotificationSection = styled.div`
  padding: 1rem;

`

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 1rem;
  margin: 20px;
  box-shadow: 0 4px 8px lightgray;

  /* background-color: yellow; */
`
const NotificationTitle = styled.div`
  font-weight: 600;
  text-align: start;
`
const Description = styled.div`
/* background-color: aqua; */
text-align: start;
padding: 0.5rem 1rem;
max-height: 20vh;

`
const DocumentSection = styled.div`
  padding: 1rem;
`

const Title = styled.h3`
  font-weight: 500;
  color:#c6a856;
  margin: 1rem 0rem;
`

const Records = styled.div``
/* background-color: yellow; */

const Table = styled.table`
  /* border: 1px solid lightgray; */
  border-collapse: collapse;
  width: 100%;
  /* margin: 1rem; */
  /* box-shadow: 0 4px 8px lightgray; */
  background-color: white;
`

const TableHeading = styled.th`
  border: 1px solid lightgray;
  border-collapse:collapse;
  border-top: none;
  padding: 5px 30px;
  font-weight: 500;
  /* color:#c6a856; */
`

const TableRow = styled.tr``

const TableData = styled.td`
  border: 1px solid lightgray;
  border-collapse:collapse;
  padding: 5px 5px;
  text-align: center;
  font-size: 0.9rem;
`

const Home = () => {

  // const [allRecords, setAllRecords] = useState([])
  const [allNotifications, setallNotifications] = React.useState([]);
    
  
  let allRecords = []
  const [pass, setPass] = useState();
  const [visa,setVisa] = useState();
  const [certificates,setCertificates] = useState([]);
  const getNotifications = async () => {
      try {
          const Notificationsdata = await axiosprivate.get(`/notice/getnotice/${localStorage.getItem('userid')}`)
          setallNotifications(Notificationsdata.data)
      } catch (err) {
          console.log(err)
      }
  }


  const getdata =async ()=>{
    try{
      const pass = await axiosprivate.get(`/upload/passport/${localStorage.getItem('userid')}`)
      const visa = await axiosprivate.get(`/uploadvisa/visa/${localStorage.getItem('userid')}`)
      // const health = await axiosprivate.get(`/uploadhealthrecords/healthrecords/${localStorage.getItem('userid')}`)
      const Certificatesdata = await axiosprivate.get(`/uploadcertificates/certificate/${localStorage.getItem('userid')}`)
      setPass(pass.data[0])
      setVisa(visa.data[0])
      // setHealth(health.data[0])
      setCertificates(Certificatesdata.data)

    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getNotifications();
    getdata();
  },[])
  
  function calculateDays(expdate){
    var date2,date1,cdate;
    
    const date = new Date();
    cdate = (date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()).toString();
    console.log(cdate)
    date1 = new Date(cdate);
    date2 = new Date(expdate.split("T")[0]);

    //calculate time difference
    var time_difference = date2.getTime() - date1.getTime();

    //calculate days difference by dividing total milliseconds in a day
    var days_difference = time_difference / (1000 * 60 * 60 * 24);

    return days_difference
  }

  if(pass && visa && certificates){
    allRecords.push({...pass,type:'passport',docname:'Passport',view:pass.passport})
    allRecords.push({...visa,type:'visa',docname:'Visa',view:visa.visa})

    certificates.map((certificate)=>{
      allRecords.push({...certificate,type:'certificate',docname:certificate.certificatename,view:certificate.certificate})
    })
  }

  console.log("all records",allRecords)
  
  return (
    <Container>
      <Header />
      <Wrapper>
        <ImageSection></ImageSection>
        <NotificationSection>
          <Title>Recent Notifications</Title>
                  <TableContainer>
                    <Table id='allNotificationstable'>
                        <tbody>

                            <TableRow>
                                <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                                <TableHeading>Date</TableHeading>
                                <TableHeading style={{width:'70%',borderRight: 'none'}}>Notification</TableHeading>

                            </TableRow>

                            {allNotifications.length > 0 &&

                                allNotifications.slice(allNotifications.length-3,allNotifications.length).reverse().map(({ _id, updatedAt, title, description }, index) => (

                                    <TableRow key={_id}>


                                        <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>

                                        <TableData>{updatedAt.toString().split("T")[0]}</TableData>
                                        <TableData style={{padding:'1rem',borderRight: 'none'}}>
                                            
                                            <NotificationTitle>{title}</NotificationTitle>
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
        </NotificationSection>

        <DocumentSection>
          <Title>Records Status</Title>
          <Records>
            <TableContainer>
            <Table>
              <tbody>
                <TableRow>
                  <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                  <TableHeading>Name</TableHeading>
                  <TableHeading>Type</TableHeading>
                  <TableHeading>Expires In</TableHeading>
                  <TableHeading style={{ borderRight: 'none' }}>View</TableHeading>
                </TableRow>

                {allRecords.length > 0 &&
                  allRecords.map(({ _id, type, docname, expirydate, view }, index) => (
                    <TableRow key={_id}>
                      <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>
                      <TableData>{docname}</TableData>
                      <TableData>{type}</TableData>
                      <TableData>{Math.floor(calculateDays(expirydate)) > 10 ? <span style={{color:'green'}}><b>{Math.floor(calculateDays(expirydate))} days</b></span>:<span style={{color:'red'}}><b>{Math.floor(calculateDays(expirydate)) <= 0 ? "Expired":Math.floor(calculateDays(expirydate))+' days'}</b></span>}</TableData>
                      <TableData style={{ borderRight: 'none' }}><a href={`http://localhost:5000/${view}`} target='_blank' style={{color:'black'}}><VisibilityIcon/></a></TableData>
                    </TableRow>
                  )
                  )
                }
              </tbody>
            </Table>
            </TableContainer>
          </Records>
        </DocumentSection>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Home