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
import { BandeiraForm, PutDelBandeiraForm } from "@/forms";
import Strings from "@/constants";
import TableFull from "@/components/tables/TableFull";
import { Panel, PanelBody } from "@/components/panel/panel";



const Bandeira = () => {


    const {
        bandeiraNome,
        setBandeiraNome,
        bandeiraId,
        setBandeiraId,
        putBandeira,
        setPutBandeira
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
        axios.get(`${Config.API_URL}card_flag/`, config).then((res: any) => {
            const resposta = (res.data.results)
            setSaldo(resposta)

        })
    }, [])

    ///////////////////////////// POST //////////////////////////////////

    useEffect(() => {
        const bodyParameters = bandeiraNome
        if (Object.keys(bandeiraNome).length > 0) {
            axios.post(`${Config.API_URL}card_flag/`, bodyParameters, config)
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
                    setBandeiraNome({})
                    axios.get(`${Config.API_URL}card_flag/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    console.log(error.response)
                    setBandeiraNome({})
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

    }, [bandeiraNome])

    ///////////////////////////// DELETE //////////////////////////////////

    useEffect(() => {

        if (bandeiraId > -1) {
            axios.delete(`${Config.API_URL}card_flag/${bandeiraId}/`, config)
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
                    setBandeiraId(-1)
                    axios.get(`${Config.API_URL}card_flag/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    setBandeiraId(-1)
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

    }, [bandeiraId])

    ///////////////////////////// PUT ////////////////////////////////// 

    useEffect(() => {
        const bodyParameters: { id?: any } = putBandeira
        if (Object.keys(putBandeira).length > 0) {
            axios.put(`${Config.API_URL}card_flag/${bodyParameters.id}/`, bodyParameters, config)
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
                    setPutBandeira({})
                    axios.get(`${Config.API_URL}card_flag/`, config).then((res: any) => {
                        const resposta = (res.data.results)
                        setSaldo(resposta)
                    })
                })
                .catch((error: any) => {
                    setPutBandeira({})
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

    }, [putBandeira])


    return (
        <Page title="Bandeiras">
            <Popup
                trigger={
                    <button className="btn buttons-print btn-sm btn-principal mb-3" style={{ border: '1px solid #d0d6dd' }}><i className="fa fa-circle-plus" style={{ paddingRight: '0.5rem' }}></i>Adicionar</button>
                } modal nested>
                {(close: any) => {
                    if (Object.keys(bandeiraNome).length > 0) {
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
                                    <BandeiraForm />
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
                            headers={strings.bandeira.table.headers}
                            saldos={saldo}
                            editavel={true}
                            >
                            <PutDelBandeiraForm />
                        </TableFull>  :
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
export default Bandeira