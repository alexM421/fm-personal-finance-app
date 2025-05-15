import React from "react";

import { useAuthContext } from "../context/AuthContext"
import BudgetCard from "./BudgetCard";

export default function Budgets () {

    const { auth, setAuth } = useAuthContext()

    
    //Get all budgets useful infos
    const budgets = auth.userData.budgets
    const transactions = auth.userData.transactions
    const budgetsInformations = []

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


    const handleDisplayInfographic = () => {

        const infographicColors = []

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


        //Create Spending Summary

        const spendingSummary = []

        for(let budget of budgetsInformations){
            spendingSummary.push(
                <>
                    <div className="budgets-summary-category">
                        <div className="budgets-summary-category-desc">
                            <div className="color-bar" style={{backgroundColor: budget.theme}}></div>
                            <p className="text-preset-4" style={{color: "var(--grey-500)"}}>{budget.category}</p>
                        </div>
                        <div className="budgets-summary-category-price">
                            <p className="text-preset-3" style={{color: "var(--grey-900"}}>{`$${budget.total.toFixed(2)}`}</p>
                            <p className="text-preset-5" style={{color: "var(--grey-500)"}}>{`of $${budget.max}`}</p>
                        </div>
                    </div>
                    <hr/>
                </>
            )
        }

        //Return the infographic container

        return(
            <div className="budgets-infographic-container">
                <div className="budgets-infographic-exterior" style={{backgroundImage: conicGradient}}>
                    <div className="budgets-infographic-interior">
                    </div>
                    <div className="budgets-infographic-text">
                        <p className="text-preset-1" style={{color: "var(--grey-900)"}}>$338</p>
                        <p className="text-preset-5" style={{color: "var(--grey-500)"}}>of 975$ limit</p>
                    </div>
                </div>
                <div className="budgets-summary-container">
                    <h2 className="text-preset-2" style={{color: "var(--grey-900)"}}>Spending Summary</h2>
                    <div className="budgets-summary">
                        {spendingSummary}
                    </div>
                </div>
            </div>
        )
    }


    //Create the Display for the budget list

    const handleDisplayBudgetList = () => {

        const budgetsCard = []

        for(let budget of budgetsInformations){
            budgetsCard.push(
                <BudgetCard 
                category={budget.category} 
                total={budget.total}
                max={budget.max}
                theme={budget.theme}
                />
            )
        }

        return(
            <div className="budgets-list">
                {budgetsCard}
            </div>
        )
    }


    return(
        <div className="budgets-container">
            <h1 className="text-preset-1">Budgets</h1>
            <div className="budgets">
                {handleDisplayInfographic()}
                {handleDisplayBudgetList()}
            </div>
        </div>
    )
}