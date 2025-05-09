import React from "react";

import { useAuthContext } from "../context/AuthContext";

import Pot from "./Pot";

export default function Pots () {

    const { auth, setAuth } = useAuthContext()

    const pots = auth.userData.pots

    const handlePotsDisplay = () => {

        const potsArr = []

        for(let pot of pots){
            potsArr.push(
                <Pot pot={pot}/>
            )
        }

        return potsArr
    }

    return(
        <div id="pots">
            <div className="pots-header">
                <h1 className="text-preset-1">Pots</h1>
                <button className="new-pot-btn text-preset-4-bold">+ Add New Pot  </button>
            </div>
            {handlePotsDisplay()}
        </div>
    )
}