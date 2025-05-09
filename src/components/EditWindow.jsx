import React from "react";
import CloseModal from "../svg/CloseModal";

export default function EditWindow () {

    return(
        <div className="edit-window">
            <div className="edit-window-header text-preset-1">
                <h1>Edit Plot</h1>
                <CloseModal/>
            </div>
            <p className="text-preset-4">If your saving targets change, feel free to update your pots.</p>
            <div className="window-input-div">
                <label>Pet name</label>
                <input 
                type="text" 
                placeholder="e.g. Rainy Days" 
                className="window-input"
                maxLength={30}
                />
            </div>
        </div>
    )
}