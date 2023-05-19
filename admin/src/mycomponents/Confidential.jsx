import { useState } from "react"
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'
import { axiosprivate ,axiosprivatejson, axiospublic} from "../api/axios"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Container = styled.div`
  width: 100%;
`

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  gap: 0.5rem;
`

const Key = styled.input`
  padding: 5px 8px;
  border-radius: 5px;
  border:1px solid gray;
`
const Button = styled.button`
  background-color: #144734;
  border:none;
  color:whitesmoke;
  padding: 3px 10px;
  border-radius: 5px;
  cursor: pointer;
  :hover{
    color:#c6a856;
  }
`

const ConfButton = styled.button`
  background-color: #144734;
  border:none;
  color:whitesmoke;
  padding: 5px 10px;
  border-radius: 5px;
  width: 10%;
  cursor: pointer;
  :hover{
    color:#c6a856;
  }
`

const AddDataSection = styled.div`
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

const Title = styled.input`
  width: 90%;
  padding: 5px 8px;
`
const Desc = styled.textarea`
  width: 90%;
  padding: 5px 8px;

`

const ViewDataSection = styled.div`
  display: flex;
  flex-direction: column;

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

const ActionButton = styled.button`
  padding: 2px 5px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  background-color: white;

 
`
const Confidential = () => {

  const [key, setKey] = useState('');
  const [confData, setConfData] = useState([]);
  const [flag, setFlag] = useState(false);

  const [addData, setAddData] = useState({
    title: '',
    description: '',
    confFile: null
  });

  function handlepasswdChange(event) {
    setKey(event.target.value);
  }

  async function handleClick() {
    try {
      const data = await axiosprivatejson.post(`/confidential/getconf/${localStorage.getItem('userid')}`, { "secretkey": key });
      data && setConfData(data.data)
      setFlag(true)
      console.log(data)
    } catch (err) {
      console.log(err)
      alert(err.response.data)
    }
  }

  function handleChange(event) {

    if (event.target.name === 'confFile') {
      setAddData(
        {
          ...addData,
          confFile: event.target.files[0]
        }
      )
    } else {

      setAddData(
        {
          ...addData,
          [event.target.name]: event.target.value
        }
      )
    }
  }

  const addconfdata = async () => {
    
        const config = {
          baseURL:'http://localhost:5000/',
          headers: {
            token: (`Bearer ${localStorage.getItem("token")}`).toString(),
            'Content-Type': 'multipart/form-data'
          }
        }

        const formData = new FormData();
        formData.append('title', addData.title);
        formData.append('description', addData.description);        
        formData.append('confFile', addData.confFile);

        try {
          
            const res = await axios.post(`/confidential/addconf/${localStorage.getItem('userid')}`, formData, config)
            res && alert("Confidential data uploaded successfully!")
            
          
        } catch (err) {
          console.log(err)
          
        }
      }

  

  async function deletedocument(id){
    try{
      if (window.confirm("Are you sure you want to delete this document?") ===true) {
      
        const res = await axiosprivatejson.delete(`/confidential/${localStorage.getItem('userid')}/${id}`)
        alert("Document deleted successfully!")
      }else{
        //nothing
      }

    }catch(err){
      console.log(err)
    }
  }


  return (
    <>
      <Header />
      <Container>
        <TopSection>
          <Key placeholder="Enter Secret Key" type="password" value={key} onChange={handlepasswdChange} />
          <Button onClick={handleClick}>Submit</Button>
        </TopSection>

        {flag &&
          <>
            <AddDataSection>
              <h3 style={{ color: '#c6a856' }}>+ Add Document</h3>
              <table style={{ borderSpacing: '1rem 1rem' }}>
                <tbody>
                  <tr>
                    <td>Title:</td>
                    <td><Title type="text" name="title" value={addData.title} onChange={handleChange} /></td>
                  </tr>

                  <tr>
                    <td>Description:</td>
                    <td><Desc name='description' value={addData.description} onChange={handleChange} /></td>
                  </tr>

                  <tr>
                    <td>File:</td>
                    <td><input type='file' name='confFile' onChange={handleChange} /></td>
                  </tr>

                </tbody>
              </table>

              <ConfButton onClick={addconfdata} style={{alignSelf:'center'}}>Add</ConfButton>
            </AddDataSection>

            <ViewDataSection>
                <p style={{color:'gray',alignSelf:'flex-end',marginRight:'1rem'}}>Refresh to see the updated table</p>
              <TableContainer>
                <Table id='allconfdata'>
                  <tbody>

                    <TableRow>
                      <TableHeading style={{ borderLeft: 'none' }}>Index</TableHeading>
                      <TableHeading>Title</TableHeading>
                      <TableHeading>Description</TableHeading>
              

                      <TableHeading style={{ borderRight: 'none' }}>Action</TableHeading>

                    </TableRow>

                    {confData.length > 0 &&

                      confData.map(({ _id, title, description, confFile }, index) => (

                        <TableRow key={_id}>


                          <TableData style={{ borderLeft: 'none' }}>{index + 1}</TableData>

                          <TableData>{title}</TableData>
                          <TableData>{description}</TableData>
                    


                          <TableData style={{ borderRight: 'none' }}>
                            <Link to={`http://localhost:5000/${confFile}`} target='_blank'>
                              <ActionButton><VisibilityIcon /></ActionButton>
                            </Link>

                            <ActionButton onClick={() => deletedocument(_id)}><DeleteForeverOutlinedIcon /></ActionButton>
                          </TableData>

                        </TableRow>
                      ))

                    }

                  </tbody>
                </Table>
              </TableContainer>
            </ViewDataSection>
          </>
        }
      </Container>
    </>
  )
}

export default Confidential
