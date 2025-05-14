import React from "react";

import CloseModal from "../svg/CloseModal";

import { useAuthContext } from "../context/AuthContext";

export default function Withdraw ( { index, name, target, total, setDisplayAddMoney }) {

    const [addMoneyAmount, setAddMoneyAmount] = React.useState(0)

    const { auth, setAuth } = useAuthContext()
    
    const oldTargetPercent = `${(((total)/target)*100).toFixed(2)}%`
    const differenceTargetPercent = `${((addMoneyAmount/target)*100).toFixed(2)}%`
    const newTotalPercent = `${(((addMoneyAmount+total)/target)*100).toFixed(2)}%`

    const handleAddMoney = (e) => {
        if((Number(e.target.value)+total)<=target && e.target.value >= 0 && !e.target.value.includes("-")){
            setAddMoneyAmount(Number(e.target.value))
        }if(Number(e.target.value)+total >= target){
            setAddMoneyAmount(target-total)
        }
    }

    console.log(total)

    const handleAddMoneySubmit = (e) => {
        setAuth(prevAuth => {
            
            const updatedPots = [...prevAuth.userData.pots]

            updatedPots[index] = {...updatedPots[index], total: total+addMoneyAmount}

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
        setDisplayAddMoney(false)
    }


    return(
        <div className="popup-window withdraw">
            <div className="popup-window-header">
                <h1 className="text-preset-1">{`Add to '${name}'?`}</h1>
                <CloseModal onClick={() => setDisplayAddMoney(false)}/>
            </div>
            <p className="text-preset-4" style={{color: "var(--grey-500)"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium deleniti dolorem quibusdam magni porro suscipit similique ipsum asperiores voluptatibus, dolores debitis saepe ab deserunt hic libero reprehenderit odio sequi quaerat.</p>
            <div className="pot-target-container">
                   <div className="pot-total">
                    <p className="text-preset-4">New Amount</p>
                    <p className="text-preset-1">{`$${(total+addMoneyAmount).toFixed(2)}`}</p>
                </div>
                <div className="pot-target-container">
                    <div className="pot-target-bar-container withdraw-filler-container">
                        <div className="withdraw-bar-filler-old" style={{backgroundColor: "var(--grey-900)", width: oldTargetPercent,borderRadius: total===target? "8px": "8px 0px 0px 8px"}}></div>
                        <div className="withdraw-bar-filler-gap" style={{backgroundColor: "white", width: (addMoneyAmount===target || total==target)? "0px":"2px"}}></div>
                        <div className="withdraw-bar-filler-new" style={{backgroundColor: "var(--green)", width: differenceTargetPercent, borderRadius: addMoneyAmount===target? "8px": "0px 8px 8px 0px"}}></div>
                    </div>
                    <div className="pot-target-desc">
                        <p className="text-preset-5-bold" style={{color: addMoneyAmount===0? "var(--grey-900)":"var(--green)"}}>{newTotalPercent}</p>
                        <p className="text-preset-5">{`Target of $${target.toLocaleString()}`}</p>
                    </div>
                </div>
            </div>
             <div className="popup-window-input-div">
                    <label className="text-preset-5-bold">Amount to Add</label>
                    <div className={`popup-window-input-dollar-container`}>
                        <p>$</p>
                        <input 
                        type="number" 
                        placeholder="e.g. 2000" 
                        className="popup-window-input-dollar"
                        name="target"
                        max={total}
                        onChange={handleAddMoney}
                        value={addMoneyAmount}
                        required
                        />
                    </div>
            </div>
            <button className="popup-window-submit-btn" onClick={handleAddMoneySubmit}>Confirm Withdrawal</button>
        </div>
    )
}