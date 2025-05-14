import React from "react";
import { createPortal } from "react-dom"
import Ellipsis from "../svg/Ellipsis";
import EditWindow from "./EditWindow";
import DeletePot from "./DeletePot";
import Withdraw from "./Withdraw";
import AddMoney from "./AddMoney";

export default function Pot ( { pot, index }) {

    const [displayOptions, setDisplayOptions] = React.useState(false)
    const [displayEditWindow, setDisplayEditWindow] = React.useState(false)
    const [displayDeleteWindow, setDisplayDeleteWindow] = React.useState(false)
    const [displayWithdraw, setDisplayWithdraw] = React.useState(false)
    const [displayAddMoney, setDisplayAddMoney] = React.useState(false)

    const modifyBtnRef = React.useRef(null)

    const targetPercent = `${((pot.total/pot.target)*100).toFixed(2)}%`

    React.useEffect(() => {

        const handleClickOutside = (e) => {
            if(!modifyBtnRef.current.contains(e.target)){
                setDisplayOptions(false)
            }
        }
        document.addEventListener("mousedown",handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[])



    return(
        <div className="pot">
            <div className="pot-header">
                <span className="circle" style={{backgroundColor: pot.theme}}></span>
                <h1 className="text-preset-2">{pot.name}</h1>
                <div className="modify-btn-container">
                    <Ellipsis onClick={() => setDisplayOptions(true)}/>
                    <div 
                    ref={modifyBtnRef}
                    className={`modify-btn text-preset-4 ${displayOptions? "show-modify-btn":""}`}
                    >
                        <p onClick={() => setDisplayEditWindow(true)}>Edit Pot</p>
                        <hr/>
                        <p onClick={() => setDisplayDeleteWindow(true)}>Delete Pot</p>
                    </div>
                </div>
            </div>
            <div className="pot-content">
                <div className="pot-total">
                    <p className="text-preset-4">Total Saved</p>
                    <p className="text-preset-1">{`$${pot.total.toFixed(2)}`}</p>
                </div>
                <div className="pot-target-container">
                    <div className="pot-target-bar-container">
                        <div className="pot-target-bar-filler" style={{backgroundColor: pot.theme, width: targetPercent}}></div>
                    </div>
                    <div className="pot-target-desc">
                        <p className="text-preset-5-bold">{targetPercent}</p>
                        <p className="text-preset-5">{`Target of $${pot.target.toLocaleString()}`}</p>
                    </div>
                </div>
            </div>
            <div className="pot-inputs">
                <button className="pot-btn text-preset-4-bold" onClick={() => setDisplayAddMoney(true)}>+ Add Money</button>
                <button className="pot-btn text-preset-4-bold" onClick={() => setDisplayWithdraw(true)}>Withdraw</button>
            </div>
            {displayEditWindow && createPortal(
                <div>
                    <div className="backdrop"></div>
                    <EditWindow index={index} setDisplayEditWindow={setDisplayEditWindow} originalName={pot.name} originalTarget={pot.target} originalTheme={pot.theme}/>
                </div>
            ,document.body)}
            {displayDeleteWindow && createPortal(
                <div>
                    <div className="backdrop"></div>
                    <DeletePot index={index} setDisplayDeleteWindow={setDisplayDeleteWindow} potName={pot.name}/>
                </div>
            ,document.body)}
            {displayWithdraw && createPortal(
                <div>
                    <div className="backdrop"></div>
                    <Withdraw index={index} name={pot.name} target={pot.target} total={pot.total} setDisplayWithdraw={setDisplayWithdraw}/>
                </div>
            ,document.body)}
             {displayAddMoney && createPortal(
                <div>
                    <div className="backdrop"></div>
                    <AddMoney index={index} name={pot.name} target={pot.target} total={pot.total} setDisplayAddMoney={setDisplayAddMoney}/>
                </div>
            ,document.body)}
        </div>
    )
}