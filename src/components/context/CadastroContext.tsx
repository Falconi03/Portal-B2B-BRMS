import React, { createContext, ReactNode, useState } from "react";

type ContextProps = {
    children: ReactNode
    
}

type ContextType = {
    setValues: (newState: {}) => void,
    values: {},
}

const initialValue = {
    setValues: () => {},
    values: {},
}


export const CadastroContext = createContext<ContextType>(initialValue);

export const CadastroContextProvider = ({ children }: ContextProps) => {
    const [values, setValues] = useState(initialValue.values)

    return (
        <CadastroContext.Provider value={
            {
                values,
                setValues,
            }}>
            {children}
        </CadastroContext.Provider>
    )
}