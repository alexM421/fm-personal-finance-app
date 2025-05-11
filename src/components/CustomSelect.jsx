import React from "react";

import parse from "html-react-parser"

import CaretDown from "../svg/CaretDown";

export default function CustomSelect ( { optionsArr, id, setSortValue, sortValue }) {

    const [isSelectHidden, setIsSelectHidden] = React.useState(true)
    const selectRef = React.useRef(null)

    const handleSelectDisplay = () => {
        setIsSelectHidden(prevValue => !prevValue)   
    }

    const handleOptionClick = (e) => {
        const selectedValue = parse(e.currentTarget.innerHTML)
        setSortValue(selectedValue)
    }

    const handleOptionsDisplay = () => {

        const toReturnArr = []
        for( let option of optionsArr){
            toReturnArr.push(
                <div className="option-container">
                    <div 
                    className={`option-content ${sortValue===option? "current-selected-text":""}`}
                    onClick={handleOptionClick}
                    >{option}</div>
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
                <div>{sortValue}</div>
                <CaretDown/>
            </div>
            <div className={`custom-select-options ${isSelectHidden? "":"show-options"}`}>
                {handleOptionsDisplay()}
            </div>
        </div>   
    )
}