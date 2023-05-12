import styled from "styled-components"
import { useState } from "react"
import { axiosprivate } from '../api/axios'
import { useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"



const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0.5rem;
  background-color: whitesmoke;
  box-shadow: 0 4px 8px lightgray;
  padding-bottom:1rem;
  border-radius: 5px;
  
`
const Table = styled.table`
 border-spacing: 2rem;
 /* background-color: gray; */
 width: 100%;
`
const Row = styled.tr`
  margin:1rem;
`
const TableDataI = styled.td`
  width: 30%;
`
const TableDataII = styled.td`
  width:70% ;
`

const FName = styled.input`
  width: 80%;
  padding: 5px 10px;
  font-size: medium;
  
`
const PNumber = styled.input`
  width:80%;
  padding:5px 10px;

`
const IDate = styled.input`
  padding:5px 10px;
`
const EDate = styled.input`
  padding:5px 10px;
`
const CountryOfIssue = styled.input`
  padding:5px 10px;

`
const DOB = styled.input`
  padding:5px 10px;
`
const Nationality = styled.input`
  padding:5px 10px;
`

const PFile = styled.input``

const Submit = styled.button`
  width: 40%;
  align-self: center;
  padding: 0.5rem 1rem;
  border: 1px solid #144734;
  background-color: #144734;
  color: whitesmoke;
  border-radius: 0.5rem;
  cursor: pointer;

`

const Passport = () => {

  const [passportData, setPassportData] = useState([]);

  const getPassData = async () => {

    try {
      const pass = await axiosprivate.get(`/upload/passport/${localStorage.getItem('userid')}`);
      // if(!pass){
      //   window.location.href='/passport/edit'
      // } 
      setPassportData(pass.data);
      // console.log(pass.data)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getPassData();
  }, [])

  useEffect(() => {
    console.log(passportData)
  }, [passportData])


  const handleClick = () => {
    window.location.href = '/passport/edit'
  }
  
  return (
    <Container>
      <Header/>
      <Wrapper>
        {passportData.length > 0 ?
          <>
            <Table>
              <tbody>

                <Row>
                  <TableDataI>Full Name :</TableDataI>
                  <TableDataII><FName type="text" name="name" value={passportData[0].name} readOnly></FName></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Date Of Birth :</TableDataI>
                  <TableDataII><DOB type="text" name="dob" value={(passportData[0].dateofbirth).slice(0, 10)} readOnly></DOB></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Passport Number :</TableDataI>
                  <TableDataII><PNumber type="text" name="passportNumber" value={passportData[0].passportnumber} readOnly></PNumber></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Issue Date :</TableDataI>
                  <TableDataII><IDate type="text" name="issueDate" value={(passportData[0].issuedate).slice(0, 10)} readOnly /></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Expiry Date :</TableDataI>
                  <TableDataII><EDate type="text" name="expiryDate" value={(passportData[0].expirydate).slice(0, 10)} readOnly /></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Country Of Issue :</TableDataI>
                  <TableDataII>
                    <CountryOfIssue type='text' value={passportData[0].countryofissue} name="countryOfIssue" readOnly></CountryOfIssue>
                  </TableDataII>
                </Row>

                <Row>
                  <TableDataI>Nationality :</TableDataI>
                  <TableDataII>
                    <Nationality type='text' value={passportData[0].nationality} name="nationality" readOnly></Nationality>
                  </TableDataII>
                </Row>

                <Row>
                  <TableDataI> Passport :</TableDataI>
                  <TableDataII>
                    {/* <PFile type="file" name="passFile" readOnly /> */}
                    <a href={`http://localhost:5000/${passportData[0].passport}`} target="_blank">Passport File</a>
                  </TableDataII>
                </Row>

              </tbody>
            </Table>
            <Submit onClick={handleClick}>Upload New</Submit>
          </>
          :
          <p>Loading...</p>
        }
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Passport
