import React, { useState } from 'react'
import Token from '../../abi/Token.json';

const TokenSymbol = ({ web3 }) => {
    const [tokenSymbol, setTokenSymbol] = useState('');
    const handleClick = async () => {
        console.log(Token.address);
        const token = new web3.eth.Contract(Token.abi, Token.address);
        if (token) {
            let ethSymbol = await token.methods.symbol().call();
            setTokenSymbol(ethSymbol.toString());

        } else {
            window.alert('Token contract is not deployed to detected network')
        }
    }
    return (
        <div className="d-flex align-items-center">
            <button className="btn btn-secondary fs-5 m-1" onClick={handleClick}>Token Symbol</button>{tokenSymbol !== '' && <span className="fs-5 mx-3">{tokenSymbol}</span>}
        </div>
    )
}

export default TokenSymbol