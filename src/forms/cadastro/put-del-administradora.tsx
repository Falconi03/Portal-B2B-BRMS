import React, { useContext, useState } from "react"
import { Form, Formik } from 'formik'
import { TextField } from '../base/fields'
import { Button } from "@/components"
import { PutDelAdministradoraFieldNames, PutDelAdministradoraSchema } from '../schemas'
import { CadastroContext } from "@/context/CadastroContext"


const PutDelAdministradoraForm = (props: any) => {

    console.log(props)

    const rowOriginal = props


    const initialValue = {
        [PutDelAdministradoraFieldNames.id]: rowOriginal.id,
        [PutDelAdministradoraFieldNames.nome]: rowOriginal.nome,
        
    }

    const { setPutAdmin, setAdminId } = useContext(CadastroContext)
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
                    setPutAdmin(values)
                    setAlterar(false)
                } else if (deletar && !alterar) {
                    setAdminId(values.id)
                    setDeletar(false)
                }
            }}
            validationSchema={PutDelAdministradoraSchema}
            validateOnChange>
            {({ isValid, dirty }) => (
                <Form noValidate>
                    <div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Nome"
                                name={PutDelAdministradoraFieldNames.nome}
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
export default PutDelAdministradoraForm