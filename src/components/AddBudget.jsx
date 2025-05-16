import React from "react";

import CloseModal from "../svg/CloseModal";
import CustomSelect from "./CustomSelect";

import { useAuthContext } from "../context/AuthContext"

export default function EditWindow ( { setDisplayAddBudgetWindow } ) {

    const { auth, setAuth } = useAuthContext()

    const optionsArrCategory= ["All transactions","Entertainment","Bills","Groceries","Dining Out", "Transportation",
        "Personal Care","Education", "Lifestyle", "Shopping", "General"]
    const [category, setCategory] = React.useState(optionsArrCategory[0])
    const [max,setMax] = React.useState(0)
    const [errors, setErrors] = React.useState({
        errorMax: false,
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

    const themeArr =  React.useMemo(() => {

        const arr = []

        for(let color of colorArr){

            let isColorAlreadyUsed = false

            for(let pot of auth.userData.pots){
                if(pot.theme===color.colorHex){
                    isColorAlreadyUsed = true
                }
            }

            arr.push(
                <div className={`option-content ${isColorAlreadyUsed? "already-used":""}`}>
                    <div className="circle" style={{backgroundColor: color.colorHex}}></div>
                    <p>{color.colorName}</p>
                    {isColorAlreadyUsed? <p className="text-preset-5">Already used</p>:""}
                </div>
            )
        }
        
        return arr

    },[auth.userData.pots])   

    const [theme, setTheme] = React.useState(themeArr[0])
    
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


    const handleCategoryChange= (e) => {
        setCategory(e.target.value)
    }

    const handleMaxChange = (e) => {
        setMax(e.target.value)
    }
      

    const handleSave = (e) => {
        e.preventDefault()
        

        const maxInput = e.target.elements[0]
    
        const tempErrors = {}

        tempErrors.errorMax = maxInput.validity.valid? false:true 

        console.log(tempErrors)

        setErrors(tempErrors)

        if(Object.values(tempErrors).every(error => !error)){
            setAuth(prevAuth => {
                const updatedBudgets = [...prevAuth.userData.budgets]
                updatedBudgets.push({
                    category: category,
                    maximum: Number(max),
                    theme: backgroundStyle
                })

                return(
                    {
                        ...prevAuth,
                        userData:{
                            ...prevAuth.userData,
                            budgets: updatedBudgets,
                        }
                    }
                )
            })

            setDisplayAddBudgetWindow(false)
        }
    }    

    return(
        <form className="popup-window" onSubmit={handleSave} noValidate>
            <div className="popup-window-header">
                <h1 className="text-preset-1">Add New Budget</h1>
                <CloseModal onClick={() => setDisplayAddBudgetWindow(false)}/>
            </div>
            <p className="popup-window-desc text-preset-4">Choose a category to set a spending budget. These categories can help you monitor spending.</p>
            <div className="popup-window-inputs-div text-preset-4">
                <div className="popup-window-input-div">
                    <label>Budget Category</label>
                    <CustomSelect 
                    optionsArr={optionsArrCategory} 
                    setSortValue={setCategory} 
                    sortValue={category}
                    id="category-edit-window"
                    key="category-edit-window"
                    />
                </div>
                <div className="popup-window-input-div">
                    <label>Max</label>
                    <div className={`popup-window-input-dollar-container ${errors.errorMax? "error-input":""}`}>
                        <p>$</p>
                        <input 
                        type="number" 
                        placeholder="e.g. 2000" 
                        className="popup-window-input-dollar"
                        name="target"
                        onChange={handleMaxChange}
                        value={max}
                        required
                        />
                    </div>
                    {errors.errorMax && <p className="text-preset-5 error-text">Please enter a positive amount.</p>}
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
            <button className="popup-window-submit-btn" type="submit">Add Budget</button>
        </form>
    )
}