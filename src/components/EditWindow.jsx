import React from "react";

import CloseModal from "../svg/CloseModal";
import CustomSelect from "./CustomSelect";

import { useAuthContext } from "../context/AuthContext"

export default function EditWindow ( { setDisplayEditWindow, originalName, originalTarget, originalTheme, index } ) {

    const { auth, setAuth } = useAuthContext()

    const [potName, setPotName] = React.useState(originalName)
    const [target,setTarget] = React.useState(originalTarget)
    const [errors, setErrors] = React.useState({
        errorName: false,
        errorTarget: false,
    })


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
    const originalThemeIndex = colorArr.findIndex(color => color.colorHex === originalTheme)

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


    const [theme, setTheme] = React.useState(themeArr[originalThemeIndex])

    
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
    const backgroundStyle = rgbToHex(theme.props.children[0].props.style.backgroundColor) || theme.props.children[0].props.style.backgroundColor
    

    const handlePotNameChange= (e) => {
        setPotName(e.target.value)
    }

    const handleTargetChange = (e) => {
        setTarget(e.target.value)
    }
    

  

    const handleSave = (e) => {
        e.preventDefault()
        
        const nameInput = e.target.elements[0]
        const targetInput = e.target.elements[1]
    
        const tempErrors = {}

        tempErrors.errorName = nameInput.validity.valid? false:true 
        tempErrors.errorTarget = targetInput.validity.valid? false:true 

        setErrors(tempErrors)

        if(Object.values(tempErrors).every(error => !error)){
            setAuth(prevAuth => {
                const updatedPots = [...prevAuth.userData.pots]
                updatedPots[index] = {
                    ...updatedPots[index],
                    name: potName,
                    target: target,
                    theme: backgroundStyle,
                }
    
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
            setDisplayEditWindow(false)
        }


    }    


    const potNameRef = React.useRef(undefined)

    return(
        <form className="popup-window" onSubmit={handleSave} noValidate>
            <div className="popup-window-header">
                <h1 className="text-preset-1">Edit Plot</h1>
                <CloseModal onClick={() => setDisplayEditWindow(false)}/>
            </div>
            <p className="popup-window-desc text-preset-4">If your saving targets change, feel free to update your pots.</p>
            <div className="popup-window-inputs-div text-preset-4">
                <div className="popup-window-input-div">
                    <label>Pot name</label>
                    <input 
                    type="text" 
                    placeholder="e.g. Rainy Days" 
                    className={`popup-window-input ${errors.errorName? "error-input":""}`}
                    name="name"
                    value={potName}
                    onChange={handlePotNameChange}
                    maxLength={30}
                    required
                    ref={potNameRef}
                    />
                    <div className="popup-window-subtext">
                        {errors.errorName && <p className="text-preset-5 error-text">Please enter the Pot name</p>}
                        <p className="letters-tracker text-preset-5">{`${potNameRef.current?.value.split("").length || 0} characters left`}</p>
                    </div>
                </div>
                <div className="popup-window-input-div">
                    <label>Target</label>
                    <div className={`popup-window-input-dollar-container ${errors.errorTarget? "error-input":""}`}>
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
                    {errors.errorTarget && <p className="text-preset-5 error-text">Please enter a target amount</p>}
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
            <button className="popup-window-submit-btn" type="submit">Save Changes</button>
        </form>
    )
}