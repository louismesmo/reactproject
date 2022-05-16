import React from "react";
import './Header.css'

class Header extends React.Component {
    render(){
        return(
            <>
            <div className="header">
                <div className="content">
                    <div className="logo">
                    <img src={require('../imgs/logo192.png')} alt="Site Logo"/>
                    </div>
                    <div className="menu">
                        
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Header