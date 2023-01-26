import { Page } from "@/components";
import { PanelContextProvider } from "@/components/context/PanelContext";
import { Panel, PanelBody, PanelHeader } from "@/components/panel/panel";
import TableFull from "@/components/tables/TableFull";
import Strings from "@/constants";
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import axios from 'axios';
import React, { useEffect, useState } from "react";

const Banco = () => {

    const [saldo, setSaldo] = useState(null)
    const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }
    useEffect(() => {
        axios.get(`${Config.API_URL}bank/bank/`, config).then((res: any) => {
            const resposta = (res.data.results)
            setSaldo(resposta)

        })
    }, [])

    return (
        <Page title="Banco">

            <PanelContextProvider>
                <Panel>
                    <PanelHeader>
                        {Strings.banco.title}
                    </PanelHeader>
                    <PanelBody>
                        {saldo ?
                            <TableFull saldos={saldo} headers={Strings.banco.table.headers} />
                            :
                            <div style={{ minHeight: '100px', display: 'flex', textAlign: 'center', color: '#111' }}>
                                <p style={{ width: '100%', alignSelf: 'center', margin: '0' }}>
                                    <span style={{ paddingRight: '10px' }}><i className="fas fa-spinner fa-pulse"></i></span>
                                    {Strings.general.loading}
                                </p>
                            </div>}
                    </PanelBody>
                </Panel>
            </PanelContextProvider>

        </Page>
    )
}
export default Banco