import styled from "styled-components"
import logo from '../images/LOGO.svg'
import {NavLink} from 'react-router-dom'


import HomeIcon from '@mui/icons-material/Home';
import BackupIcon from '@mui/icons-material/Backup';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const LogoSection = styled.div`
    flex:25%;
    width: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
    /* background-color: yellow; */
    overflow: hidden;
`

const LogoImg = styled.img`
    height: 85%;
    width: 85%;
`



const MenuSection = styled.div`
    flex:75%;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Menu = styled.ul`
    margin-top: 2rem;
    margin-left: 3rem;
    width: 100%;
`

const MenuItem = styled.li`
    width: 70%;
    padding: 0.5rem 1rem;
    /* text-align: center; */
    /* color: whitesmoke; */
    list-style: none;
    margin: 0.8rem;
    
    /* background-color: black; */
    &:hover{
        /* background-color: white; */
        color:#b64615;
        
    }

`


const navlinkstyle = ({isActive})=>{
    // return isActive ? {color:"#b64615"} : {color:"whitesmoke"}
    return{
        color: isActive ? '#b64615' : 'whitesmoke',
        textDecoration:'none',
        // display:'flex',
    
        
    }
}

const subnavlinkstyle = ({isActive})=>{
    return{
        color: isActive ? '#b64615' : 'whitesmoke',
        textDecoration:'none',
        fontSize:'0.9rem',

    }
}

function handlelogout(){
    localStorage.clear();
    window.location.href = '/login'
}

const Navbar = () => {
  return (
    <Wrapper>
        <LogoSection>
            <LogoImg src={logo}/>
        </LogoSection>
        <MenuSection>
            <Menu>
                <NavLink to='/' style={navlinkstyle}><MenuItem style={{display:'flex',alignItems:'end',gap:'5px'}}><HomeIcon/>Home</MenuItem></NavLink>
                <span >
                    <MenuItem ><span style={{display:'flex',alignItems:'end',gap:'5px',color:'whitesmoke'}}><BackupIcon/>Upload</span>
                    <ul>
                        <NavLink to='/passport' style={subnavlinkstyle}><MenuItem style={{marginLeft:'22px'}}> -Passport</MenuItem></NavLink>
                        <NavLink to='/visa' style={subnavlinkstyle}><MenuItem style={{marginLeft:'22px'}}> -Visa</MenuItem></NavLink>
                        <NavLink to='/healthrecords' style={subnavlinkstyle}><MenuItem style={{marginLeft:'22px'}}> -Health Records</MenuItem></NavLink>
                        <NavLink to='/confidential' style={subnavlinkstyle}><MenuItem style={{marginLeft:'22px'}}> -Confidential Documents</MenuItem></NavLink>
                    </ul>
                    </MenuItem>
                   
                </span>
                
                <NavLink to='/notifications' style={navlinkstyle}><MenuItem style={{display:'flex',alignItems:'end',gap:'5px'}}><NotificationsIcon/>Notifications</MenuItem></NavLink>
                <NavLink to='/login' style={navlinkstyle} onClick={handlelogout}><MenuItem style={{display:'flex',alignItems:'end',gap:'5px'}}><LogoutIcon/>Log-Out</MenuItem></NavLink>
                
            </Menu>
        </MenuSection>
    </Wrapper>
  )
}

export default Navbar
