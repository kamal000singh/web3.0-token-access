import React, { useState } from 'react';
import Token from '../../abi/Token.json';

const TokenAllowance = ({ web3 }) => {
    const [allowanceData, setAllowanceData] = useState({ owner: "", spender: "" })
    const [allowanceResult, setAllowanceResult] = useState("")
    const handleClick = (ev) => {
        setAllowanceData({ ...allowanceData, [ev.target.name]: ev.target.value })
    }
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log(Token.address);
        const token = new web3.eth.Contract(Token.abi, Token.address);
        if (token) {
            if (allowanceData.owner !== "" && allowanceData.spender !== "") {
                let allowance = await token.methods.allowance(allowanceData.owner, allowanceData.spender).call();
                setAllowanceResult(allowance.toString());
            }
            else {
                window.alert("Please enter allowance owner and spender");
            }

        } else {
            window.alert('Token contract is not deployed to detected network')
        }
    }
    return (
        <div>
            <div className="row g-2">
                <div className="col-md-3">
                    <label htmlFor="owner(Address)" className="form-label">owner(Address)</label>
                    <input type="text" className="form-control" id="floatingInputGrid" onChange={handleClick} placeholder="owner(Address)" name='owner' />
                </div>
                <div className="col-md-3">
                    <label htmlFor="spender(Address)" className="form-label">spender(Address)</label>
                    <input type="text" className="form-control" id="floatingInputGrid" onChange={handleClick} placeholder="spender(Address)" name='spender' />
                </div>
                <div className="col-md-6 d-flex align-items-end">
                    <button className="btn btn-secondary" onClick={handleSubmit}>Allowance</button>
                    {allowanceResult !== '' && <span className="fs-5 mx-3">{web3.utils.fromWei(allowanceResult, 'ether')} ether</span>}
                </div>
            </div>
        </div>
    )
}

export default TokenAllowance