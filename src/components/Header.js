import React from 'react'
import logo from "../images/Google_Drive_icon_(2020).svg"
import "../CSS/header.css"
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material'

function Header({ photoURL }) {
    return (
        <div className="header">

            <div className="header__logo">
                <img src={logo} alt="Google-Drive-Logo" />
                <span>Drive</span>
            </div>

            <div className="header__search">
                <SearchIcon />
                <input type="text" placeholder="Search in Drive"></input>
                <FormatAlignCenterIcon></FormatAlignCenterIcon>
            </div>

            <div className="header__icons">
                <span>
                    <HelpOutlineIcon></HelpOutlineIcon>
                    <SettingsIcon></SettingsIcon>
                </span>

                <span>
                    <AppsIcon></AppsIcon>
                    <Avatar src={photoURL} />
                </span>
            </div>

        </div>
    )
}

export default Header
