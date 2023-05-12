import styled from "styled-components"
import { useState } from "react"
import { axiosprivate } from '../api/axios'
import { useEffect } from "react"
import Header from './Header'
import Footer from './Footer'

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
`
const VisaType = styled.input`
 width: 80%;
 padding: 5px 10px;
`

const VisaNumber = styled.input`
 width: 80%;
 padding: 5px 10px;

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

const VFile = styled.input``

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

const Visa = () => {

  const [visaData, setVisaData] = useState([]);

  const getVisaData = async () => {

    try {
      const visa = await axiosprivate.get(`/uploadvisa/visa/${localStorage.getItem('userid')}`);
      setVisaData(visa.data);
      // console.log(pass.data)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getVisaData();
  }, [])

  useEffect(() => {
    console.log(visaData)
  }, [visaData])


  const handleClick = () => {
    window.location.href = '/Visa/edit'
  }

  return (
    <>
      <Header/>
    <Container>
        
      <Wrapper>
        {visaData.length > 0 ?
          <>
            <Table>
              <tbody>

                <Row>
                  <TableDataI>Full Name :</TableDataI>
                  <TableDataII><FName type="text" name="name" value={visaData[0].name} readOnly></FName></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Date Of Birth :</TableDataI>
                  <TableDataII><DOB type="text" name="dob" value={(visaData[0].dateofbirth).slice(0, 10)} readOnly></DOB></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Visa Type :</TableDataI>
                  <TableDataII><VisaType type="text" name="visatype" value={visaData[0].visatype} readOnly></VisaType></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Visa Number :</TableDataI>
                  <TableDataII><VisaNumber type="text" name="visanumber" value={visaData[0].visanumber} readOnly></VisaNumber></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Passport Number :</TableDataI>
                  <TableDataII><PNumber type="text" name="passportNumber" value={visaData[0].passportnumber} readOnly></PNumber></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Issue Date :</TableDataI>
                  <TableDataII><IDate type="text" name="issueDate" value={(visaData[0].issuedate).slice(0, 10)} readOnly /></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Expiry Date :</TableDataI>
                  <TableDataII><EDate type="text" name="expiryDate" value={(visaData[0].expirydate).slice(0, 10)} readOnly /></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Country Of Issue :</TableDataI>
                  <TableDataII>
                    <CountryOfIssue type='text' value={visaData[0].countryofissue} name="countryOfIssue" readOnly></CountryOfIssue>
                  </TableDataII>
                </Row>

                <Row>
                  <TableDataI>Nationality :</TableDataI>
                  <TableDataII>
                    <Nationality type='text' value={visaData[0].nationality} name="nationality" readOnly></Nationality>
                  </TableDataII>
                </Row>

                <Row>
                  <TableDataI> Visa :</TableDataI>
                  <TableDataII>
                    {/* <PFile type="file" name="passFile" readOnly /> */}
                    <a href={`http://localhost:5000/${visaData[0].visa}`} target="_blank">Visa File</a>
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
    </Container>
      <Footer/>
    </>
  )
}

export default Visa;
