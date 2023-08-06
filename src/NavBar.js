import React from "react";
import './styles.css';

const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount(){
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }
    return (
        <header>
        <nav>
            <div className="logo">
            <h1>EDENVERDEN</h1>
            </div>
                    <ul className="nav-links">
                        <li><a href="#">About</a></li>
                        <li><a href="#">RoadMap</a></li>
                        <li><a href="#">FAQ</a></li>
        {isConnected ? (
            <p>Connected</p>
        ) : (
            <li><button className="connect-button" onClick={connectAccount}>Connect</button></li>
        )}
        </ul>
       </nav>
       </header>

    );
};

export default NavBar;