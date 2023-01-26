import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { Dispatch } from 'redux'

import Routes from '@/constants/routes'
import { getAuth } from '@/helpers/auth'
import { actionCreators as userAC } from '@/redux/user'

interface DispatchProps {
  logout: () => void
}

export const LogoutScreen = ({ logout }: DispatchProps & RouteComponentProps): JSX.Element => {
  useEffect(() => {
    logout()
  }, [])
  return <Redirect to={Routes.Login} />
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  logout: () => dispatch(userAC.logout.call(getAuth()?.refresh ?? '')),
})

export default withRouter(connect(undefined, mapDispatchToProps)(LogoutScreen))
