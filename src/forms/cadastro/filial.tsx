import React, { useContext } from "react"
import { Form, Formik } from 'formik'
import { TextField } from '../base/fields'
import { Button } from "@/components"
import { FilialFieldNames, FilialSchema } from '../schemas'
import { CadastroContext } from "@/context/CadastroContext"



const initialValue = {
    [FilialFieldNames.cnpj]: '',
    [FilialFieldNames.razao_social]: '',
    [FilialFieldNames.nome_fantasia]: '',
}

const FilialForm = () => {


    const { setFilialNome } = useContext(CadastroContext)


    return (
        <Formik
            initialValues={initialValue}
            onSubmit={(values) => {
                setFilialNome(values)
            }}
            validationSchema={FilialSchema}
            validateOnChange>
            {({ isValid, dirty }) => (
                <Form noValidate>
                    <div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="CNPJ"
                                name={FilialFieldNames.cnpj}
                                placeholder={'99.999.999/9999-99'}
                                mask='99.999.999/9999-99'
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Razão Social"
                                name={FilialFieldNames.razao_social}
                                placeholder={''}
                            />
                        </div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Nome Fantasia"
                                name={FilialFieldNames.nome_fantasia}
                                placeholder={''}
                            />
                        </div>
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
export default FilialForm