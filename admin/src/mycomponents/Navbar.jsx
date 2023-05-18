import { useState, useEffect } from "react";
import styled from "styled-components"
import logo from '../images/LOGO.svg'
import { NavLink } from 'react-router-dom'
import { axiosprivate } from "../api/axios";

// import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
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
    width: 80%;
    padding: 0.5rem 1rem;
    /* text-align: center; */
    /* color: whitesmoke; */
    list-style: none;
    margin: 0.8rem;
    
    /* background-color: black; */
    &:hover{
        /* background-color: white; */
        color:#c6a856;
        
    }

`


const navlinkstyle = ({ isActive }) => {
    // return isActive ? {color:"#c6a856"} : {color:"whitesmoke"}
    return {
        color: isActive ? '#c6a856' : 'whitesmoke',
        textDecoration: 'none',
        // display:'flex',


    }
}


function handlelogout() {
    localStorage.clear();
    window.location.href = '/login'
}

const Navbar = () => {
    
    return (
        <Wrapper>
            <LogoSection>
                <LogoImg src={logo} />
            </LogoSection>
            <MenuSection>
                <Menu>
                    <NavLink to='/' style={navlinkstyle}><MenuItem style={{ display: 'flex', alignItems: 'end', gap: '5px' }}><DescriptionIcon />&nbsp; Staff Documents</MenuItem></NavLink>
                    <NavLink to='/healthrecords' style={navlinkstyle}><MenuItem style={{ display: 'flex', alignItems: 'end', gap: '5px' }}><HealthAndSafetyIcon />&nbsp; Health Records</MenuItem></NavLink>
                    <NavLink to='/confidential' style={navlinkstyle}><MenuItem style={{ display: 'flex', alignItems: 'end', gap: '5px' }}><LockPersonIcon />&nbsp; Confidential</MenuItem></NavLink>
                    <NavLink to='/notifications' style={navlinkstyle}><MenuItem style={{ display: 'flex', alignItems: 'end', gap: '5px' }}><NotificationsIcon />&nbsp; Notifications</MenuItem></NavLink>
                    <NavLink to='/staffmembers' style={navlinkstyle}><MenuItem style={{ display: 'flex', alignItems: 'end', gap: '5px' }}><PeopleAltIcon />&nbsp; Staff Members</MenuItem></NavLink>
                    <NavLink to='/login' style={navlinkstyle} onClick={handlelogout}><MenuItem style={{ display: 'flex', alignItems: 'end', gap: '5px' }}><LogoutIcon />&nbsp; Log-Out</MenuItem></NavLink>

                </Menu>
            </MenuSection>
        </Wrapper>
    )
}

export default Navbar
