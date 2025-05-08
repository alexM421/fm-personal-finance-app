import React from "react";
import NavOverview from "../svg/NavOverview";
import NavTransactions from "../svg/NavTransactions";
import NavBudgets from "../svg/NavBudgets";
import NavPots from "../svg/NavPots";
import NavRecurringBills from "../svg/NavRecurringBills";
import MinimizeMenu from "../svg/MinimizeMenu";
import { Link } from "react-router-dom";


export default function Navbar () {

    const [isMinimized, setIsMinimized] = React.useState(false)

    const handleChange = (e) => {
        setIsMinimized(e.target.checked)
    }

    return(
        <div className={`navbar ${isMinimized? "minimized":""}`}>
            <img src={`/assets/images/logo-${isMinimized? "small":"large"}.svg`} id="navbar-logo"/>
            <div id="navbar-items">
                <Link to="overview" className="navbar-item">
                    <NavOverview/>
                    <h1 className="text-preset-3">Overview</h1>
                </Link>
                <Link to="transactions" className="navbar-item">
                    <NavTransactions/>
                    <h1 className="text-preset-3">Transactions</h1>
                </Link>
                <Link to="budgets" className="navbar-item">
                    <NavBudgets/>
                    <h1 className="text-preset-3">Budgets</h1>
                </Link>
                <Link to="pots" className="navbar-item">
                    <NavPots/>
                    <h1 className="text-preset-3">Pots</h1>
                </Link>
                <Link to="bills" className="navbar-item">
                    <NavRecurringBills/>
                    <h1 className="text-preset-3">Recurring Bills</h1>
                </Link>
            </div>
            <label id="navbar-btn" htmlFor="navbar-check-input">
                <input
                type="checkbox"
                id="navbar-check-input"
                checked={isMinimized}
                onChange={handleChange}
                />
                <MinimizeMenu/>
                <h1 className="text-preset-3">Minimize Menu</h1>
            </label>
        </div>
    )
}