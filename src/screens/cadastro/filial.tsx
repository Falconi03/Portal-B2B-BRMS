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
import { FilialForm, PutDelFilialForm } from "@/forms";
import Strings from "@/constants";
import TableFull from "@/components/tables/TableFull";
import { Panel, PanelBody } from "@/components/panel/panel";



const Filial = () => {


    const {
        filialNome,
        setFilialNome,
        filialId,
        setFilialId,
        putFilial,
        setPutFilial,
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
        const bodyParameters = filialNome
        if (Object.keys(filialNome).length > 0) {
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
                    setFilialNome({})
                    axios.get(`${Config.API_URL}branch/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    console.log(error.response)
                    setFilialNome({})
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

    }, [filialNome])

    ///////////////////////////// DELETE //////////////////////////////////

    useEffect(() => {

        if (filialId > -1) {
            axios.delete(`${Config.API_URL}branch/${filialId}/`, config)
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
                    setFilialId(-1)
                    axios.get(`${Config.API_URL}branch/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    setFilialId(-1)
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

    }, [filialId])

    ///////////////////////////// PUT ////////////////////////////////// 

    useEffect(() => {
        const bodyParameters: { id?: any } = putFilial
        if (Object.keys(putFilial).length > 0) {
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
                    setPutFilial({})
                    axios.get(`${Config.API_URL}branch/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    setPutFilial({})
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

    }, [putFilial])


    return (
        <Page title="Filiais">
            <Popup
                trigger={
                    <button className="btn buttons-print btn-sm btn-principal mb-3" style={{ border: '1px solid #d0d6dd' }}><i className="fa fa-circle-plus" style={{ paddingRight: '0.5rem' }}></i>Adicionar</button>
                } modal nested>
                {(close: any) => {
                    if (Object.keys(filialNome).length > 0) {
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
                                    <FilialForm />
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
                            headers={strings.filial.table.headers}
                            saldos={saldo}
                            editavel={true}
                            >
                            <PutDelFilialForm />
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
export default Filial