import React, { useContext, useState } from "react"
import { Form, Formik } from 'formik'
import { TextField } from '../base/fields'
import { Button } from "@/components"
import { PutDelBandeiraFieldNames, PutDelBandeiraSchema } from '../schemas'
import { CadastroContext } from "@/context/CadastroContext"


const PutDelBandeiraForm = (props: any) => {

    const rowOriginal = props


    const initialValue = {
        [PutDelBandeiraFieldNames.id]: rowOriginal.id,
        [PutDelBandeiraFieldNames.nome]: rowOriginal.nome,
        
    }

    const { setPutBandeira, setBandeiraId } = useContext(CadastroContext)
    const [deletar, setDeletar] = useState(false)
    const [alterar, setAlterar] = useState(false)


    const Delete = () => {
        setDeletar(true)
        setAlterar(false)
    }
    const Put = () => {
        setDeletar(false)
        setAlterar(true)
    }

    return (
        <Formik
            initialValues={initialValue}
            onSubmit={(values) => {
                if (alterar && !deletar) {
                    setPutBandeira(values)
                    setAlterar(false)
                } else if (deletar && !alterar) {
                    setBandeiraId(values.id)
                    setDeletar(false)
                }
            }}
            validationSchema={PutDelBandeiraSchema}
            validateOnChange>
            {({ isValid, dirty }) => (
                <Form noValidate>
                    <div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Nome"
                                name={PutDelBandeiraFieldNames.nome}
                                placeholder={''}
                            />
                        </div>                        
                    </div>
                    <div className="row">
                        <div className="col-xl-6 p-5px">
                            <Button
                                title='Alterar'
                                onClick={() => Put()}
                                type="submit"
                                className="btn btn-success d-block h-45px w-100 btn-lg fs-14px"
                                fakeDisabled={!isValid || !dirty}
                            />
                        </div>
                        <div className="col-xl-6 p-5px">
                            <Button
                                title='Deletar'
                                onClick={() => Delete()}
                                type="submit"
                                className="btn btn-danger d-block h-45px w-100 btn-lg fs-14px"
                                fakeDisabled={!isValid || !dirty}
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik >
    )
}
export default PutDelBandeiraForm