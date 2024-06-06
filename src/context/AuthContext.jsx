/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user] = useState(null)
    const [loading, setLoading] = useState(true)

    const [mernAuth, setMernAuth] = useState({
        user: null,
        token: ''
    })

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parsedData = JSON.parse(data)
            setMernAuth({
                ...mernAuth,
                user: parsedData.user,
                token: parsedData.access_token
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const authInfo = {
        user,
        loading,
        setLoading,
        mernAuth, setMernAuth
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}