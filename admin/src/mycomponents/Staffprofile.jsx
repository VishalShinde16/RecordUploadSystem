// import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { axiosprivate, axiosprivatejson, axiospublic } from '../api/axios'
// import bg1 from '../images/wSprite.png'
import bg3 from '../images/bg3.jpg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Header from './Header';
import CloseIcon from '@mui/icons-material/Close';
import bg from '../images/wSprite.png';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* height: 100vh; */
    width: 100%;
    /* background-image: url(${bg}); */

`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color:#f5f5f5;
    padding: 1rem 1rem 2rem 1rem;
    box-shadow: 2px 4px 6px gray;
    border-radius: 1rem;
    width: 50%;
    margin-top: 1rem;
`

const Title = styled.h2`
  align-self: center;
  color:#c6a856;
  font-weight: 600;
  letter-spacing: 3px;
  /* margin-bottom: 1rem; */
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem 0;
`

const ProfileLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Table = styled.table`
 border-spacing: 1rem 1rem ;
 margin-top: 2rem;
 /* background-color: gray; */
 width: 100%;
 
`
const TableRow = styled.tr`
  /* margin:1rem; */
  /* background-color: yellow; */
`
const TableDataI = styled.td`
  width: 40%;
  /* background-color: aqua; */
`
const TableDataII = styled.td`
  width:60% ;
`
const Name = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%; 
`
const Email = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%;  

`
const Password = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%;  
`

const Department = styled.select`
  width: 50%;
`
const JobTitle = styled.input`
 font-size:medium;
 padding:3px 5px;
 width: 100%;  
`

const Submit = styled.button`
  width: 50%;
  align-self: center;
  padding: 0.5rem 1rem;
  border:none;
  background-color: #144734;
  color: whitesmoke;
  border-radius: 0.5rem;
  margin:0.5rem 0;
  cursor: pointer;

  :hover{
    
    color:#c6a856;
  }
`
const Links = styled.a`
    text-decoration: underline;
    /* margin: 5px 0 0 0 ; */
    cursor: pointer;
    color: gray;
    font-size: small;
    
`
const DocumentSection = styled.div`
  padding: 1rem;
  width: 90%;
  margin: 1rem 0;
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


const Records = styled.div``
/* background-color: yellow; */



const TableHeading = styled.th`
  border: 1px solid lightgray;
  border-collapse:collapse;
  border-top: none;
  padding: 5px 30px;
  font-weight: 500;
  /* color:#c6a856; */
`
const TableData = styled.td`
  border: 1px solid lightgray;
  border-collapse:collapse;
  padding: 5px 5px;
  text-align: center;
  font-size: 0.9rem;
`


