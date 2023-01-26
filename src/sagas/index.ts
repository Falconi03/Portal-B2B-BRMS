import { all, spawn, takeLatest } from 'redux-saga/effects'

import { ActionCreators } from '@/redux'
import { getSuccessActionName } from '@/redux/common'
import { ACTIONS as userActions } from '@/redux/user'

import * as user from './user'

export default function* root(): GeneratorType {
  yield spawn(function* run() {
    yield all([
      takeLatest(getSuccessActionName(ActionCreators.user.login.actionName), user.setUserSession),
      takeLatest(getSuccessActionName(ActionCreators.user.logout.actionName), user.logout) ,
      takeLatest(userActions.TOKEN_REFRESH, user.setAuthToken),
      takeLatest(
        getSuccessActionName(ActionCreators.user.updateUser.actionName),
        user.setUserSession,
      ),
      takeLatest(
        getSuccessActionName(ActionCreators.user.resetPasswordRequest.actionName),
        user.resetPasswordRequest,
      ),
      takeLatest(
        getSuccessActionName(ActionCreators.user.resetPasswordChange.actionName),
        user.resetPasswordChange,
      ),
    ])
  })

  yield spawn(user.startup)
}
