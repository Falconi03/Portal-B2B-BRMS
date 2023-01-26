import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { Redirect, Route } from 'react-router-dom'

import Routes from '@/constants/routes'
import { getAuth } from '@/helpers/auth'
import { User } from '@/models'
import { ActionCreators, StoreState } from '@/redux'
import selectors from '@/selectors'

type StateToPropsType = {
  user: User | undefined
  pending: boolean
  error: string | undefined
}

interface PrivateRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any> | React.FunctionComponent<any>
  exact?: boolean
  path: string | undefined
}

const PrivateRoute = (
  props: PrivateRouteProps & StateToPropsType & RouteComponentProps,
): JSX.Element => {
  const { component, user, path, exact, location, pending, error } = props
  const token = getAuth()
  /* console.log(user) */
  if (user) {
    return <Route exact={exact} path={path} location={location} component={component} />
  }

  if (pending || (token && error === undefined)) {
    // Fallback to suspense when user is loading
    throw Promise.reject()
  }
  return <Redirect to={{ pathname: Routes.Login, search: location.search }} />
}

PrivateRoute.defaultProps = {
  exact: false,
}

const mapStateToProps = (state: StoreState): StateToPropsType => (
  /* console.log(state), */
  {
  user: selectors.user.getUser(state),
  pending: selectors.api.getPending(state, ActionCreators.user.updateUser),
  error: selectors.api.getLatestError(state, ActionCreators.user.updateUser),
})

const PrivateRouteWithRouter = withRouter(connect(mapStateToProps)(PrivateRoute))

const WithSuspense = (props: PrivateRouteProps): JSX.Element => (
  <Suspense fallback={<div>...</div>}>
    <PrivateRouteWithRouter {...props} />
  </Suspense>
)

WithSuspense.defaultProps = {
  exact: false,
}

export default WithSuspense
