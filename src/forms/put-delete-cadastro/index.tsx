import React, { useContext, useState } from "react"
import { Form, Formik } from 'formik'
import { TextField } from '../base/fields'
import { Button } from "@/components"
import { PutDeleteCadastroFieldNames, PutDeleteCadastroSchema } from '../schemas'
import { CadastroContext } from "@/context/CadastroContext"


const PutDeleteCadastroForm = (props: any) => {
    

    const rowOriginal = props.rowOriginal

    if (rowOriginal.complemento === null) {
        rowOriginal.complemento = ''
    }

    const initialValue = {
        [PutDeleteCadastroFieldNames.id]: rowOriginal.id,
        [PutDeleteCadastroFieldNames.nome]: rowOriginal.nome,
        [PutDeleteCadastroFieldNames.sobrenome]: rowOriginal.sobrenome,
        [PutDeleteCadastroFieldNames.cpf]: rowOriginal.cpf,
        [PutDeleteCadastroFieldNames.endereco]: rowOriginal.endereco,
        [PutDeleteCadastroFieldNames.numero]: rowOriginal.numero,
        [PutDeleteCadastroFieldNames.cep]: rowOriginal.cep,
        [PutDeleteCadastroFieldNames.complemento]: rowOriginal.complemento,
    }

    const { setPutDeleteValues, setId } = useContext(CadastroContext)
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
                    setPutDeleteValues(values)
                    setAlterar(false)
                } else if (deletar && !alterar) {
                    setId(values.id)
                    setDeletar(false)
                }
            }}
            validationSchema={PutDeleteCadastroSchema}
            validateOnChange>
            {({ isValid, dirty }) => (
                <Form noValidate>
                    <div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Nome"
                                name={PutDeleteCadastroFieldNames.nome}
                                placeholder={''}
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Sobrenome"
                                name={PutDeleteCadastroFieldNames.sobrenome}
                                placeholder={''}
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Endereço"
                                name={PutDeleteCadastroFieldNames.endereco}
                                placeholder={''}
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Numero"
                                name={PutDeleteCadastroFieldNames.numero}
                                placeholder={''}
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="CEP"
                                name={PutDeleteCadastroFieldNames.cep}
                                placeholder={''}
                                mask='99999-999'
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Complemento"
                                name={PutDeleteCadastroFieldNames.complemento}
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
export default PutDeleteCadastroForm