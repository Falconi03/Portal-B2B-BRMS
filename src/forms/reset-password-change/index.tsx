import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Dispatch } from 'redux'

import TestIds from '@/accessibility/test-ids'
import { Button, SecondaryButton } from '@/components'
import Strings from '@/constants'
import Routes from '@/constants/routes'
import { getQueryString } from '@/helpers/utils'
import { ResetPasswordChangePayload } from '@/models/user'
import { ActionCreators, StoreState } from '@/redux'
import selectors from '@/selectors'

import { PasswordField } from '../base/fields'
import { ResetPasswordChangeFieldNames, ResetPasswordChangeSchema } from '../schemas'
import strings from '@/constants/strings'

interface ResetPasswordChangeProps {
  resetPasswordChange: (payload: ResetPasswordChangePayload) => void
  pending: boolean
  error?: string
}

const initialValues = {
  [ResetPasswordChangeFieldNames.password]: '',
  [ResetPasswordChangeFieldNames.passwordConfirmation]: '',
} 

const ResetPasswordChange = (formProps: ResetPasswordChangeProps): JSX.Element => {
  const { resetPasswordChange, pending, error } = formProps
  const [goToLogin, setGoToLogin] = useState(false)
  const token = getQueryString('token')

  if (!token) {
    setGoToLogin(true)
  }

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
        resetPasswordChange(
          new ResetPasswordChangePayload(
            token ?? '',
            values[ResetPasswordChangeFieldNames.password],
          ),
        )
      }}
      validationSchema={ResetPasswordChangeSchema}
      validateOnChange
    >
      {({ isValid, dirty }) => (
        <Form noValidate>
          <div data-testid={TestIds.resetPasswordChange.form}>
            <div>
              <PasswordField
                label={Strings.resetPassswordChange.form.password.label}
                name={ResetPasswordChangeFieldNames.password}
                placeholder={Strings.resetPassswordChange.form.password.placeholder}
                testId={TestIds.resetPasswordChange.inputs.password}
                required
              />
            </div>
            <div>
              <PasswordField
                label={Strings.resetPassswordChange.form.passwordConfirmation.label}
                name={ResetPasswordChangeFieldNames.passwordConfirmation}
                placeholder={Strings.resetPassswordChange.form.passwordConfirmation.placeholder}
                testId={TestIds.resetPasswordChange.inputs.passwordConfirmation}
                required
              />
            </div>
          </div>
          {error && renderError()}
          <Button
            title={Strings.resetPassswordChange.form.submit}
            type="submit"
            className="w-100 mt-2 mb-4 btn-success"
            testId={TestIds.resetPasswordChange.buttons.submit}
            fakeDisabled={!isValid || !dirty}
            disabled={pending}
          />
          <SecondaryButton
            title={Strings.resetPassswordChange.form.back}
            type="button"
            className="w-100"
            testId={TestIds.resetPasswordChange.buttons.back}
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
  pending: selectors.api.getPending(state, ActionCreators.user.resetPasswordChange),
  error: selectors.api.getLatestError(state, ActionCreators.user.resetPasswordChange),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPasswordChange: (payload: ResetPasswordChangePayload) =>
    dispatch(ActionCreators.user.resetPasswordChange.call(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordChange)
