import { useState, useEffect } from "react"
import styled from "styled-components"
import { axiosprivate, axiosprivatejson } from '../api/axios'
import Header from "./Header"
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const TopSection = styled.div``
const FilterSection = styled.div``
const DocumentSection = styled.div``


const Title = styled.h3`
  font-weight: 500;
  color:#c6a856;
  margin: 1rem 0rem;
`

const Records = styled.div``
/* background-color: yellow; */

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
const Button = styled.button`
  padding: 2px 5px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  background-color: white;

 
`

const Search = styled.select`

`
const Home = () => {
  //will contain passport,visa,certificates of all users
  let allRecords = []

  // const [newallRecords,setnewallRecords] = useState(allRecords)

  
  const [pass, setPass] = useState([]);
  const [visa,setVisa] = useState([]);
  const [certificates,setCertificates] = useState([]);

  // const [searchdoctype,setSearchdoctype] = useState('');
  // const [susername,setUsername] = useState('');

  const [searchtext,setSearchtext] = useState('');

  const getdata =async ()=>{
    try{
      const passres = await axiosprivate.get(`/upload/allpassports/${localStorage.getItem('userid')}`)
      const visares = await axiosprivate.get(`/uploadvisa/allvisa/${localStorage.getItem('userid')}`)
      // const health = await axiosprivate.get(`/uploadhealthrecords/healthrecords/${localStorage.getItem('userid')}`)
      const Certificatesdata = await axiosprivate.get(`/uploadcertificates/allcertificates/${localStorage.getItem('userid')}`)

      setPass(passres.data)
      setVisa(visares.data)
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
    
    date1 = new Date(cdate);
    date2 = new Date(expdate.split("T")[0]);

    //calculate time difference
    var time_difference = date2.getTime() - date1.getTime();

    //calculate days difference by dividing total milliseconds in a day
    var days_difference = time_difference / (1000 * 60 * 60 * 24);

    return days_difference
  }

  if(pass && visa && certificates){
    // allRecords.push({...pass,type:'passport',docname:'Passport',view:pass.passport})
    // allRecords.push({...visa,type:'visa',docname:'Visa',view:visa.visa})
    if(searchtext === 'passport'){
      allRecords= []

      pass.map((item)=>{
        allRecords.push({...item,type:'passport',docname:'Passport',view:item.passport})
      })
    }
    

    else if(searchtext === 'visa'){
      allRecords = []
      visa.map((item)=>{
        allRecords.push({...item,type:'visa',docname:'Visa',view:item.visa})
        // setallRecords((array)=>{
        //   return [...array,{...item,type:'visa',docname:'Visa',view:item.visa}]
        // })
      })
    }
   
    else if(searchtext === 'certificates'){
      allRecords =[]
      certificates.map((certificate)=>{
        allRecords.push({...certificate,type:'certificate',docname:certificate.certificatename,view:certificate.certificate})
        // setallRecords((array)=>{
        //   return [...array,{...certificate,type:'certificate',docname:certificate.certificatename,view:certificate.certificate}]
        // })
      })
    }

    else{
      allRecords = []

      pass.map((item)=>{
        allRecords.push({...item,type:'passport',docname:'Passport',view:item.passport})
      })

      visa.map((item)=>{
        allRecords.push({...item,type:'visa',docname:'Visa',view:item.visa})
      })

      certificates.map((certificate)=>{
        allRecords.push({...certificate,type:'certificate',docname:certificate.certificatename,view:certificate.certificate})
      })


    }
   
  }

  useEffect(()=>{

  },[searchtext])

  
  
  const deletedocument = async(_id,type)=>{
    if(type === 'passport'){
      try{
        const res = await axiosprivate.delete(`upload/passport/${localStorage.getItem('userid')}/${_id}`)
        if(res.status === 200){
          alert("Passport deleted successfully!")
        }
      }catch(err){
        console.log(err)
      }
    }

    if(type === 'visa'){
      try{
        const res = await axiosprivate.delete(`uploadvisa/visa/${localStorage.getItem('userid')}/${_id}`)
        if(res.status === 200){
          alert("Visa deleted successfully!")
        }
      }catch(err){
        console.log(err)
      }
    }

    if(type === 'certificate'){
      try{
        const res = await axiosprivate.delete(`uploadcertificates/certificate/${localStorage.getItem('userid')}/${_id}`)
        if(res.status === 200){
          alert("Certificate deleted successfully!")
        }
      }catch(err){
        console.log(err)
      }
    }

    window.location.reload(false);
  }

  function handlesearch(event){
    setSearchtext(event.target.value)
  }
  return (
    <>
      <Header/>
      <Container>
        <TopSection>
          top
        </TopSection>
        <FilterSection>
          <Search defaultValue='all' onChange={handlesearch}>
            <option value='all'>All</option>
            <option value='passport'>Passport</option>
            <option value='visa'>Visa</option>
            <option value='certificates'>Certificates</option>         
          </Search>
        </FilterSection>

        <DocumentSection>
        <Title>Records Status</Title>
          <Records>
            <TableContainer>
            <Table>
              <tbody>
                <TableRow>
                  <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                  <TableHeading>User</TableHeading>
                  <TableHeading>Document</TableHeading>
                  <TableHeading>Type</TableHeading>
                  <TableHeading>Expires In</TableHeading>
                  <TableHeading style={{ borderRight: 'none' }}>Action</TableHeading>
                </TableRow>

                
                {allRecords.length > 0 &&
                  allRecords.slice(0).sort((d1, d2) => (d1.expirydate > d2.expirydate) ? 1 : (d1.expirydate < d2.expirydate) ? -1 : 0).map(({ _id, type, docname, expirydate, view ,name}, index) => (
                    <TableRow key={_id}>
                      <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>
                      <TableData>{name}</TableData>
                      
                      <TableData>{docname}</TableData>
                      <TableData>{type}</TableData>
                      <TableData>{Math.floor(calculateDays(expirydate)) > 10 ? <span style={{color:'green'}}><b>{Math.floor(calculateDays(expirydate))} days</b></span>:<span style={{color:'red'}}><b>{Math.floor(calculateDays(expirydate)) <= 0 ? "Expired":Math.floor(calculateDays(expirydate))+' days'}</b></span>}</TableData>
                      <TableData style={{ borderRight: 'none' }}>
                        <a href={`http://localhost:5000/${view}`} target='_blank' style={{color:'black'}}><VisibilityIcon/></a>
                        <Button onClick={() => deletedocument(_id,type)}><DeleteForeverOutlinedIcon /></Button>

                      
                      </TableData>
                    </TableRow>
                  )
                  )
                }
              </tbody>
            </Table>
            </TableContainer>
          </Records>
        </DocumentSection>
      </Container>
    </>
  )
}

export default Home
