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
const DocumentSection = styled.div`
  padding: 1rem;
`

const Title = styled.h3`
  font-weight: 500;
  color:#144734;
  margin: 1rem 0rem;
`

const Records = styled.div``

const Table = styled.table`
  /* border: 1px solid lightgray; */
  border-collapse: collapse;
  width: 95%;
  margin: 1rem;
  box-shadow: 0 4px 8px lightgray;
  background-color: whitesmoke;
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

const Home = () => {

  // const [allRecords, setAllRecords] = useState([])

  let allRecords = []
  const [pass, setPass] = useState();
  const [visa,setVisa] = useState();
  // const [health,setHealth] = useState();
  const [certificates,setCertificates] = useState([]);


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
    // allRecords.push(health)
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

        <DocumentSection>
          <Title>Records Status</Title>
          <Records>
            <Table>
              <tbody>
                <TableRow>
                  <TableHeading>Index</TableHeading>
                  <TableHeading>Name</TableHeading>
                  <TableHeading>Type</TableHeading>
                  <TableHeading>Expires In</TableHeading>
                  <TableHeading>View</TableHeading>
                </TableRow>

                {allRecords.length > 0 &&
                  allRecords.map(({ _id, type, docname, expirydate, view }, index) => (
                    <TableRow key={_id}>
                      <TableData>{index + 1}</TableData>
                      <TableData>{docname}</TableData>
                      <TableData>{type}</TableData>
                      <TableData>{Math.floor(calculateDays(expirydate)) < 10 ? <span style={{color:'red'}}><b>{Math.floor(calculateDays(expirydate))} days</b></span>:<span style={{color:'green'}}><b>{Math.floor(calculateDays(expirydate))} days</b></span>}</TableData>
                      <TableData><a href={`http://localhost:5000/${view}`} target='_blank' style={{color:'black'}}><VisibilityIcon/></a></TableData>
                    </TableRow>
                  )
                  )
                }
              </tbody>
            </Table>
          </Records>
        </DocumentSection>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Home