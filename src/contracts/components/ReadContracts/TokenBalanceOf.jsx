import React, { useState } from 'react';
import Token from '../../abi/Token.json';

const TokenBalanceOf = ({ web3 }) => {
    const [account, setAccount] = useState('');
    const [balanceOf, setBalanceOf] = useState('');
    const handleSubmit = async () => {
        console.log(Token.address);
        const token = new web3.eth.Contract(Token.abi, Token.address);
        if (token) {
            let ethBalance = await token.methods.balanceOf(account).call();
            setBalanceOf(ethBalance.toString());

        } else {
            window.alert('Token contract is not deployed to detected network')
        }
    }
    return (
        <>
            <div className="row g-2">
                <div className="col-md-3">
                    <label htmlFor="Account(Address)" className="form-label">Account(Address)</label>
                    <input type="text" className="form-control" id="floatingInputGrid" onChange={(e) => { setAccount(e.target.value) }} placeholder="Account(Address)" name='account' />
                </div>
                <div className="col-md-7 d-flex align-items-end">
                    <button className="btn btn-secondary" onClick={handleSubmit}>Token BalanceOf</button>
                    {balanceOf !== '' && <span className="fs-5 mx-3">{web3.utils.fromWei(balanceOf, 'ether')} ether</span>}
                </div>
            </div>

        </>
    )
}

export default TokenBalanceOf