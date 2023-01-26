import React, { createContext, ReactNode, useState } from 'react'

type ContextProps = {
    children: ReactNode

}

type PanelContextType = {
    setExpand: (newState: boolean) => void,
    setRemove: (newState: boolean) => void,
    setCollapse: (newState: boolean) => void,
    setReload: (newState: boolean) => void,
    expand: boolean,
    remove: boolean,
    collapse: boolean,
    reload: boolean,
    toggleReload: () => void
}

const initialValue = {
    setExpand: () => { },
    setRemove: () => { },
    setCollapse: () => { },
    setReload: () => { },
    expand: false,
    remove: false,
    collapse: false,
    reload: false,
    toggleReload: () => { }
}

export const PanelContext = createContext<PanelContextType>(initialValue)

export const PanelContextProvider = ({ children }: ContextProps) => {
    const [expand, setExpand] = useState(false)
    const [remove, setRemove] = useState(false)
    const [collapse, setCollapse] = useState(false)
    const [reload, setReload] = useState(false)

    function toggleReload() {
        if (reload !== true) {
            setReload(true)
        }
        setTimeout(() => {
            setReload(false)
        }, 2000)
    }
    return (
        <PanelContext.Provider value={
            {
                expand,
                setExpand,
                remove,
                setRemove,
                collapse,
                setCollapse,
                reload,
                setReload,
                toggleReload
            }}>
            {children}
        </PanelContext.Provider>
    )
}