import React, { useContext, useState } from "react"
import { Form, Formik } from 'formik'
import { TextField } from '../base/fields'
import { Button } from "@/components"
import { CadastroPessoaFieldNames, CadastroPessoaSchema } from '../schemas'
import { CadastroContext } from "@/context/CadastroContext"



const initialValue = {
    [CadastroPessoaFieldNames.nome]: '',
    [CadastroPessoaFieldNames.sobrenome]: '',
    [CadastroPessoaFieldNames.cpf]: '',
    [CadastroPessoaFieldNames.endereco]: '',
    [CadastroPessoaFieldNames.numero]: '',
    [CadastroPessoaFieldNames.cep]: '',
    [CadastroPessoaFieldNames.complemento]: '',
}


const CadastroPessoasForm = () => {


    const { setValues } = useContext(CadastroContext)
    
    return (
        <Formik
            initialValues={initialValue}
            onSubmit={(values) => {
                setValues(values)
            }}
            validationSchema={CadastroPessoaSchema}
            validateOnChange>
            {({ isValid, dirty }) => (
                <Form noValidate>
                    <div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Nome"
                                name={CadastroPessoaFieldNames.nome}
                                placeholder={'José'}
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Sobrenome"
                                name={CadastroPessoaFieldNames.sobrenome}
                                placeholder={'Silva'}
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="CPF"
                                name={CadastroPessoaFieldNames.cpf}
                                placeholder={'999.999.999-99'}
                                mask='999.999.999-99'
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Endereço"
                                name={CadastroPessoaFieldNames.endereco}
                                placeholder={'Av Paulista'}
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Numero"
                                name={CadastroPessoaFieldNames.numero}
                                placeholder={'9999'}
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="CEP"
                                name={CadastroPessoaFieldNames.cep}
                                placeholder={'99999-999'}
                                mask='99999-999'
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Complemento"
                                name={CadastroPessoaFieldNames.complemento}
                                placeholder={'15B'}
                            />
                        </div>
                    </div>
                    <div className="mb-15px">
                        <Button
                            title='Adicionar'
                            type="submit"
                            className="btn btn-success d-block h-45px w-100 btn-lg fs-14px"
                            fakeDisabled={!isValid || !dirty}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default CadastroPessoasForm