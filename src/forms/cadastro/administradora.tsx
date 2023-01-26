import React, { useContext} from "react"
import { Form, Formik } from 'formik'
import { TextField } from '../base/fields'
import { Button } from "@/components"
import { AdministradoraFieldNames, AdministradoraSchema } from '../schemas'
import { CadastroContext } from "@/context/CadastroContext"



const initialValue = {
    [AdministradoraFieldNames.nome]: '',    
}

const AdministradoraForm = () => {

    
    const { setAdminNome } = useContext(CadastroContext)

    
    return (
        <Formik
            initialValues={initialValue}
            onSubmit={(values) => {
                setAdminNome(values)
            }}
            validationSchema={AdministradoraSchema}
            validateOnChange>
            {({ isValid, dirty }) => (
                <Form noValidate>
                    <div>
                        <div className="form-floating mb-15px">
                            <TextField
                                label="Nome"
                                name={AdministradoraFieldNames.nome}
                                placeholder={'Amex'}
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
export default AdministradoraForm