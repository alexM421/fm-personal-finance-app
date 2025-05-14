import React from "react";

import RecurringBillsIcon from "../svg/RecurringBillsIcon";
import CustomSelect from "./CustomSelect"
import IconSearch from "../svg/IconSearch"

import { useAuthContext } from "../context/AuthContext";
import BillUnpaid from "../svg/BillUnpaid";
import BillPaid from "../svg/BillPaid";


const optionsArrSort =  ["Latest","Oldest","A to Z","Z to A","Highest","Lowest"]

export default function RecurringBills () {

    const { auth, setAuth } = useAuthContext()

    const [search, setSearch] = React.useState("")
    const [sortBy, setSortBy] = React.useState(optionsArrSort[0])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const billsPayment = {
            paid: {number: 0,total: 0},
            unpaid: {number: 0,total: 0},
            dueSoon: {number: 0,total: 0}
        }


    let transactions = auth.userData.transactions.filter((transaction) => transaction.recurring)

    //handle Search
    if(search){
        transactions = transactions.filter(transaction => transaction.name.toLowerCase().includes(search.toLowerCase()))
    }

    

    //handle SortBy
    switch(sortBy){
        case "Latest":
            transactions.sort((transactionA, transactionB) => new Date(transactionA.date).getDate() - new Date(transactionB.date).getDate())
            break;
        case "Oldest":
            transactions.sort((transactionA, transactionB) => new Date(transactionB.date).getDate() - new Date(transactionA.date).getDate())
            break;
        case "A to Z":
            transactions.sort((transactionA, transactionB) => transactionA.name.localeCompare(transactionB.name))
            break;
        case "Z to A":
            transactions.sort((transactionA, transactionB) => transactionB.name.localeCompare(transactionA.name))
            break;
        case "Highest":
            transactions.sort((transactionA, transactionB) => transactionB.amount - transactionA.amount)
            break;
        case "Lowest":
            transactions.sort((transactionA, transactionB) => transactionA.amount - transactionB.amount)
            break;
        default:
            console.log("error no matching sort found")
    }


    for (let transaction of transactions){ 

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
    
    const handleTransactionsDisplay = () =>{
                
        const transactionsToDisplay = []
        
        function getOrdinalDay(date) {
            const day = date.getDate();
            const suffix =
                day % 10 === 1 && day !== 11 ? "st" :
                day % 10 === 2 && day !== 12 ? "nd" :
                day % 10 === 3 && day !== 13 ? "rd" :
                "th";
            return `${day}${suffix}`;
        }

        const todayDay = new Date().getDate()
       
        let count= 0;

        for (let transaction of transactions){ 
            
            count++
             const targetDay = new Date(transaction.date).getDate()

            const determineBillState = () => {
                if(targetDay<todayDay){
                    return(
                        <BillPaid/>
                    )
                }else if((targetDay-todayDay)<=7 && targetDay-todayDay>=0){
                    return(<BillUnpaid/>)
                }else{
                    return("")
                }
            }

            const amountStyle = {color: ((targetDay-todayDay)<=7 && targetDay-todayDay>=0)? "var(--red)":"var(--grey-900)"}



            transactionsToDisplay.push(
                 <div className="transactions-line-container">
                    <div className="transactions-line">
                        <div className="transactions-name">
                            <img src={transaction.avatar}/>
                            <p className="text-preset-4-bold">{transaction.name}</p>
                        </div>
                        <div className="due-date transactions-date">
                            <p>{`Monthly-${getOrdinalDay(new Date(transaction.date))}`}</p>
                            {determineBillState()}
                        </div>
                        <p className="transactions-amount text-preset-4-bold" style={amountStyle}>{`$${Math.abs(transaction.amount).toFixed(2)}`}</p>
                    </div>
                    {count<transactions.length? <hr className="transactions-separator"/>:""}
                </div>
            )
        }

        return (
            <div className="transactions-list">
                {transactionsToDisplay}
            </div>
        )
        
    }
  

    return(
        <div className="recurring-bills">
            <h1 className="text-preset-1" style={{color: "var(--grey-900)"}}>Recurring Bills</h1>
            <div className="recurring-bills-container">
                <div className="recurring-bills-info-container">
                    <div className="recurring-bills-total-container">
                        <RecurringBillsIcon/>
                        <div className="recurring-bills-total">
                            <p className="text-preset-4">Total Bills</p>
                            <p className="text-preset-1">{`$${(billsPayment.paid.total+billsPayment.unpaid.total).toFixed(2)}`}</p>
                        </div>
                    </div>
                    <div className="recurring-bills-summary-container">
                        <h2 className="text-preset-3">Summary</h2>
                        <div className="recurring-bills-summary">
                            <div className="recurring-bills-summary-element">
                                <p className="text-preset-5">Paid Bills</p>
                                <p className="text-preset-5-bold">{`${billsPayment.paid.number} ($${billsPayment.paid.total.toFixed(2)})`}</p>
                            </div>
                            <hr/>
                            <div className="recurring-bills-summary-element">
                                <p className="text-preset-5">Total Upcoming</p>
                                <p className="text-preset-5-bold">{`${billsPayment.unpaid.number} ($${billsPayment.unpaid.total.toFixed(2)})`}</p>
                            </div>
                            <hr/>
                            <div className="recurring-bills-summary-element due-soon">
                                <p className="text-preset-5">Due Soon</p>
                                <p className="text-preset-5-bold">{`${billsPayment.dueSoon.number} ($${billsPayment.dueSoon.total.toFixed(2)})`}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recurring-bills-transactions">
                    <div className="transactions-header">
                        <div className="transactions-searchbar-container">
                            <input 
                            type="text"
                            className="text-preset-4 transactions-searchbar"
                            placeholder="Search transaction"
                            value={search}
                            onChange={handleSearch}
                            />
                            <IconSearch/>
                        </div>
                        <div className="transactions-sorts">
                            <div className="sort-container">
                                <p className="text-preset-4">Sort by</p>
                                <CustomSelect 
                                optionsArr={optionsArrSort} 
                                setSortValue={setSortBy} 
                                sortValue={sortBy} 
                                id="sort"
                                key="sort"
                                
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-preset-5 transactions-table">
                        <div className="transactions-line transactions-table-header">
                            <p className="transactions-name">Recipient/Sender</p>
                            <p className="transactions-date">Due Date</p>
                            <p className="transactions-amount">Amount</p>
                        </div>
                        {handleTransactionsDisplay()}
                    </div>
           
                </div>
            </div>
        </div>
        
    )
}