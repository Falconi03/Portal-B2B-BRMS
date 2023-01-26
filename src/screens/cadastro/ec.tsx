import React, { useContext, useEffect, useState } from "react";
import { Page } from "@/components";
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import Popup from 'reactjs-popup';
import TableFull from "@/components/tables/TableFull";
import strings from "@/constants/strings";
import { toast } from "react-toastify";
import { CadastroContext } from "@/context/CadastroContext";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ECForm } from "@/forms";
import Strings from "@/constants";
import { Panel, PanelBody } from "@/components/panel/panel";



const EC = () => {


    const {
        ECNome,
        setECNome,
        ECId,
        setECId,
        putEC,
        setPutEC,
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
        axios.get(`${Config.API_URL}branch/`, config).then((res: any) => {
            const resposta = (res.data.results)
            setSaldo(resposta)

        })
    }, [])

    ///////////////////////////// POST //////////////////////////////////

    useEffect(() => {
        const bodyParameters = ECNome
        if (Object.keys(ECNome).length > 0) {
            axios.post(`${Config.API_URL}branch/`, bodyParameters, config)
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
                    setECNome({})
                    axios.get(`${Config.API_URL}branch/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    console.log(error.response)
                    setECNome({})
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

    }, [ECNome])

    ///////////////////////////// DELETE //////////////////////////////////

    useEffect(() => {

        if (ECId > -1) {
            axios.delete(`${Config.API_URL}branch/${ECId}/`, config)
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
                    setECId(-1)
                    axios.get(`${Config.API_URL}branch/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    setECId(-1)
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

    }, [ECId])

    ///////////////////////////// PUT ////////////////////////////////// 

    useEffect(() => {
        const bodyParameters: { id?: any } = putEC
        if (Object.keys(putEC).length > 0) {
            axios.put(`${Config.API_URL}branch/${bodyParameters.id}/`, bodyParameters, config)
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
                    setPutEC({})
                    axios.get(`${Config.API_URL}branch/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    setPutEC({})
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

    }, [putEC])


    return (
        <Page title="Estabelecimento Comercial">
            <Popup
                trigger={
                    <button className="btn buttons-print btn-sm btn-principal mb-3" style={{ border: '1px solid #d0d6dd' }}><i className="fa fa-circle-plus" style={{ paddingRight: '0.5rem' }}></i>Adicionar</button>
                } modal nested>
                {(close: any) => {
                    if (Object.keys(ECNome).length > 0) {
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
                                    <ECForm />
                                </div>
                            </PerfectScrollbar>
                        </div>
                    )
                }}
            </Popup>
            <Panel>
                <PanelBody>
                    {/* {saldo ?
                <TableFull
                    headers={strings.EC.table.headers}
                    saldos={saldo}
                            editavel={true}
                            >
                            <PutDelEcForm />
                        </TableFull> :
                <div style={{ minHeight: '100px', display: 'flex', textAlign: 'center', color: '#111' }}>
                    <p style={{ width: '100%', alignSelf: 'center', margin: '0' }}>
                       <span style={{ paddingRight: '10px' }}><i className="fas fa-spinner fa-pulse"></i></span>
                        {Strings.general.loading}
                    </p>
                </div>} */}
                </PanelBody>
            </Panel>

        </Page>
    )
}
export default EC