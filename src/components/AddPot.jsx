import React from "react";

import CloseModal from "../svg/CloseModal";
import CustomSelect from "./CustomSelect";

import { useAuthContext } from "../context/AuthContext"

export default function EditWindow ( { setDisplayAddPotWindow } ) {

    const { auth, setAuth } = useAuthContext()

    const [potName, setPotName] = React.useState("")
    const [target,setTarget] = React.useState("")

    const colorArr =[
        {colorName: "Green", colorHex: "#277C78"},
        {colorName: "Yellow", colorHex: "#F2CDAC"},
        {colorName: "Cyan", colorHex: "#82C9D7"},
        {colorName: "Navy", colorHex: "#626070"},
        {colorName: "Red", colorHex: "#C94736"},
        {colorName: "Purple", colorHex: "#826CB0"},
        {colorName: "Turquoise", colorHex: "#597C7C"},
        {colorName: "Brown", colorHex: "#93674F"},
        {colorName: "Magenta", colorHex: "#934F6F"},
        {colorName: "Blue", colorHex: "#3F82B2"},
        {colorName: "Grey", colorHex: "#97A0AC"},
        {colorName: "Army", colorHex: "#7F9161"},
        {colorName: "Pink", colorHex: "#AF81BA"},
        {colorName: "Yellow", colorHex: "#CAB361"},
        {colorName: "Orange", colorHex: "#BE6C49"}
    ]


    //search for the originalTheme associated color index

    const themeArr = []

    for(let color of colorArr){

        let isColorAlreadyUsed = false

        for(let pot of auth.userData.pots){
            if(pot.theme===color.colorHex){
                isColorAlreadyUsed = true
            }
        }
        themeArr.push(
            <div className={`option-content ${isColorAlreadyUsed? "already-used":""}`}>
                <div className="circle" style={{backgroundColor: color.colorHex}}></div>
                <p>{color.colorName}</p>
                {isColorAlreadyUsed? <p className="text-preset-5">Already used</p>:""}
            </div>
        )
    }

    const [theme, setTheme] = React.useState(themeArr[0])
    console.log(themeArr)
    console.log(theme)

    //change rgb to hex 

    function rgbToHex(rgb) {
        const result = rgb.match(/\d+/g); // Extracts all numbers
        if (!result || result.length < 3) return null;

        const r = parseInt(result[0]).toString(16).padStart(2, '0');
        const g = parseInt(result[1]).toString(16).padStart(2, '0');
        const b = parseInt(result[2]).toString(16).padStart(2, '0');

        return `#${r}${g}${b}`.toUpperCase();
    }

    //is rgb need to convert into hex
    const backgroundStyle = rgbToHex(theme.props.children[0].props.style.backgroundColor)


    const handlePotNameChange= (e) => {
        setPotName(e.target.value)
    }

    const handleTargetChange = (e) => {
        setTarget(e.target.value)
    }
    
    console.log(backgroundStyle)
  

    const handleSave = (e) => {
        e.preventDefault()
        
        setAuth(prevAuth => {
            const updatedPots = [...prevAuth.userData.pots]
            updatedPots.push({
                name: potName,
                target: target,
                theme: backgroundStyle,
                total: 0,
            })

            return(
                {
                    ...prevAuth,
                    userData:{
                        ...prevAuth.userData,
                        pots: updatedPots,
                    }
                }
            )
        })

        setDisplayAddPotWindow(false)
    }    

    return(
        <form className="popup-window" onSubmit={handleSave} noValidate>
            <div className="popup-window-header">
                <h1 className="text-preset-1">Add New Plot</h1>
                <CloseModal onClick={() => setDisplayAddPotWindow(false)}/>
            </div>
            <p className="popup-window-desc text-preset-4">Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
            <div className="popup-window-inputs-div text-preset-4">
                <div className="popup-window-input-div">
                    <label>Pot name</label>
                    <input 
                    type="text" 
                    placeholder="e.g. Rainy Days" 
                    className="popup-window-input"
                    name="name"
                    value={potName}
                    onChange={handlePotNameChange}
                    maxLength={30}
                    required
                    />
                </div>
                <div className="popup-window-input-div">
                    <label>Target</label>
                    <div className="popup-window-input-dollar-container">
                        <p>$</p>
                        <input 
                        type="number" 
                        placeholder="e.g. 2000" 
                        className="popup-window-input-dollar"
                        name="target"
                        onChange={handleTargetChange}
                        value={target}
                        required
                        />
                    </div>
                </div>
                <div className="window-input-div">
                    <label>Theme</label>
                    <CustomSelect
                    optionsArr={themeArr} 
                    sortValue={theme} 
                    setSortValue={setTheme} 
                    id="edit-window" 
                    key="edit-window"
                    />
                </div>
            </div>
            <button className="popup-window-submit-btn" type="submit">Add Pot</button>
        </form>
    )
}