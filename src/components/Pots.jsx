import React from "react";

import { useAuthContext } from "../context/AuthContext";
import { createPortal }  from "react-dom"

import Pot from "./Pot";
import AddPot from "./AddPot"

export default function Pots () {

    const { auth, setAuth } = useAuthContext()
    const [displayAddPotWindow, setDisplayAddPotWindow] = React.useState(false)
    
    const pots = auth.userData.pots

    const handlePotsDisplay = () => {

        const potsArr = []

        let count = 0

        for(let pot of pots){

            potsArr.push(
                <Pot pot={pot} index={count}/>
            )
            count++
        }

        return potsArr
    }

    return(
        <div id="pots">
            <div className="pots-header">
                <h1 className="text-preset-1">Pots</h1>
                <button className="new-pot-btn text-preset-4-bold" onClick={() => setDisplayAddPotWindow(true)}>+ Add New Pot  </button>
            </div>
            <div className="pots-container">
                {handlePotsDisplay()}
            </div>
            {displayAddPotWindow && createPortal(
                            <div>
                                <div className="backdrop"></div>
                                <AddPot setDisplayAddPotWindow={setDisplayAddPotWindow}/>
                            </div>
                        ,document.body)}
        </div>
    )
}