import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Dispatch } from 'redux'

import TestIds from '@/accessibility/test-ids'
import { Button, SecondaryButton } from '@/components'
import Strings from '@/constants'
import Routes from '@/constants/routes'
import { ResetPasswordRequestPayload } from '@/models/user'
import { ActionCreators, StoreState } from '@/redux'
import selectors from '@/selectors'

import { TextField } from '../base/fields'
import { ResetPasswordRequestFieldNames, ResetPasswordRequestSchema } from '../schemas'
import strings from '@/constants/strings'

interface ResetPasswordRequestProps {
  resetPasswordRequest: (payload: ResetPasswordRequestPayload) => void
  pending: boolean
  error?: string
}

const initialValues = {
  [ResetPasswordRequestFieldNames.email]: '',
}

const ResetPasswordRequest = (formProps: ResetPasswordRequestProps): JSX.Element => {
  const { resetPasswordRequest, pending, error } = formProps
  const [goToLogin, setGoToLogin] = useState(false)

  const renderError = (): JSX.Element => (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  )

  if (goToLogin) {
    return <Redirect to={Routes.Login} />
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        resetPasswordRequest(
          new ResetPasswordRequestPayload(values[ResetPasswordRequestFieldNames.email]),
        )
      }}
      validationSchema={ResetPasswordRequestSchema}
      validateOnChange
    >
      {({ isValid, dirty }) => (
        <Form noValidate>
          <div data-testid={TestIds.resetPasswordRequest.form}>
            <div>
              <TextField
                label={Strings.resetPassswordRequest.form.email.label}
                name={ResetPasswordRequestFieldNames.email}
                placeholder={Strings.resetPassswordRequest.form.email.placeholder}
                testId={TestIds.resetPasswordRequest.inputs.email}
                required
              />
            </div>
          </div>
          {error && renderError()}
          <Button
            title={Strings.resetPassswordRequest.form.submit}
            type="submit"
            className="w-100 mt-2 mb-4 btn-success"
            testId={TestIds.resetPasswordRequest.buttons.submit}
            fakeDisabled={!isValid || !dirty}
            disabled={pending}
          />
          <SecondaryButton
            title={Strings.general.back}
            type="button"
            className="w-100"
            testId={TestIds.resetPasswordRequest.buttons.back}
            disabled={pending}
            onClick={() => {
              setGoToLogin(true)
            }}
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
  pending: selectors.api.getPending(state, ActionCreators.user.resetPasswordRequest),
  error: selectors.api.getLatestError(state, ActionCreators.user.resetPasswordRequest),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPasswordRequest: (payload: ResetPasswordRequestPayload) =>
    dispatch(ActionCreators.user.resetPasswordRequest.call(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordRequest)
