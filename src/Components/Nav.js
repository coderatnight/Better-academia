import React, { useState } from 'react'
import Sidenav from './Sidenav'
import { Link } from 'react-router-dom'
import { cardColorTheme } from './ColorTheme'

const Nav=({
    title = "Attendance",
    medals = ""
})=>{

    const [styles,setStyles]=useState({marginLeft:0,width:0})


    function closeNav() {
        setStyles({...styles,marginLeft:0,width:0})
    }

    const triggerNav=()=>{
        setStyles({...styles,marginLeft:250,width:250})
      }

    const logout=()=>{
        localStorage.clear()
      }

      const palette = cardColorTheme[localStorage.getItem('theme')]

    return(
    <div className='nav-top' style={Object.assign({},palette.background,palette.heading)}>
    <div id="mySidenav" className="sidenav" style={Object.assign({},palette.safe,{width:styles.width})}>
        <Sidenav closeNav={closeNav}/>
    </div>
    <div className='main-name-container'>
        <span style={{fontSize:'30px',cursor:'pointer',left:0}} onClick={triggerNav}>&#9776;</span>
                <h1>{title}</h1>
                <div className='main-medals'>{medals}</div>
    </div>
    </div>
    )
}

export default Nav