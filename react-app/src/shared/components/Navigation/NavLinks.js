import React,{useContext} from 'react';
import './NavLinks.css';
import {NavLink} from "react-router-dom"
import {AuthContext} from "../../context/auth-context"
const NavLinks = (props) => {
    const auth = useContext(AuthContext);

    const createNavLinks = () => {
        if(auth.isLoggedIn) {
            return (
                <React.Fragment>
                    <li>
                        <NavLink to="/u1/places"> My Places </NavLink>
                    </li>
                    <li>
                        <NavLink to="/places/new"> Add Place </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={auth.logout} to="/auth"> Log Out </NavLink>
                    </li>
                </React.Fragment>
            )
        }
        else {
            return(
                <React.Fragment>
                    <li>
                        <NavLink to="/auth"> Authenticate </NavLink>
                    </li>
                </React.Fragment>
            )
        }
    }
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact> ALL USERS </NavLink>
            </li>
            {createNavLinks()}
        </ul>
    )
};

export default NavLinks;
