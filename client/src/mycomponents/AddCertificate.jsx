import styled from "styled-components"
import { useState } from "react"
import { axiosprivate } from '../api/axios'
import { useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"

const Container = styled.div`
  width: 100%;
  height: 80vh;
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

const CName = styled.input`
  width: 80%;
  padding: 5px 10px;
`
const Organization = styled.input`
 width: 80%;
 padding: 5px 10px;
`


const IDate = styled.input`
  padding:5px 10px;
`
const EDate = styled.input`
  padding:5px 10px;
`


const CFile = styled.input``

const Submit = styled.button`
  width: 40%;
  align-self: center;
  padding: 0.5rem 1rem;
  border: 1px solid #144734;
  background-color: #144734;
  color: whitesmoke;
  border-radius: 0.5rem;
  cursor: pointer;

  :hover{
    color:#c6a856;
  }

`

const AddCertificate = () => {

    const [certificateData, setCertificateData] = useState({

        userid: localStorage.getItem('userid'),
        certificatename: '',
        organization: '',
        issueDate: '',
        expiryDate: '',
        certificate: null

    });


    const handleChange = (event) => {
        if (event.target.name === 'certificate') {
            setCertificateData(
                {
                    ...certificateData,
                    certificate: event.target.files[0]
                }
            )
        } else {

            setCertificateData(
                {
                    ...certificateData,
                    [event.target.name]: event.target.value
                }
            )
        }
    }

    const handleCertificateSubmit = async () => {
        let flag = true;


        if (certificateData.userid && certificateData.certificatename && certificateData.organization && certificateData.issueDate && certificateData.expiryDate && certificateData.certificate) {

            var q = new Date();
            var date = new Date(q.getFullYear(), q.getMonth(), q.getDate());

            if (certificateData.issueDate > certificateData.expiryDate || date > certificateData.expiryDate) {
                alert("Expiry date should be greater than issue date and current date")
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
                formData.append('userid', certificateData.userid);
                formData.append('certificatename', certificateData.certificatename);
                formData.append('organization', certificateData.organization);

                formData.append('issueDate', certificateData.issueDate);
                formData.append('expiryDate', certificateData.expiryDate);

                formData.append('certificate', certificateData.certificate);

                try {
                    const res = await axiosprivate.post(`/uploadcertificates/certificate/${localStorage.getItem('userid')}`, formData, config)
                    res && alert("Certificate uploaded successfully!")
                    window.location.href = '/certificates'

                } catch (err) {
                    console.log(err)
                    // alert(err.response.data.message)
                }
            }

        } else {
            alert("Please fill all fields!")
        }
    }

    return (
        <Container>
            <Header/>
            <Wrapper>
                <Table>
                    <tbody>

                        <Row>
                            <TableDataI>Certificate Name :</TableDataI>
                            <TableDataII><CName type="text" name="certificatename" value={certificateData.certificatename} onChange={handleChange}></CName></TableDataII>
                        </Row>

                        <Row>
                            <TableDataI>Organization :</TableDataI>
                            <TableDataII><Organization type="text" name="organization" value={certificateData.organization} onChange={handleChange}></Organization></TableDataII>
                        </Row>

                    
                        <Row>
                            <TableDataI>Issue Date :</TableDataI>
                            <TableDataII><IDate type="date" name="issueDate" value={certificateData.issueDate} onChange={handleChange} /></TableDataII>
                        </Row>

                        <Row>
                            <TableDataI>Expiry Date :</TableDataI>
                            <TableDataII><EDate type="date" name="expiryDate" value={certificateData.expiryDate} onChange={handleChange} /></TableDataII>
                        </Row>


                        <Row>
                            <TableDataI> Certificate :</TableDataI>
                            <TableDataII>
                                <CFile type="file" name="certificate" onChange={handleChange} />
                            </TableDataII>
                        </Row>

                    </tbody>
                </Table>
                <Submit onClick={handleCertificateSubmit}>Upload</Submit>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default AddCertificate
