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

const BloodGroup = styled.select`
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

const AddHealthRecord = () => {

    const [healthData, sethealthData] = useState({

        userid: localStorage.getItem('userid'),
        name: '',
        age: null,
        bloodgroup: '',
        allergies: '',
        medications: '',
        vaccinations: '',
        chronicconditions: '',
        recenthospitalization: '',
        emergencycontact: '',
        additionalinformation: '',
        healthrecord: null

    });


    const handleChange = (event) => {
        if (event.target.name === 'healthrecord') {
            sethealthData(
                {
                    ...healthData,
                    healthrecord: event.target.files[0]
                }
            )
        } else {

            sethealthData(
                {
                    ...healthData,
                    [event.target.name]: event.target.value
                }
            )
        }
    }

    const handleHealthSubmit = async () => {
        let flag = true;
        var nameregex = /^[a-zA-Z ]*$/;


        if (healthData.userid && healthData.name && healthData.age && healthData.bloodgroup) {
            if (!(healthData.name.match(nameregex))) {
                alert("Name should only contain characters");
                flag = false;
            }

            if (healthData.age < 1) {
                alert("Please enter valid age")
                flag = false;
            }


            if (flag) {

                const config = {
                    headers: {
                        token: (`Bearer ${localStorage.getItem("token")}`).toString(),
                        'Content-Type': 'multipart/form-data'
                    }
                };

                const formData = new FormData();
                formData.append('userid', healthData.userid);
                formData.append('name', healthData.name);
                formData.append('age', healthData.age);
                formData.append('bloodgroup', healthData.bloodgroup);
                formData.append('allergies', healthData.allergies);
                formData.append('medications', healthData.medications);
                formData.append('vaccinations', healthData.vaccinations);
                formData.append('chronicconditions', healthData.chronicconditions);
                formData.append('recenthospitalization', healthData.recenthospitalization);
                formData.append('emergencycontact', healthData.emergencycontact);
                formData.append('additionalinformation', healthData.additionalinformation);
                formData.append('healthrecord', healthData.healthrecord);

                try {
                    const checkpass = await axiosprivate.get(`/uploadhealthrecords/healthrecords/${localStorage.getItem('userid')}`)
                    console.log("checkpass", checkpass)
                    console.log("input data",healthData)
                    if (checkpass.data.length < 1) {
                        const res = await axiosprivate.post(`/uploadhealthrecords/healthrecords/${localStorage.getItem('userid')}`, formData, config)
                        res && alert("Health record uploaded successfully!")
                        window.location.href = '/healthrecords'
                    } else {
                        const res = await axiosprivate.put(`/uploadhealthrecords/healthrecords/${localStorage.getItem('userid')}/${checkpass.data[0]._id}`, formData, config)
                        res && alert("Health record updated successfully!")
                        window.location.href = '/healthrecords'
                    }

                } catch (err) {
                    console.log(err)
                    // alert(err.response.data.message)
                }
            }

        } else {
            alert("Name, Age, Bloodgroup and Health Record fields are mandatory!")
        }
    }

    return (
        <Container>
            <Header/>
            <Wrapper>
                <Table>
                    <tbody>

                        <Row>
                            <TableDataI>Full Name :</TableDataI>
                            <TableDataII><FName type="text" name="name" value={healthData.name} onChange={handleChange}></FName></TableDataII>
                        </Row>

                        <Row>
                            <TableDataI>Age :</TableDataI>
                            <TableDataII><Age type="number" name="age" value={healthData.age} onChange={handleChange}></Age></TableDataII>
                        </Row>

                        <Row>
                            <TableDataI>Blood Group :</TableDataI>
                            <TableDataII>
                                <BloodGroup name="bloodgroup" defaultValue='none' onChange={handleChange}>
                                    <option value="none" disabled hidden>--select--</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B+">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>

                                </BloodGroup>
                            </TableDataII>
                        </Row>

                        <Row>
                            <TableDataI>Allergies :</TableDataI>
                            <TableDataII><Allergies name="allergies" value={healthData.allergies} onChange={handleChange}></Allergies></TableDataII>
                        </Row>

                        <Row>
                            <TableDataI>Medications :</TableDataI>
                            <TableDataII><Medications name="medications" value={healthData.medications} onChange={handleChange}></Medications></TableDataII>
                        </Row>

                        <Row>
                            <TableDataI>Vaccinations :</TableDataI>
                            <TableDataII><Vaccinations name="vaccinations" value={healthData.vaccinations} onChange={handleChange} /></TableDataII>
                        </Row>
                        <Row>
                            <TableDataI>Chronic Conditions :</TableDataI>
                            <TableDataII><ChronicConditions name="chronicconditions" value={healthData.chronicconditions} onChange={handleChange} /></TableDataII>
                        </Row>
                        <Row>
                            <TableDataI>Recent Hospitalization :</TableDataI>
                            <TableDataII><RecentHospitalization name="recenthospitalization" value={healthData.recenthospitalization} onChange={handleChange} /></TableDataII>
                        </Row>
                        <Row>
                            <TableDataI>Emergency Contact :</TableDataI>
                            <TableDataII><EmergencyContact name="emergencycontact" value={healthData.emergencycontact} onChange={handleChange} /></TableDataII>
                        </Row>
                        <Row>
                            <TableDataI>Additional Information :</TableDataI>
                            <TableDataII><AdditionalInformation name="additionalinformation" value={healthData.additionalinformation} onChange={handleChange} /></TableDataII>
                        </Row>


                        <Row>
                            <TableDataI> Health Record File :</TableDataI>
                            <TableDataII>
                                <HealthRecord type="file" name="healthrecord" onChange={handleChange} />
                            </TableDataII>
                        </Row>

                    </tbody>
                </Table>
                <Submit onClick={handleHealthSubmit}>Upload</Submit>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default AddHealthRecord

