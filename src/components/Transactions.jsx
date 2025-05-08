import React from "react";

import IconSearch from "../svg/IconSearch";
import CaretDown from "../svg/CaretDown";
import CustomSelect from "./CustomSelect";

import { useAuthContext } from "../context/AuthContext";

export default function Transactions () {

    const optionsArrSort = ["Latest","Oldest","A to Z","Z to A","Highest","Lowest"]
    const optionsArrCategory= ["All transactions","Entertainment","Bills","Groceries","Dining Out", "Transportation",
        "Personal Care","Education", "Lifestyle", "Shopping", "General"]

    const { auth, setAuth } = useAuthContext()
    const [sortBy, setSortBy] = React.useState(optionsArrSort[0])
    const [category, setCategory] = React.useState(optionsArrCategory[0])
    const [search, setSearch] = React.useState("")

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

   

    const handleTransactionsDisplay = () => {

        let transactions = auth.userData.transactions
        

        //handle Search
        if(search){
            transactions = transactions.filter(transaction => transaction.name.toLowerCase().includes(search.toLowerCase()))
        }

        //handle SortBy
        switch(sortBy){
            case "Latest":
                transactions.sort((transactionA, transactionB) => new Date(transactionB.date) - new Date(transactionA.date))
                break;
            case "Oldest":
                transactions.sort((transactionA, transactionB) => new Date(transactionA.date) - new Date(transactionB.date))
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

        //handle Category
        if(category !== "All transactions"){
            transactions = transactions.filter(transaction => transaction.category === category)
        }
        
        const transactionList = []

        for(let transaction of transactions){

            const amountStyle = {color: transaction.amount>0?"var(--green)":"var(--grey-900)"} 
            const amountPrefix = transaction.amount>0? "+$":"-$"

            const date = new Date (transaction.date)

            transactionList.push(
                <div className="transactions-line-container">
                    <div className="transactions-line">
                        <div className="transactions-name">
                            <img src={transaction.avatar}/>
                            <p className="text-preset-4-bold">{transaction.name}</p>
                        </div>
                        <p className="transactions-category">{transaction.category}</p>
                        <p className="transactions-date">{date.toLocaleDateString("en-GB")}</p>
                        <p className="transactions-amount text-preset-4-bold" style={amountStyle}>{`${amountPrefix}${Math.abs(transaction.amount).toFixed(2)}`}</p>
                    </div>
                    <hr className="transactions-separator"/>
                </div>
            )
        }

        return(
            <div id="transactions-list">
                {transactionList}
            </div>
        )
    }

    return(
        <div className="page-container">
            <div id="transactions">
                <h1 className="text-preset-1">Transactions</h1>
                <div id="transactions-container">
                    <div id="transactions-header">
                        <div id="transactions-searchbar-container">
                            <input 
                            type="text"
                            id="transactions-searchbar"
                            className="text-preset-4"
                            placeholder="Search transaction"
                            value={search}
                            onChange={handleSearch}
                            />
                            <IconSearch/>
                        </div>
                        <div id="transactions-sorts">
                            <div className="sort-container">
                                <p className="text-preset-4">Sort by</p>
                                <CustomSelect optionsArr={optionsArrSort} setSortValue={setSortBy} sortValue={sortBy} id="sort"/>
                            </div>
                            <div className="sort-container">  
                                <p className="text-preset-4">Category</p>
                                <CustomSelect optionsArr={optionsArrCategory} setSortValue={setCategory} sortValue={category} id="category"/>
                            </div>
                        </div>
                    </div>
                    <div id="transactions-table" className="text-preset-5">
                        <div id="transactions-table-header" className="transactions-line">
                            <p className="transactions-name">Recipient/Sender</p>
                            <p className="transactions-category">Category</p>
                            <p className="transactions-date">Transaction Date</p>
                            <p className="transactions-amount">Amount</p>
                        </div>
                        {handleTransactionsDisplay()}
                    </div>
                    <div id="transactions-footer">
                    </div>
                </div>
            </div>
        </div>
    )
}