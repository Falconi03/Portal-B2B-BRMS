import React, { createContext, ReactNode, useState } from 'react'

type ContextProps = {
    children: ReactNode
    
}

type ContextType = {
    setMenuMarket: (newState: boolean) => void,
    menuMarket: boolean
    toggleAppSidebarMobile: (newState: boolean) => void,
    toggleAppSidebarMinify: (newState: boolean) => void,
    setMatch: (newState: boolean) => void,
    Match: boolean,
    setActive: (newState: number) => void,
    setClicked: (newState: number) => void,
    appSidebarMobileToggled: boolean,
    appSidebarMinify: boolean,
    active: number
    clicked: number
    closeSidebar: () => void
    handleExpand: (e:any, i:any, match:any) => void
}

const initialValue = {
    setMenuMarket: () => {},
    menuMarket: false,
    toggleAppSidebarMobile: () => {},
    toggleAppSidebarMinify: () => {},
    setActive: () => {},
    setClicked: () => {},
    appSidebarMobileToggled: false,
    appSidebarMinify: false,
    active: -1,
    clicked: -1,
    closeSidebar: () => {},
    handleExpand: () => {},
    setMatch: () => {},
    Match: false
}


export const Context = createContext<ContextType>(initialValue);

export const ContextProvider = ({ children }: ContextProps) => {
    const [menuMarket, setMenuMarket] = useState(initialValue.menuMarket)
    const [appSidebarMobileToggled, toggleAppSidebarMobile] = useState(initialValue.appSidebarMobileToggled)
    const [appSidebarMinify, toggleAppSidebarMinify] = useState(initialValue.appSidebarMinify)
    const [active, setActive] = useState(initialValue.active)
    const [clicked, setClicked] = useState(initialValue.clicked)
    const [Match, setMatch] = useState(initialValue.Match)


    function closeSidebar(){
        toggleAppSidebarMinify(false)
        toggleAppSidebarMobile(!appSidebarMobileToggled)
    }

    function handleExpand(e:any, i:any, match:any) {
        e.preventDefault()

        if (clicked === -1 && match) {
            setActive(-1)
            setClicked(1)
            setMatch(!Match)
        } else {
            setActive(active === i ? -1 : i)
            setClicked(1)
            setMatch(!Match)
        }
    }

    return (
        <Context.Provider value={
            {
                menuMarket,
                setMenuMarket,
                toggleAppSidebarMobile,
                appSidebarMobileToggled,
                toggleAppSidebarMinify,
                appSidebarMinify,
                closeSidebar,
                active,
                setActive,
                clicked,
                setClicked,
                handleExpand,
                setMatch,
                Match
            }}>
            {children}
        </Context.Provider>
    )
}