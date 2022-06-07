import React, { useState } from 'react'
import Token from '../../abi/Token.json';


const TransferFrom = ({ web3 }) => {
    const [transferFromData, setTransferFromData] = useState({ sender: "", recipient: "", amount: "" });
    const handleChange = (ev) => {
        setTransferFromData({ ...transferFromData, [ev.target.name]: ev.target.value });
    }
    const handleSubmit = async () => {
        const accounts = await web3.eth.getAccounts();
        const token = new web3.eth.Contract(Token.abi, Token.address);
        console.log(token);
        if (token) {
            token.methods.transferFrom(transferFromData.sender, transferFromData.recipient, transferFromData.amount).send({ from: accounts[0] }).on('transactionHash', async (hash) => {
                window.alert(transferFromData.amount + " Wei is transfer from to " + transferFromData.recipient);
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
                    <label htmlFor="sender(Address)" className="form-label">sender(Address)</label>
                    <input type="text" className="form-control" id="floatingInputGrid" onChange={handleChange} placeholder="sender(Address)" name='sender' />
                </div>
                <div className="col-md-3">
                    <label htmlFor="recipient(Address)" className="form-label">recipient(Address)</label>
                    <input type="text" className="form-control" id="floatingInputGrid" onChange={handleChange} placeholder="recipient(Address)" name='recipient' />
                </div>
                <div className="col-md-3">
                    <label htmlFor="amount" className="form-label">amount(in Wei)</label>
                    <input type="number" className="form-control" id="floatingInputGrid" onChange={handleChange} placeholder="amount(in Wei)" name='amount' />
                </div>
                <div className="col-md-3 d-flex align-items-end">
                    <button className="btn btn-secondary" onClick={handleSubmit}>Transfer From</button>
                </div>
            </div>
        </>
    )
}

export default TransferFrom