const Staffprofile = () => {

    const userid = (window.location.href).split("/")[4]


    const [userdata, setUserdata] = useState({})
    
    let allRecords = []
    const [pass, setPass] = useState();
    const [visa, setVisa] = useState();
    const [certificates, setCertificates] = useState([]);

    const [temp,setTemp] = useState({
        yes:true,
        no:false
    })


    //get user profile data
    const getUser = async () => {
        try {
            const user = await axiosprivatejson.get(`user/${userid}`);
            console.log(user)
            setUserdata(user.data)
        } catch (err) {
            console.log(err)
        }
    }



    const handleChange = (event) => {

        setUserdata({
            ...userdata,
            [event.target.name]: event.target.value
        })
    }
    const updateUser = async () => {
        let flag = true;
        let error = '';
        var nameregex = /^[a-zA-Z ]*$/;

        if (userdata.username && userdata.email && userdata.password && userdata.department && userdata.jobtitle) {

            if (!(userdata.username.match(nameregex))) {
                flag = false;
                error = "Name should only contains characters";
            }

            if (userdata.password.length < 6) {
                flag = false;
                error = "Password should be at least 6 characters";
            }

            if (userdata.department === 'none') {
                flag = false;
                error = "Please select department";
            }
            if (!userdata.jobtitle) {
                flag = false;
                error = "Please select Job Title"
            }

            if (flag) {


                try {
                    const response = await axiosprivatejson.put(`/user/${userid}`, userdata)

                    console.log(response);
                    alert("Profile update successfull !")

                } catch (err) {
                    console.log(err)
                }

            } else {
                alert(error);
            }

        } else {
            alert("Please fill all the fields!")
        }
    }

    //get user records
    const getdata = async () => {
        try {
            const pass = await axiosprivate.get(`/upload/passport/${userid}`)
            const visa = await axiosprivate.get(`/uploadvisa/visa/${userid}`)
            // const health = await axiosprivate.get(`/uploadhealthrecords/healthrecords/${localStorage.getItem('userid')}`)
            const Certificatesdata = await axiosprivate.get(`/uploadcertificates/certificate/${localStorage.getItem('userid')}`)
            setPass(pass.data[0])
            setVisa(visa.data[0])
            // setHealth(health.data[0])
            setCertificates(Certificatesdata.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUser();
        getdata();
    }, [])

    function calculateDays(expdate) {
        var date2, date1, cdate;

        const date = new Date();
        cdate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()).toString();

        date1 = new Date(cdate);
        date2 = new Date(expdate.split("T")[0]);

        //calculate time difference
        var time_difference = date2.getTime() - date1.getTime();

        //calculate days difference by dividing total milliseconds in a day
        var days_difference = time_difference / (1000 * 60 * 60 * 24);

        return days_difference
    }

    if (pass && visa && certificates) {
        allRecords.push({ ...pass, type: 'passport', docname: 'Passport', view: pass.passport })
        allRecords.push({ ...visa, type: 'visa', docname: 'Visa', view: visa.visa })

        certificates.map((certificate) => {
            allRecords.push({ ...certificate, type: 'certificate', docname: certificate.certificatename, view: certificate.certificate })
        })
    }

   
   
    return (
        <>
            <Header />
            <Container>
                <Wrapper>
                    {Object.keys(userdata).length > 0 ?
                        <Main>
                            {/* <CloseIcon style={{ color: '#144734', alignSelf: 'flex-end', fontSize: '2rem', cursor: 'pointer' }} onClick={close} /> */}
                            <ProfileLogo>
                                <AccountCircleIcon style={{ fontSize: '10rem', color: '#144734' }} />
                                <Title>{userdata.username}</Title>
                            </ProfileLogo>

                            <Table>
                                <tbody>
                                    <TableRow>
                                        <TableDataI>Full Name :</TableDataI>
                                        <TableDataII><Name type='text' placeholder='' value={userdata.username} name='username' onChange={handleChange} /></TableDataII>
                                    </TableRow>

                                    <TableRow>
                                        <TableDataI>Email : </TableDataI>
                                        <TableDataII><Email type='email' placeholder='example@gmail.com' value={userdata.email} name='email' readOnly /></TableDataII>
                                    </TableRow>

                                    <TableRow>
                                        <TableDataI>Department : </TableDataI>
                                        <TableDataII>
                                            <Department onChange={handleChange} name='department' defaultValue={(userdata.department).toString()}>
                                                <option value="none" disabled hidden>--select--</option>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                            </Department>
                                        </TableDataII>
                                    </TableRow>

                                    <TableRow>
                                        <TableDataI>Admin Access : </TableDataI>
                                        <TableDataII>
                                            <Department onChange={handleChange} name='isAdmin' defaultValue={userdata.isAdmin}>
                                                
                                                <option value={temp.no}>Not Allowed</option>
                                                <option value={temp.yes}>Allowed</option>
                                                
                                            </Department>
                                        </TableDataII>
                                    </TableRow>


                                    <TableRow>
                                        <TableDataI>Job Title :</TableDataI>
                                        <TableDataII><JobTitle type='text' placeholder='' value={userdata.jobtitle} name='jobtitle' onChange={handleChange} /></TableDataII>
                                    </TableRow>

                                </tbody>
                            </Table>

                            <Submit onClick={updateUser}>Save</Submit>


                        </Main>
                        :
                        <p>Loading...</p>
                    }
                </Wrapper>
                <DocumentSection>
                    <Title>User Records</Title>
                    <Records>
                        <TableContainer>
                            <Table style={{ borderCollapse: 'collapse' }}>
                                <tbody>
                                    <TableRow>
                                        <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                                        <TableHeading>Name</TableHeading>
                                        <TableHeading>Type</TableHeading>
                                        <TableHeading>Expires In</TableHeading>
                                        <TableHeading style={{ borderRight: 'none' }}>View</TableHeading>
                                    </TableRow>

                                    {allRecords.length > 0 &&
                                        allRecords.slice(0).sort((d1, d2) => (d1.expirydate > d2.expirydate) ? 1 : (d1.expirydate < d2.expirydate) ? -1 : 0).map(({ _id, type, docname, expirydate, view }, index) => (
                                            <TableRow key={_id}>
                                                <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>
                                                <TableData>{docname}</TableData>
                                                <TableData>{type}</TableData>
                                                <TableData>{Math.floor(calculateDays(expirydate)) > 10 ? <span style={{ color: 'green' }}><b>{Math.floor(calculateDays(expirydate))} days</b></span> : <span style={{ color: 'red' }}><b>{Math.floor(calculateDays(expirydate)) <= 0 ? "Expired" : Math.floor(calculateDays(expirydate)) + ' days'}</b></span>}</TableData>
                                                <TableData style={{ borderRight: 'none' }}><a href={`http://localhost:5000/${view}`} target='_blank' style={{ color: 'black' }}><VisibilityIcon /></a></TableData>
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

export default Staffprofile
