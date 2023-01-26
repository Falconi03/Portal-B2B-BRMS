import { toast } from 'react-toastify'
import { AnyAction } from 'redux'
import { call, put } from 'redux-saga/effects'

import Strings from '@/constants'
import Routes from '@/constants/routes'
import { deleteAuth, getAuth, setAuth } from '@/helpers/auth'
import history from '@/helpers/history'
import { setJWTTokens } from '@/helpers/services/api'
import { actionCreators as generalSettingsActionCreators } from '@/redux/general-settings'
import { actionCreators } from '@/redux/user'

export function* startup(): GeneratorType {
  if (!STORYBOOK) {
    const token = getAuth()
    if (token) {
      yield call(setJWTTokens, token)
      yield put(actionCreators.updateUser.call())
    }
  }
}

export function* setUserSession(action: AnyAction): GeneratorType {
  const user = action.payload.data || {}
  const { token } = user
  if (token) {
    yield call(setJWTTokens, token)
    yield call(setAuth, token)
    yield put(generalSettingsActionCreators.getGeneralSettings.call())
  }
}

export function* setAuthToken(action: AnyAction): GeneratorType {
  const token = action.payload.data || {}
  if (token) {
    yield call(setJWTTokens, token)
    yield call(setAuth, token)
  }
}

export function* resetPasswordRequest(): GeneratorType {
  toast.success(Strings.resetPassswordRequest.success)
  yield call(history.push, Routes.Login)
}

export function* resetPasswordChange(): GeneratorType {
  toast.success(Strings.resetPassswordChange.success)
  yield call(history.push, Routes.Login)
}

export function* logout(): GeneratorType {
  yield call(deleteAuth)
  yield call(setJWTTokens, undefined)
  yield call(history.push, Routes.Login)
}
