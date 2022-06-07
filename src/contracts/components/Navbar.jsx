import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Web3 from "web3";

const Navbar = () => {
    const location = useLocation();
    const { ethereum } = window;
    const [account, setAccount] = useState('');
    useEffect(() => {
        const onLoadData = async () => {
            const web3 = new Web3(Web3.givenProvider);
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
        }
        onLoadData();
    }, [])
    const walletConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            await setAccount(accounts[0]);
            window.location.reload()
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand fs-1" href="/">Web3.0 token Access</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" href="/">Read Contracts</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname === '/write-contract' ? 'active' : ''}`} href="/write-contract">Write contracts</a>
                            </li>
                            <li className="nav-item">
                                <button className={`btn btn-primary `} onClick={walletConnect}>{account ? "Wallet Connected" : "Connect Wallet"}</button>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;