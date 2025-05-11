import React from "react";

import { useAuthContext } from "../context/AuthContext";

import CloseModal from "../svg/CloseModal";


export default function DeletePot ({ potName, index, setDisplayDeleteWindow }) {

    const { auth, setAuth } = useAuthContext()

    const handleDelete = () => {

        setAuth(prevAuth =>{

            const updatePotsArr = [...prevAuth.userData.pots]
            updatePotsArr.splice(index,1)
            return(
                {
                    ...prevAuth,
                    userData:{
                        ...prevAuth.userData,
                        pots: updatePotsArr,
                    }
                }
            )
        })

        setDisplayDeleteWindow(false)
    }

    return(
        <div className="popup-window delete-pot">
              <div className="popup-window-header">
                <h1 className="text-preset-1">{`Delete '${potName}'?`}</h1>
                <CloseModal onClick={() => setDisplayDeleteWindow(false)}/>
            </div>
            <p className="text-preset-4">Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
            <button className="delete-pot-btn text-preset-4-bold" onClick={handleDelete}>Yes, Confirm Deletion</button>
            <button className="cancel-delete-pot-btn text-preset-4" onClick={() => setDisplayDeleteWindow(false)}>No, Go Back</button>
        </div>
    )   
}