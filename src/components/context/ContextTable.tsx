import React, { createContext, ReactNode, useState } from "react";

type ContextProps = {
    children: ReactNode
}

type ContextType = {
    Name: boolean
    SetName: (NewState: boolean) => void
    Size: boolean
    SetSize: (NewState: boolean) => void
    Type: Boolean
    SetType: (NewState: boolean) => void
}

const InitialValue = {
    Name: true,
    SetName: () => { },
    Size: true,
    SetSize: () => { },
    Type: true,
    SetType: () => { }
}

export const ContextTable = createContext<ContextType>(InitialValue)

export const ContextTableProvider = ({ children }: ContextProps) => {

    const [Name, SetName] = useState(InitialValue.Name)
    const [Size, SetSize] = useState(InitialValue.Size)
    const [Type, SetType] = useState(InitialValue.Type)

    return (
        <ContextTable.Provider value={
            {
                Name,
                SetName,
                Size,
                SetSize,
                Type,
                SetType
            }}>
            {children}
        </ContextTable.Provider>
    )
}