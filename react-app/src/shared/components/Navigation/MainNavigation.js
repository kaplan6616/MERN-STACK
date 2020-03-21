import React, {useState} from 'react';
import './MainNavigation.css';
import MainHeader from "./MainHeader"
import NavLinks from "./NavLinks"
import SideDrawer from "./SideDrawer"
import Backdrop from "../UIElements/Backdrop"
import {Link} from "react-router-dom"

const MainNavigation = (props) => {
    const [drawerIsOpen,setDrawerIsOpen] = useState(false);
    function isDrawerOpenHandler(){
        if(drawerIsOpen){
            return(
                <Backdrop onClick = {closeDrawerHandler}/>
            )
        }
        else{
            return null
        }
    }
    function openDrawerHandler(){
        setDrawerIsOpen(true)
    }
    function closeDrawerHandler(){
        setDrawerIsOpen(false)
    }
    return (
        <React.Fragment>
            {isDrawerOpenHandler()}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className ="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader className="main-header">
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Your places</Link>
                </h1>
                <nav className ="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
};

export default MainNavigation;
