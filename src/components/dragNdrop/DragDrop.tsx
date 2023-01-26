import React, { useEffect, useRef, useState } from 'react'
import { toast } from "react-toastify";

import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import TableFull from "@/components/tables/TableFull";
import Strings from "@/constants";
import { Panel, PanelHeader, PanelBody } from "@/components/panel/panel";
import { PanelContextProvider } from '../context/PanelContext';

interface DragDropProps {
    onFileChange: any
}

const DragDrop = (props: DragDropProps) => {

    const [saldo, setSaldo] = useState(null)
    const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }

    const wrapperRef: any = useRef(null)
    const [fileList, setFileList]: any[] = useState([])
    const onDragEnter = () => wrapperRef.current.classList.add('dragover')
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover')
    const onDrop = () => wrapperRef.current.classList.add('dragover')
    const onFileDrop = (e: any) => {
        const newFile = e.target.files[0]
        let extension = e.target.files[0].name.slice(-4)
        console.log(extension)
        if (extension != '.ofx' && extension != '.OFX') {
            toast.error("Arquivo inválido! Favor importar somente arquivo com extensão OFX.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined

            });
        }
        else {
            const fileReader = new FileReader();
            const fileName = e.target.files[0].name
            fileReader.readAsText(newFile);
            fileReader.onload = (e) => {
                const result = e.target!['result'];
                //console.log(1,e.target)
                //console.log(result)
                const config = {
                    headers: {
                        'Authorization': 'Bearer ' + token?.access
                    }
                }
                const bodyParameters = {
                    name: fileName,
                    content: e.target!['result']
                };
                //console.log(bodyParameters, config)
                axios.post(`${Config.API_URL}file/file_upload/`, bodyParameters, config)
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

                        axios.get(`${Config.API_URL}file/file_upload/`, config).then((res: any) => {
                            const resposta = (res.data.results)
                            setSaldo(resposta)
                        })


                        if (newFile) {
                            const updatedList = [...fileList, newFile]
                            setFileList(updatedList)
                            props.onFileChange(updatedList)
                        }
                    })
                    .catch((error: any) => {
                        console.log(error.response)
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
        }
    }
    /* const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }
    const [saldo, setSaldo] = useState(null) */
    async function carregarTabela() {
        
    }
    
    useEffect(() => {
        axios.get(`${Config.API_URL}file/file_upload/`, config).then((res: any) => {
            const resposta = (res.data.results)
            setSaldo(resposta)

        })
    }, [])

    const fileRemove = (file: []) => {
        const updatedList = [...fileList]
        updatedList.splice(fileList.indexOf(file), 1)
        setFileList(updatedList)
        props.onFileChange(updatedList)
    }

    return (
        <div>
            <div className='drop-file'>
                <div
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    ref={wrapperRef}
                    className='drop-file-input'>
                    <div className='drop-file-label'>
                        <i className='fa fa-cloud-arrow-up' />
                        <p>Drag and Drop your files here</p>
                    </div>
                    <input type='file' value='' onChange={onFileDrop}></input>
                </div>
            </div>
            {saldo != null ?
                <PanelContextProvider>
                    <Panel>
                        <PanelHeader>
                            {Strings.files.title}
                        </PanelHeader>
                        <PanelBody>
                            <TableFull saldos={saldo} headers={Strings.files.table.headers} />
                        </PanelBody>                        
                    </Panel>
                </PanelContextProvider>
                : null}
        </div>
    )
}

export default DragDrop