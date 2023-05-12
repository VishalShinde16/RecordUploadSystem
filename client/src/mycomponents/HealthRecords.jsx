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
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0.5rem;

  background-color: whitesmoke;
  box-shadow: 0 4px 8px lightgray;
  padding-bottom:1rem;
  border-radius: 5px;
  /* background-color: yellow; */
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
const Age = styled.input`
 width: 40%;
 padding: 5px 10px;
 font-size: medium;

`

const BloodGroup = styled.input`
 width: 40%;
 padding: 5px 10px;
 font-size: medium;


`

const Allergies = styled.textarea`
  width:80%;
  padding:5px 10px;

`
const Medications = styled.textarea`
  padding:5px 10px;
`
const Vaccinations = styled.textarea`
  padding:5px 10px;
`
const ChronicConditions = styled.textarea`
  width:80%;
  padding:5px 10px;

`
const RecentHospitalization = styled.textarea`
  width:80%;
  padding:5px 10px;

`
const EmergencyContact = styled.input`
  width:80%;
  padding:5px 10px;

`

const AdditionalInformation = styled.textarea`
  width:80%;
  padding:5px 10px;

`


const HealthRecord = styled.input``

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
const HealthRecords = () => {
  const [healthData, sethealthData] = useState([]);

  const gethealthData = async () => {

    try {
      const healthres = await axiosprivate.get(`/uploadhealthrecords/healthrecords/${localStorage.getItem('userid')}`);
      sethealthData(healthres.data);
      // console.log(pass.data)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    gethealthData();
  }, [])

  useEffect(() => {
    console.log(healthData)
  }, [healthData])


  const handleClick = () => {
    window.location.href = '/healthrecords/add'
  }

  return (
    <Container>
      <Header/>
      <Wrapper>
        {healthData.length > 0 ?
          <>
            <Table>
              <tbody>

                <Row>
                  <TableDataI>Full Name :</TableDataI>
                  <TableDataII><FName type="text" name="name" value={healthData[0].name} readOnly></FName></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Age :</TableDataI>
                  <TableDataII><Age type="text" name="age" value={healthData[0].age} readOnly></Age></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Blood Group :</TableDataI>
                  <TableDataII>
                    <BloodGroup type='text' name="bloodgroup" value={healthData[0].bloodgroup} readOnly>
                    </BloodGroup>
                  </TableDataII>
                </Row>

                <Row>
                  <TableDataI>Allergies :</TableDataI>
                  <TableDataII><Allergies name="allergies" value={healthData[0].allergies} readOnly></Allergies></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Medications :</TableDataI>
                  <TableDataII><Medications name="medications" value={healthData[0].medications} readOnly></Medications></TableDataII>
                </Row>

                <Row>
                  <TableDataI>Vaccinations :</TableDataI>
                  <TableDataII><Vaccinations name="vaccinations" value={healthData[0].vaccinations} readOnly /></TableDataII>
                </Row>
                <Row>
                  <TableDataI>Chronic Conditions :</TableDataI>
                  <TableDataII><ChronicConditions name="chronicconditions" value={healthData[0].chronicconditions} readOnly /></TableDataII>
                </Row>
                <Row>
                  <TableDataI>Recent Hospitalization :</TableDataI>
                  <TableDataII><RecentHospitalization name="recenthospitalization" value={healthData[0].recenthospitalization} readOnly /></TableDataII>
                </Row>
                <Row>
                  <TableDataI>Emergency Contact :</TableDataI>
                  <TableDataII><EmergencyContact name="emergencycontact" value={healthData[0].emergencycontact} readOnly /></TableDataII>
                </Row>
                <Row>
                  <TableDataI>Additional Information :</TableDataI>
                  <TableDataII><AdditionalInformation name="additionalinformation" value={healthData[0].additionalinformation} readOnly /></TableDataII>
                </Row>

                <Row>
                  <TableDataI> Health Record :</TableDataI>
                  <TableDataII>
                    {/* <PFile type="file" name="passFile" readOnly /> */}
                    <a href={`http://localhost:5000/${healthData[0].healthrecord}`} target="_blank">Health Record File</a>
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


export default HealthRecords
