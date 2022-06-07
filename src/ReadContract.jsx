import React, { useEffect, useState } from 'react';
import Web3 from "web3";
import TotalSupply from "./contracts/components/ReadContracts/TotalSupply";
import TokenName from "./contracts/components/ReadContracts/TokenName";
import TokenBalanceOf from "./contracts/components/ReadContracts/TokenBalanceOf";
import TokenAllowance from "./contracts/components/ReadContracts/TokenAllowance";
import TokenSymbol from './contracts/components/ReadContracts/TokenSymbol';
let web3;

const ReadContract = () => {
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
    }, [account]);

    return (<>
        {loading === true && <div className="text-center fs-1 mt-4">Please Connect Your Wallet First</div>}
        {loading === false && <div className="container">
            <h1 className="text-center m-3">Read Contract</h1>
            <h3 className="text-center my-3">Your Ethereum account is {account}</h3>
            <TotalSupply web3={web3} /><br />
            <TokenName web3={web3} /><br />
            <TokenSymbol web3={web3} /><br />
            <TokenBalanceOf web3={web3} /><br />
            <TokenAllowance web3={web3} />
        </div>}
    </>
    )
}

export default ReadContract