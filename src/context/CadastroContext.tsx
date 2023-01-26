import React, { createContext, ReactNode, useState } from "react";

type ContextProps = {
    children: ReactNode

}

type ContextType = {
    ECNome: {},
    setECNome: (newState: {}) => void,
    ECId: number,
    setECId: (newState: number) => void,
    putEC: {},
    setPutEC: (newState: {}) => void,
    filialNome: {},
    setFilialNome: (newState: {}) => void,
    filialId: number,
    setFilialId: (newState: number) => void,
    putFilial: {},
    setPutFilial: (newState: {}) => void,
    adminNome: {},
    setAdminNome: (newState: {}) => void,
    adminId: number,
    setAdminId: (newState: number) => void,
    putAdmin: {},
    setPutAdmin: (newState: {}) => void,
    bandeiraNome: {},
    setBandeiraNome: (newState: {}) => void,
    bandeiraId: number,
    setBandeiraId: (newState: number) => void,
    putBandeira: {},
    setPutBandeira: (newState: {}) => void,
    setPutDeleteValues: (newState: {}) => void,
    putDeleteValues: {},
    setValues: (newState: {}) => void,
    values: {},
    setId: (newState: number) => void,
    id: number,

}

const initialValue = {
    ECNome: {},
    setECNome: () => { },
    ECId: -1,
    setECId: () => { },
    putEC: {},
    setPutEC: () => { },
    filialNome: {},
    setFilialNome: () => { },
    filialId: -1,
    setFilialId: () => { },
    putFilial: {},
    setPutFilial: () => { },
    adminNome: {},
    setAdminNome: () => { },
    adminId: -1,
    setAdminId: () => { },
    putAdmin: {},
    setPutAdmin: () => { },
    bandeiraNome: {},
    setBandeiraNome: () => { },
    bandeiraId: -1,
    setBandeiraId: () => { },
    putBandeira: {},
    setPutBandeira: () => { },
    setPutDeleteValues: () => { },
    putDeleteValues: {},
    setValues: () => { },
    values: {},
    setId: () => { },
    id: -1,
}


export const CadastroContext = createContext<ContextType>(initialValue);

export const CadastroContextProvider = ({ children }: ContextProps) => {
    const [values, setValues] = useState(initialValue.values)
    const [putDeleteValues, setPutDeleteValues] = useState(initialValue.putDeleteValues)
    const [ECNome, setECNome] = useState(initialValue.ECNome)
    const [ECId, setECId] = useState(initialValue.ECId)
    const [putEC, setPutEC] = useState(initialValue.putEC)
    const [filialNome, setFilialNome] = useState(initialValue.filialNome)
    const [filialId, setFilialId] = useState(initialValue.filialId)
    const [putFilial, setPutFilial] = useState(initialValue.putFilial)
    const [adminNome, setAdminNome] = useState(initialValue.adminNome)
    const [adminId, setAdminId] = useState(initialValue.adminId)
    const [putAdmin, setPutAdmin] = useState(initialValue.putAdmin)
    const [bandeiraNome, setBandeiraNome] = useState(initialValue.bandeiraNome)
    const [bandeiraId, setBandeiraId] = useState(initialValue.bandeiraId)
    const [putBandeira, setPutBandeira] = useState(initialValue.putBandeira)
    const [id, setId] = useState(initialValue.id)

    return (
        <CadastroContext.Provider value={
            {
                ECNome, setECNome,
                ECId, setECId,
                putEC,setPutEC,
                filialNome, setFilialNome,
                filialId, setFilialId,
                putFilial, setPutFilial,
                adminNome, setAdminNome,
                adminId, setAdminId,
                putAdmin, setPutAdmin,
                bandeiraNome, setBandeiraNome,
                bandeiraId, setBandeiraId,
                putBandeira, setPutBandeira,
                putDeleteValues, setPutDeleteValues,
                values, setValues,
                id, setId,
            }}>
            {children}
        </CadastroContext.Provider>
    )
}