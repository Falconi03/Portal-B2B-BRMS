import React, { useContext, useEffect, useState } from "react";
import { Page } from "@/components";
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import Popup from 'reactjs-popup';
import strings from "@/constants/strings";
import { toast } from "react-toastify";
import { CadastroContext } from "@/context/CadastroContext";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AdministradoraForm, PutDelAdministradoraForm } from "@/forms";
import Strings from "@/constants";
import TableFull from "@/components/tables/TableFull";
import { Panel, PanelBody } from "@/components/panel/panel";



const Administradora = () => {


    const {
        adminNome,
        setAdminNome,
        adminId,
        setAdminId,
        putAdmin,
        setPutAdmin,
    } = useContext(CadastroContext)

    const [saldo, setSaldo] = useState(null)
    const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }

    ///////////////////////////// GET //////////////////////////////////

    useEffect(() => {
        axios.get(`${Config.API_URL}card_administrator/`, config).then((res: any) => {
            const resposta = (res.data.results)
            setSaldo(resposta)

        })
    }, [])

    ///////////////////////////// POST //////////////////////////////////

    useEffect(() => {
        const bodyParameters = adminNome
        if (Object.keys(adminNome).length > 0) {
            axios.post(`${Config.API_URL}card_administrator/`, bodyParameters, config)
                .then((res: any) => {
                    console.log(res.status)
                    toast.success("Arquivo importado com sucesso.", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined
                    });
                    setSaldo(null)
                    setAdminNome({})
                    axios.get(`${Config.API_URL}card_administrator/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    console.log(error.response)
                    setAdminNome({})
                    toast.error("Arquivo já importado anteriormente.", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined
                    });
                });
        }

    }, [adminNome])

    ///////////////////////////// DELETE //////////////////////////////////

    useEffect(() => {

        if (adminId > -1) {
            axios.delete(`${Config.API_URL}card_administrator/${adminId}/`, config)
                .then((res: any) => {
                    console.log(res.status)
                    toast.success("Arquivo alterado com sucesso.", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined
                    });
                    setSaldo(null)
                    setAdminId(-1)
                    axios.get(`${Config.API_URL}card_administrator/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    setAdminId(-1)
                    console.log(error.response)
                    toast.error("Falha ao alterar o arquivo", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined
                    });
                });
        }

    }, [adminId])

    ///////////////////////////// PUT ////////////////////////////////// 

    useEffect(() => {
        const bodyParameters: { id?: any } = putAdmin
        if (Object.keys(putAdmin).length > 0) {
            axios.put(`${Config.API_URL}card_administrator/${bodyParameters.id}/`, bodyParameters, config)
                .then((res: any) => {
                    console.log(res.status)
                    toast.success("Arquivo alterado com sucesso.", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined
                    });
                    setSaldo(null)
                    setPutAdmin({})
                    axios.get(`${Config.API_URL}card_administrator/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    setPutAdmin({})
                    console.log(error.response)
                    toast.error("Falha ao alterar o arquivo", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined
                    });
                });
        }

    }, [putAdmin])


    return (
        <Page title="Administradoras">
            <Popup
                trigger={
                    <button className="btn buttons-print btn-sm btn-principal mb-3" style={{ border: '1px solid #d0d6dd' }}><i className="fa fa-circle-plus" style={{ paddingRight: '0.5rem' }}></i>Adicionar</button>
                } modal nested>
                {(close: any) => {
                    if (Object.keys(adminNome).length > 0) {
                        setTimeout(close, 500)
                    }
                    return (
                        <div className="modal-popup">
                            <div className='modal-popup header' >
                                <h4 className="panel-title">cadastro</h4>
                                <div className="panel-heading-btn">
                                    <button className="btn  btn-icon btn-circle btn-danger modal-popup button-close" onClick={close}><i className="fa fa-times"></i></button>
                                </div>
                            </div>
                            <PerfectScrollbar className={'app-sidebar-content'} options={{ suppressScrollX: true }}>
                                <div className="modal-popup content">
                                    <AdministradoraForm />
                                </div>
                            </PerfectScrollbar>
                        </div>
                    )
                }}
            </Popup>
            <Panel>
                <PanelBody>
                    {saldo ?
                        <TableFull
                            headers={strings.administradora.table.headers}
                            saldos={saldo}
                            editavel={true}
                        >
                            <PutDelAdministradoraForm />
                        </TableFull> :
                        <div style={{ minHeight: '100px', display: 'flex', textAlign: 'center', color: '#111' }}>
                            <p style={{ width: '100%', alignSelf: 'center', margin: '0' }}>
                                <span style={{ paddingRight: '10px' }}><i className="fas fa-spinner fa-pulse"></i></span>
                                {Strings.general.loading}
                            </p>
                        </div>}
                </PanelBody>
            </Panel>
        </Page>
    )
}
export default Administradora