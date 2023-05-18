import styled from "styled-components"
import { axiosprivate, axiosprivatejson } from "../api/axios"
import { useState, useEffect } from "react"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Header from "./Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: aqua; */
  width: 90%;
`

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  width: 50%;
  /* align-items: center; */
  /* background-color: white;
  box-shadow: 0 4px 8px lightgray; */

`

const NoticeTitle = styled.input`
  width: 90%;
  padding: 5px 8px;
`
const NoticeDesc = styled.textarea`
  width: 90%;
  padding: 5px 8px;

`
const AddNotice = styled.button`
  width: 30%;
  align-self: center;
  padding: 5px 8px;
  background-color: #144734;
  color:whitesmoke;
  border:none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  :hover{
    color:#c6a856;
  }
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
  color: #c6a856;
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
max-height: 20vh;

`
const Button = styled.button`
  padding: 2px 5px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  background-color: white;

 
`


const Notifications = () => {
  const [allNotifications, setallNotifications] = useState([]);
  const [notice, setNotice] = useState({
    title: '',
    description: ''
  });

  const handleChange = (event) => {
    setNotice(
      {
        ...notice,
        [event.target.name]: event.target.value
      }
    )
  }

  const addNotice = async () => {
    if (notice.title.length > 0 && notice.description.length > 0) {


      try {
        const notification = await axiosprivatejson.post(`/notice/addnotice/${localStorage.getItem('userid')}`,notice)
        alert("Notice sent successfully!")
        console.log(notification)
        window.location.reload(false)

        } catch (err) {
          console.log(err)
        }
      }
      else {
        alert("Please fill all the fields");
      }

    }

    async function deletenotice(id, index) {
        
      try {
 
          if (window.confirm("Are you sure you want to delete this notice?") ===true) {
              await axiosprivatejson.delete(`/notice/deletenotice/${localStorage.getItem('userid')}/${id}`)
              window.location.reload(false)
            } else {
              //do nothing
            }
         
      } catch (err) {
          console.log(err)
      }
  }
  const getNotifications = async () => {
    try {
      const Notificationsdata = await axiosprivate.get(`/notice/getnotice/${localStorage.getItem('userid')}`)
      setallNotifications(Notificationsdata.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getNotifications();
  }, [])

  return (
    <>
    <Container>
      <Header/>
      {/* <h2 style={{color:'#144734',alignSelf:'flex-start',margin:'0.5rem'}}>All Notifications</h2> */}
      <Wrapper>
        <InputSection>
          <h3 style={{color:'#c6a856'}}>+ Add Notice</h3>
          <table style={{ borderSpacing: '1rem 1rem' }}>
            <tbody>
              <tr>
                <td>Title:</td>
                <td><NoticeTitle type="text" name="title" value={notice.title} onChange={handleChange} /></td>
              </tr>

              <tr>
                <td>Description:</td>
                <td><NoticeDesc name='description' value={notice.description} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
          <AddNotice onClick={addNotice}>Add</AddNotice>
        </InputSection>
        <TableContainer>
          <Table id='allNotificationstable'>
            <tbody>

              <TableRow>
                <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                <TableHeading>Date</TableHeading>
                <TableHeading style={{ width: '70%' }}>Notification</TableHeading>
                <TableHeading style={{ borderRight: 'none' }}>Delete</TableHeading>
              </TableRow>

              {allNotifications.length > 0 &&

                allNotifications.slice(0).reverse().map(({ _id, updatedAt, title, description }, index) => (

                  <TableRow key={_id}>


                    <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>

                    <TableData>{updatedAt.toString().split("T")[0]}</TableData>
                    <TableData style={{ padding: '1rem' }}>

                      <Title>{title}</Title>
                      <Description >
                        {description}
                      </Description>
                    </TableData>

                    <TableData style={{ borderRight: 'none' }}>
                        <Button onClick={() => deletenotice(_id)}><DeleteForeverOutlinedIcon /></Button>
                    </TableData>


                  </TableRow>
                ))

              }

            </tbody>
          </Table>
        </TableContainer>
      </Wrapper>
    </Container>
    
  </>
  )
}

export default Notifications
