import React, { useState } from 'react'
import Token from '../../abi/Token.json';

const Transfer = ({ web3 }) => {
    const [transferData, setTransferData] = useState({ recipient: "", amount: "" });
    const handleChange = (ev) => {
        setTransferData({ ...transferData, [ev.target.name]: ev.target.value });
    }
    const handleSubmit = async () => {
        const accounts = await web3.eth.getAccounts();
        const token = new web3.eth.Contract(Token.abi, Token.address);
        if (token) {
            token.methods.transfer(transferData.recipient, transferData.amount).send({ from: accounts[0] }).on('transactionHash', async (hash) => {
                window.alert(transferData.amount + " Wei is transfer to " + transferData.recipient);
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
                    <label htmlFor="recipient(Address)" className="form-label">recipient(Address)</label>
                    <input type="text" className="form-control" id="floatingInputGrid" onChange={handleChange} placeholder="recipient(Address)" name='recipient' />
                </div>
                <div className="col-md-3">
                    <label htmlFor="amount" className="form-label">amount(in Wei)</label>
                    <input type="number" className="form-control" id="floatingInputGrid" onChange={handleChange} placeholder="amount(in Wei)" name='amount' />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                    <button className="btn btn-secondary" onClick={handleSubmit}>Transfer</button>
                </div>
            </div>
        </>
    )
}

export default Transfer