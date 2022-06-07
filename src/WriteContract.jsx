import React, { useEffect, useState } from 'react';
import Web3 from "web3";
import Transfer from './contracts/components/WriteContracts/Transfer';
import IncreaseAllowance from './contracts/components/WriteContracts/IncreaseAllowance';
import Approve from './contracts/components/WriteContracts/Approve';
import DecreaseAllowance from './contracts/components/WriteContracts/DecreaseAllowance';
import TransferFrom from './contracts/components/WriteContracts/TransferFrom';
let web3;


const WriteContract = () => {
    const [account, setAccount] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const initialFunc = async () => {
            await setLoading(true);
            web3 = await new Web3(Web3.givenProvider);
            const accounts = await web3.eth.getAccounts();
            await setAccount(accounts[0]);
            if (account) {
                await setLoading(false);
            }
        }
        initialFunc();
    }, [account])
    return (
        <>
            {loading === true && <div className="text-center fs-1 mt-4">Please Connect Your Wallet First</div>}
            {loading === false && <div className="container">
                <h1 className="text-center m-3">Write Contract</h1>
                <h3 className="text-center my-3">Your Ethereum account is {account}</h3>
                <Transfer web3={web3} />
                <Approve web3={web3} />
                <IncreaseAllowance web3={web3} />
                <DecreaseAllowance web3={web3} />
                <TransferFrom web3={web3} />
            </div>
            }
        </>
    )
}

export default WriteContract