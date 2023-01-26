import { Form, Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'

import TestIds from '@/accessibility/test-ids'
import { Button } from '@/components'
import Strings from '@/constants'
import Routes from '@/constants/routes'
import { LoginPayload } from '@/models/user'
import { ActionCreators, StoreState } from '@/redux'
import selectors from '@/selectors'

import { TextField } from '../base/fields'
import { LoginFieldNames, LoginSchema } from '../schemas'
import strings from '@/constants/strings'

interface LoginFormProps {
  login: (payload: LoginPayload) => void
  pending: boolean
  error?: string
}

const initialValues = {
  [LoginFieldNames.email]: '',
  [LoginFieldNames.password]: '',
}

const LoginForm = (formProps: LoginFormProps): JSX.Element => {
  const { login, pending, error } = formProps

  const renderError = (): JSX.Element => (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  )

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        login(new LoginPayload(values[LoginFieldNames.email], values[LoginFieldNames.password]))
      }}
      validationSchema={LoginSchema}
      validateOnChange
    >
      {({ isValid, dirty }) => (
        <Form noValidate>
          <div data-testid={TestIds.login.form}>
            <div>
              <TextField
                label={Strings.login.form.email.label}
                name={LoginFieldNames.email}
                placeholder={Strings.login.form.email.placeholder}
                testId={TestIds.login.inputs.email}
                required
              />
            </div>
            <div>
              <TextField
                label={Strings.login.form.password.label}
                name={LoginFieldNames.password}
                placeholder={Strings.login.form.password.placeholder}
                testId={TestIds.login.inputs.password}
                required
                inputType="password"
              />
            </div>
            <div className="text-end mb-3">
              <Link style={{color: 'white'}} to={Routes.ResetPasswordRequest}>{Strings.resetPassswordRequest.title}</Link>
            </div>
          </div>
          {error && renderError()}
          <Button
            title={Strings.login.form.submit}
            type="submit"
            className="w-100 btn-success"
            testId={TestIds.login.buttons.submit}
            fakeDisabled={!isValid || !dirty}
            disabled={pending}
          />
          <p className="text-center text-grey-darker mb-0 mt-5" style={{fontSize:'12px', color: '#bbb' }}>
            {strings.general.reserved}
          </p>
        </Form>
      )}
    </Formik>
  )
}

const mapStateToProps = (state: StoreState) => ({
  pending: selectors.api.getPending(state, ActionCreators.user.login),
  error: selectors.api.getLatestError(state, ActionCreators.user.login),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (payload: LoginPayload) => dispatch(ActionCreators.user.login.call(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
