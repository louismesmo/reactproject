import React from "react";
import './Header.css'

class Header extends React.Component {
    render(){
        return(
            <>
            <header>
                <div className="content">
                    <div className="logo">
                    <img src={require('../imgs/logo192.png')} alt="Site Logo"/>
                    </div>
                    <div className="menu">
                        
                    </div>
                </div>
            </header>
            </>
        )
    }
}

export default Header