import React, { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { getAuth } from '@/helpers/auth'
import Config from '@/config'
import { Form, Formik, useField, Field } from 'formik'
import { TextField } from '../base/fields'
import { Button } from "@/components"
import { ECFieldNames, ECSchema } from '../schemas'
import { CadastroContext } from "@/context/CadastroContext"


const initialValue = {
    [ECFieldNames.nome]: '',
    [ECFieldNames.id_filial]: '',
    [ECFieldNames.id_administradora]: '',
    [ECFieldNames.ativo]: false,

}

const MySelect = ({ label, ...props }: any) => {

    const [field, meta] = useField(props);
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={props.id || props.name}>{label}:</label>
            <select className="form-control"{...field} {...props} />
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </div>
    );
};



const ECForm = () => {

    const [filial, setFilial] = useState<any[]>()
    const [administradora, setAdministradora] = useState<any[]>()
    const [ativo, setAtivo] = useState(false)
    const token = getAuth()
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token?.access
        }
    }

    useEffect(() => {
        axios.get(`${Config.API_URL}branch/`, config).then((res: any) => {
            const resposta = (res.data.results)
            setFilial(resposta)

        })
    }, [])

    useEffect(() => {
        axios.get(`${Config.API_URL}card_administrator/`, config).then((res: any) => {
            const resposta = (res.data.results)
            setAdministradora(resposta)

        })
    }, [])

    const { setECNome, ECNome } = useContext(CadastroContext)


    return (
        <Formik
            initialValues={{
                [ECFieldNames.nome]: '',
                [ECFieldNames.id_filial]: '',
                [ECFieldNames.id_administradora]: '',
                [ECFieldNames.ativo]: false,
            }}
            onSubmit={(values) => {
                setECNome(values)
            }}
            validationSchema={ECSchema}
            validateOnChange>
            {({ isValid, dirty }) => (
                <Form noValidate>
                    {filial != null && administradora != null ?
                        <div>
                            <div className="form-floating mb-15px">
                                <TextField
                                    label="Nome"
                                    name={ECFieldNames.nome}
                                    placeholder={''}
                                />
                            </div>
                            <div className="form-floating mb-15px">
                                <MySelect label="Filial" name={String(ECFieldNames.id_filial)}>
                                    <option value="">Selecione a filial</option>
                                    {filial.map((fil: { id: string, razao_social: string }, id: number) => {
                                        return (
                                            <option key={id} value={fil.id}>{fil.razao_social}</option>
                                        )
                                    })}
                                </MySelect>
                            </div>
                            <div className="form-floating mb-15px">
                                <MySelect label="Administradora" name={String(ECFieldNames.id_administradora)}>
                                    <option value="">Selecione a administradora</option>
                                    {administradora.map((admin: { id: string, nome: string }, id: number) => {
                                        return (
                                            <option key={id} value={admin.id}>{admin.nome}</option>
                                        )
                                    })}
                                </MySelect>
                            </div>
                            <div className="form-floating mb-15px fs-6">
                                <div>
                                <label>                                                                       
                                    Ativo: 
                                </label>
                                <input className="ms-1 align-middle"  type="checkbox" name={ECFieldNames.ativo} />
                                </div>
                            </div>
                            <Button
                                title='Adicionar'
                                type="submit"
                                className="btn btn-success d-block h-45px w-100 btn-lg fs-14px"
                                fakeDisabled={!isValid || !dirty}
                            />
                        </div>
                        : null}
                </Form>
            )}
        </Formik>
    )
}
export default ECForm