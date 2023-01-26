import React, { createContext, ReactNode, useState } from "react";

type ContextProps = {
    children: ReactNode
    
}

type ContextType = {
    setSearch: (newState: string) => void,
    search: string,
}

const initialValue = {
    setSearch: () => {},
    search: '',
}


export const SearchContext = createContext<ContextType>(initialValue);

export const SearchContextProvider = ({ children }: ContextProps) => {
    const [search, setSearch] = useState(initialValue.search)

    return (
        <SearchContext.Provider value={
            {
                search,
                setSearch,
            }}>
            {children}
        </SearchContext.Provider>
    )
}