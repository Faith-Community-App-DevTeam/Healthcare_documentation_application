import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null);

export function useAuth() {
    const { user, setUser } = useContext(AuthContext)

    function handleLogin(value) {
        setUser(value)
    }

    return { value: user, onChange: handleLogin }
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        username: null,
        token: null,
    })

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}