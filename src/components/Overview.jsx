import React from "react";

import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom"

import CaretRight from "../svg/CaretRight"
import PotIcon from "../svg/PotIcon"

export default function Overview () {

    const { auth, setAuth } = useAuthContext()

    const {current, income, expenses} = auth.userData.balance

    const handleDisplayPots = () => {

        const pots = auth.userData.pots
        const potsArr = []
        
        const potsTotalAmount = pots.reduce((accumulator, pot) => accumulator+pot.total,0)

        for(let pot of pots.slice(0,4)){
            potsArr.push(
                <div className="overview-box">
                    <div className="color-bar" style={{backgroundColor: pot.theme}}></div>
                    <div className="overview-box-text">
                        <p className="text-preset-5">{pot.name}</p>
                        <p className="text-preset-4-bold">{`$${pot.total}`}</p>
                    </div>
                </div>
            )
        }

        return(
            <>
                <div className="overview-pane-header">
                    <h2 className="text-preset-2">Pots</h2>
                    <Link to="../pots">
                        <p className="text-preset-4">See Details</p> 
                        <CaretRight/>
                    </Link>
                </div>
                <div className="overview-pots-content">
                    <div className="overview-pots-total">
                        <PotIcon/>
                        <div className="overvie-total-text">
                            <p className="text-preset-4">Total Saved</p>
                            <p className="text-preset-1">{`$${potsTotalAmount}`}</p>
                        </div>
                    </div>
                    <div className="overview-pots-summary">
                        {potsArr}
                    </div>
                </div>
            </>
        )
    }

    const handleDisplayTransactions = () => {

        const lastTransactions = auth.userData.transactions.slice(0,5)
        const transactionsArr = []

        for(let transaction of lastTransactions){

            const transactionPrice = `$${Math.abs(transaction.amount).toFixed(2)}`
            const transactionPriceSign = transaction.amount < 0? "-":"+"
            const transactionColor = transaction.amount < 0? "var(--grey-900)":"var(--green)"


            transactionsArr.push(
                <>
                    <div className="overview-transaction">
                        <div className="overview-transaction-user">
                            <img src={transaction.avatar}/>
                            <p className="text-preset-4-bold">{transaction.name}</p>
                        </div>
                        <div className="overview-transaction-billing">
                            <p className="text-preset-4-bold" style={{color: transactionColor}}>{transactionPriceSign+transactionPrice}</p>
                            <p className="text-preset-5">{new Date(transaction.date).toLocaleDateString("en-GB", {day: "2-digit", month:"short",year:"numeric"})}</p>
                        </div>
                    </div>
                    <hr/>
                </>
            )
        }


        return(
            <>
                <div className="overview-pane-header">
                    <h2 className="text-preset-2">Transactions</h2>
                    <Link to="../transactions">
                        <p className="text-preset-4">View All</p> 
                        <CaretRight/>
                    </Link>
                </div>
                <div className="overview-transactions-content">
                    {transactionsArr}
                </div>
            </>
        )
    }


    const handleDisplayBudgets = () => {
        
        const budgets = auth.userData.budgets
        const transactions = auth.userData.transactions
        const budgetsArr = []
        const budgetsInformations = []
        const infographicColors = []

        //handle the boxes on the sides

        for(let budget of budgets.slice(0,4)){
            budgetsArr.push(
                <div className="overview-box">
                    <div className="color-bar" style={{backgroundColor: budget.theme}}></div>
                    <div className="overview-box-text">
                        <p className="text-preset-5">{budget.category}</p>
                        <p className="text-preset-4-bold">{`$${budget.maximum}`}</p>
                    </div>
                </div>
            )
            }


        //takes care of the wheel diagram

        for (let budget of budgets){

            const budgetTransactions = {relevantTransactions: [], total: 0}
            
            for(let transaction of transactions){
                if(transaction.category === budget.category){
                    budgetTransactions.relevantTransactions.push(transaction)
                    if(new Date(transaction.date).getMonth()===7){
                        budgetTransactions.total+= Math.abs(transaction.amount)
                    }
                }
            }
            
            budgetsInformations.push({
                category: budget.category,
                theme: budget.theme,
                max: budget.maximum,
                ...budgetTransactions
            })
        }

        //Create color Array for infographic

        const budgetsTotal = budgetsInformations.reduce((accumulator, budget) => accumulator+budget.total,0)
        const budgetsMax = budgetsInformations.reduce((accumulator, budget) => accumulator+budget.max,0)
       

        for(let index = 0;index<budgetsInformations.length;index++){
            
            const budget = budgetsInformations[index]

            const firstStopValue = index===0? 0:infographicColors[index-1].secondStop
            const secondStopInitialValue = Number(((budget.total/budgetsTotal)*100).toFixed(2))

            infographicColors.push(
                {
                    theme: budget.theme, 
                    firstStop: firstStopValue,
                    secondStop: index===budgetsInformations.length-1? 100:(secondStopInitialValue+firstStopValue)
                }
            )
        }

        //Create infographic style element
        
        let conicGradientContent = ``

        for(let index=0;index<infographicColors.length;index++){
            const color = infographicColors[index]
            conicGradientContent+= `${color.theme} ${color.firstStop}% ${color.secondStop}% ${index===infographicColors.length-1? "":","}`
        }

        const conicGradient = `conic-gradient(${conicGradientContent})`

        return(
            <>
                <div className="overview-pane-header">
                    <h2 className="text-preset-2">Budgets</h2>
                    <Link to="../budgets">
                        <p className="text-preset-4">See Details</p> 
                        <CaretRight/>
                    </Link>
                </div>
                <div className="overview-budgets-content">
                    <div className="budgets-infographic-container">
                        <div className="budgets-infographic-exterior" style={{backgroundImage: conicGradient}}>
                            <div className="budgets-infographic-interior"></div>
                            <div className="budgets-infographic-text">
                                <p className="text-preset-1" style={{color: "var(--grey-900)"}}>{`$${budgetsTotal}`}</p>
                                <p className="text-preset-5" style={{color: "var(--grey-500)"}}>{`of ${budgetsMax}$ limit`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="overview-budgets-category">
                        {budgetsArr}
                    </div>
                </div>
            </>
        )
    }


    //Useful info for bills

  

    const handleDisplayBills = () => {

        

        const RecurringBills = auth.userData.transactions.filter(transaction => transaction.recurring)
            
        const billsPayment = {
            paid: {number: 0,total: 0},
            unpaid: {number: 0,total: 0},
            dueSoon: {number: 0,total: 0}
        }


        for (let transaction of RecurringBills){ 

            //Check if bill already paid or no
            const todayDay = new Date().getDate()
            const targetDay = new Date(transaction.date).getDate()
        
            function addBill (path) {
                path.number++
                path.total+=Math.abs(transaction.amount)
            }

            if(targetDay<todayDay){
                addBill(billsPayment.paid)
            }else if((targetDay-todayDay)<=7 && targetDay-todayDay>=0){
                addBill(billsPayment.dueSoon)
                addBill(billsPayment.unpaid)
            }else{
                addBill(billsPayment.unpaid)
            }
        }


        return(
            <>
                <div className="overview-pane-header">
                    <h2 className="text-preset-2">Recurring Bills</h2>
                    <Link to="../bills">
                        <p className="text-preset-4">See Details</p> 
                        <CaretRight/>
                    </Link>
                </div>
                <div className="overview-bills">
                    <div className="overview-bill" style={{boxShadow: "-4px 0px 0px var(--green)"}}>
                        <p className="text-preset-4">Paid Bills</p>
                        <p className="text-preset-4-bold">{`$${billsPayment.paid.total.toFixed(2)}`}</p>
                    </div>
                    <div className="overview-bill" style={{boxShadow: "-4px 0px 0px var(--yellow)"}}>
                        <p className="text-preset-4">Total Upcoming</p>
                        <p className="text-preset-4-bold">{`$${billsPayment.unpaid.total.toFixed(2)}`}</p>
                    </div>
                    <div className="overview-bill" style={{boxShadow: "-4px 0px 0px var(--cyan)"}}>
                        <p className="text-preset-4">Due Soon</p>
                        <p className="text-preset-4-bold">{`$${billsPayment.dueSoon.total.toFixed(2)}`}</p>
                    </div>
                </div>
            </>
        )
    }


    return(
        <div className="overview">
            <h1 className="text-preset-1">Overview</h1>
            <div className="overview-general">
                <div className="overview-general-box"style={{backgroundColor: "var(--grey-900)",color: "white"}}>
                    <p className="text-preset-4">Current Balance</p>
                    <h2 className="text-preset-2">{`$${current.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}`}</h2>
                </div>
                <div className="overview-general-box">
                    <p className="text-preset-4">Income</p>
                    <h2 className="text-preset-2">{`$${income.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}`}</h2>
                </div>
                <div className="overview-general-box">
                    <p className="text-preset-4">Expenses</p>
                    <h2 className="text-preset-2">{`$${expenses.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}`}</h2>
                </div>
            </div>
            <div className="overview-content">
                <div className="overview-panel">
                    <div className="overview-pane">
                        {handleDisplayPots()}
                    </div>
                    <div className="overview-pane">
                        {handleDisplayTransactions()}
                    </div>
                </div>
                <div className="overview-panel">
                    <div className="overview-pane">
                        {handleDisplayBudgets()}
                    </div>
                    <div className="overview-pane">
                        {handleDisplayBills()}
                    </div>
                </div>
            </div>
        </div>
    )
}