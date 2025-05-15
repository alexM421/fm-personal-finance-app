import React from "react";

import Ellipsis from "../svg/Ellipsis";

export default function BudgetCard ( { category, max, total, theme, last3transactions} ) {

    const [displayOptions, setDisplayOptions] = React.useState(false)
    const [displayEditWindow, setDisplayEditWindow] = React.useState(false)
    const [displayDeleteWindow, setDisplayDeleteWindow] = React.useState(false)

    const modifyBtnRef = React.useRef(undefined)

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



    const filledPercent = total>max? "100%":`${((total/max)*100).toFixed(2)}%`

    return(
        <div className="budget-card">
            <div className="budget-card-header">
                <div className="budget-card-header-title">
                    <div className="circle" style={{backgroundColor: theme}}></div>
                    <h1 className="text-preset-2">{category}</h1>
                </div>
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
            <div className="budget-card-spending">
                <p className="text-preset-4">{`Maximum of $${max.toFixed(2)}`}</p>
                <div className="budget-card-filler-bar-container">
                    <div className="budget-card-filler-bar" style={{backgroundColor: theme, width: filledPercent}}></div>
                </div>
                <div className="budget-card-numbers">
                    <div className="budget-card-number">
                        <div className="color-bar" style={{backgroundColor: theme}}></div>
                        <div className="budget-card-number-text">
                            <p className="text-preset-5">Spent</p>
                            <p className="text-preset-4-bold">{`$${total}`}</p>
                        </div>
                    </div>
                    <div className="budget-card-number">
                         <div className="color-bar" style={{backgroundColor: "var(--beige-100)"}}></div>
                        <div className="budget-card-number-text">
                            <p className="text-preset-5">Remaining</p>
                            <p className="text-preset-4-bold">{`$${total>max? 0:max-total}`}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="budget-card-latest">
                <h2 className="text-preset-3">Latest Spending</h2>
                {/* {last3transactions} */}
            </div>
        </div>
    )
}