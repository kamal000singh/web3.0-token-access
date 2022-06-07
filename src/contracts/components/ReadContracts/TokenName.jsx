import React, { useState } from 'react'
import Token from '../../abi/Token.json';

const TokenName = ({ web3 }) => {
    const [tokenName, setTokenName] = useState('');
    const handleClick = async () => {
        console.log(Token.address);
        const token = new web3.eth.Contract(Token.abi, Token.address);
        if (token) {
            let ethName = await token.methods.name().call();
            setTokenName(ethName.toString());

        } else {
            window.alert('Token contract is not deployed to detected network')
        }
    }
    return (
        <div className="d-flex align-items-center">
            <button className="btn btn-secondary fs-5 m-1" onClick={handleClick}>Token Name</button>{tokenName !== '' && <span className="fs-5 mx-3">{tokenName}</span>}
        </div>
    )
}

export default TokenName