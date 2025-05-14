import React from "react";

import CloseModal from "../svg/CloseModal";

import { useAuthContext } from "../context/AuthContext";

export default function Withdraw ( { index, name, target, total, setDisplayWithdraw }) {

    const [withdrawAmount, setWithdrawAmount] = React.useState(0)

    const { auth, setAuth } = useAuthContext()
    
    const newTargetPercent = `${(((total-withdrawAmount)/target)*100).toFixed(2)}%`
    const differenceTargetPercent = `${((withdrawAmount/target)*100).toFixed(2)}%`

    const handleWithdraw = (e) => {
        if(e.target.value<=total && e.target.value >= 0 && !e.target.value.includes("-")){
            setWithdrawAmount(Number(e.target.value))
        }if(e.target.value >total){
            setWithdrawAmount(Number(total))
        }
    }

    const handleWithdrawSubmit = (e) => {
        setAuth(prevAuth => {
            
            const updatedPots = [...prevAuth.userData.pots]

            updatedPots[index] = {...updatedPots[index], total: total-withdrawAmount}

            return(
                {
                    ...prevAuth,
                    userData: {
                        ...prevAuth.userData,
                        pots: updatedPots
                    }
                }
            )
        })
        setDisplayWithdraw(false)
    }


    return(
        <div className="popup-window withdraw">
            <div className="popup-window-header">
                <h1 className="text-preset-1">{`Withdraw from '${name}'?`}</h1>
                <CloseModal onClick={() => setDisplayWithdraw(false)}/>
            </div>
            <p className="text-preset-4" style={{color: "var(--grey-500)"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium deleniti dolorem quibusdam magni porro suscipit similique ipsum asperiores voluptatibus, dolores debitis saepe ab deserunt hic libero reprehenderit odio sequi quaerat.</p>
            <div className="pot-target-container">
                   <div className="pot-total">
                    <p className="text-preset-4">New Amount</p>
                    <p className="text-preset-1">{`$${(total-withdrawAmount).toFixed(2)}`}</p>
                </div>
                <div className="pot-target-container">
                    <div className="pot-target-bar-container withdraw-filler-container">
                        <div className="withdraw-bar-filler-old" style={{backgroundColor: "var(--grey-900)", width: newTargetPercent,borderRadius: withdrawAmount===0? "8px": "8px 0px 0px 8px"}}></div>
                        <div className="withdraw-bar-filler-gap" style={{backgroundColor: "white", width: withdrawAmount===total? "0px":"2px"}}></div>
                        <div className="withdraw-bar-filler-new" style={{backgroundColor: "var(--red)", width: differenceTargetPercent, borderRadius: withdrawAmount===total? "8px": "0px 8px 8px 0px"}}></div>
                    </div>
                    <div className="pot-target-desc">
                        <p className="text-preset-5-bold" style={{color: withdrawAmount===0? "var(--grey-900)":"var(--red)"}}>{newTargetPercent}</p>
                        <p className="text-preset-5">{`Target of $${target.toLocaleString()}`}</p>
                    </div>
                </div>
            </div>
             <div className="popup-window-input-div">
                    <label className="text-preset-5-bold">Amount to Withdraw</label>
                    <div className={`popup-window-input-dollar-container`}>
                        <p>$</p>
                        <input 
                        type="number" 
                        placeholder="e.g. 2000" 
                        className="popup-window-input-dollar"
                        name="target"
                        max={total}
                        onChange={handleWithdraw}
                        value={withdrawAmount}
                        required
                        />
                    </div>
            </div>
            <button className="popup-window-submit-btn" onClick={handleWithdrawSubmit}>Confirm Withdrawal</button>
        </div>
    )
}