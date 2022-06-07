import React, { useState } from 'react';
import Token from '../../abi/Token.json';

const DecreaseAllowance = ({ web3 }) => {
    const [decreaseAllowanceData, setDecreaseAllowanceData] = useState({ spender: "", subtractedValue: "" });
    const handleChange = (ev) => {
        setDecreaseAllowanceData({ ...decreaseAllowanceData, [ev.target.name]: ev.target.value });
    }
    const handleSubmit = async () => {
        const accounts = await web3.eth.getAccounts();
        const token = new web3.eth.Contract(Token.abi, Token.address);
        if (token) {
            token.methods.decreaseAllowance(decreaseAllowanceData.spender, decreaseAllowanceData.subtractedValue).send({ from: accounts[0] }).on('transactionHash', async (hash) => {
                window.alert(decreaseAllowanceData.subtractedValue + " Wei is decreaseAllowance to " + decreaseAllowanceData.spender);
            }).on('error', function (error) {
                window.alert(error.message);
            })
        } else {
            window.alert('Token contract is not deployed to detected network')
        }
    }
    return (
        <>
            <div className="row g-2 my-3">
                <div className="col-md-3">
                    <label htmlFor="spender(Address)" className="form-label">spender(Address)</label>
                    <input type="text" className="form-control" id="floatingInputGrid" onChange={handleChange} placeholder="spender(Address)" name='spender' required />
                </div>
                <div className="col-md-3">
                    <label htmlFor="subtractedValue(in Wei)" className="form-label">subtractedValue(in Wei)</label>
                    <input type="number" className="form-control" id="floatingInputGrid" onChange={handleChange} placeholder="subtractedValue(in Wei)" name='subtractedValue' required />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                    <button className="btn btn-secondary" onClick={handleSubmit}>DecreaseAllowance</button>
                </div>
            </div>
        </>
    )
}

export default DecreaseAllowance