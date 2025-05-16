import React from "react";
import { createPortal } from "react-dom";


import CaretRight from "../svg/CaretRight"
import Ellipsis from "../svg/Ellipsis";
import BudgetEditWindow from "./BudgetEditWindow";
import BudgetDeleteWindow from "./BudgetDeleteWindow";

export default function BudgetCard ( { category, max, total, theme, relevantTransactions, index} ) {

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

    //Calculate how much is the color bar filled
    const filledPercent = total>max? "100%":`${((total/max)*100).toFixed(2)}%`

    //handle display of last 3 transactions

    const handleTransactionsDisplay = () => {

        const toReturn = []

        for(let transaction of relevantTransactions){

            const transactionAmount = `$${Math.abs(transaction.amount).toFixed(2)}`
            const transactionAmountPrefix = transaction.amount <0? "-":""

            toReturn.push(
                <div className="budget-card-transaction-container">
                    <div className="budget-card-transaction">
                        <div className="budget-card-transaction-name">
                            <img src={transaction.avatar}/>
                            <p className="text-preset-5-bold">{transaction.name}</p>
                        </div>
                        <div className="budget-card-transaction-infos">
                            <p className="text-preset-5-bold" style={{color: "var(--grey-900)"}}>{transactionAmountPrefix+transactionAmount}</p>
                            <p className="text-preset-5" style={{color: "var(--grey-500)"}}>{new Date(transaction.date).toLocaleDateString("en-GB")}</p>
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        }

        return (
            <div className="budget-card-transactions-container">
                {toReturn}
            </div>
        )
    }

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
                <div className="budget-card-latest-head">
                    <h2 className="text-preset-3">Latest Spending</h2>
                    <div className="see-all-btn">
                        <p className="text-preset-4">See All</p>
                        <CaretRight/>
                    </div>
                </div>
                {handleTransactionsDisplay()}
            </div>
                {displayEditWindow && createPortal(
                    <div>
                        <div className="backdrop"></div>
                        <BudgetEditWindow  setDisplayEditWindow={setDisplayEditWindow} originalCategory={category} originalMax={max} originalTheme={theme} index={index}/>
                    </div>
                ,document.body)}
                {displayDeleteWindow && createPortal(
                            <div>
                                <div className="backdrop"></div>
                                <BudgetDeleteWindow index={index} setDisplayDeleteWindow={setDisplayDeleteWindow} category={category}/>
                            </div>
                        ,document.body)}
    </div>
    )
}