import React from "react";

import CaretDown from "../svg/CaretDown";

export default function CustomSelect ( { optionsArr, id, setSortValue, sortValue, setSelectedPage }) {

    const [isSelectHidden, setIsSelectHidden] = React.useState(true)
    const selectRef = React.useRef(null)

    const handleSelectDisplay = () => {
        setIsSelectHidden(prevValue => !prevValue)   
    }

    const handleOptionClick = (e) => {
        const selectedValue = e.currentTarget.innerText
    
        setSortValue(selectedValue)
        setSelectedPage(1)
    }

    const handleOptionsDisplay = () => {

        const toReturnArr = []
        for( let option of optionsArr){
            toReturnArr.push(
                <div className="option-container">
                    <p 
                    className={sortValue===option? "current-selected-text":"" }
                    onClick={handleOptionClick}
                    >{option}</p>
                    <hr/>
                </div>
            )
        }

        return toReturnArr
    }


    React.useEffect(() => {

        const handleClickOutside = (e) => {
            if(!selectRef.current.contains(e.target)){
                setIsSelectHidden(true)
            }
        }
        document.addEventListener("mousedown",handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[])

    return(
        <div 
        className="text-preset-4 custom-select"
        id={id}
        onClick={handleSelectDisplay}
        ref={selectRef}
        >
            <div className="select-btn"
            >
                <p>{sortValue}</p>
                <CaretDown/>
            </div>
            <div className={`custom-select-options ${isSelectHidden? "":"show-options"}`}>
                {handleOptionsDisplay()}
            </div>
        </div>   
    )
}