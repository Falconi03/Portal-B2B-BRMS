import { getYear } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Strings, { Images } from '@/constants'
import Routes from '@/constants/routes'
import { getAuth } from '@/helpers/auth'
import { joinAll } from '@/helpers/string'
import { User } from '@/models'
import { StoreState } from '@/redux'
import selectors from '@/selectors'

import styles from './styles.scss'

export type PageProps = {
  title: string
  children: React.ReactNode | null
  user: User | undefined
}

const UnauthenticatedPage = ({ title, children, user }: PageProps): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = getAuth()
    if (user && token) {
      setLoggedIn(true)
    }
  }, [user])

  return (
    <div className={styles.page}>
      {loggedIn && <Redirect to={{ pathname: Routes.Home }} />}
      {children}
    </div>
  )
}

const mapStateToProps = (state: StoreState) => ({
  user: selectors.user.getUser(state),
})

export default connect(mapStateToProps)(UnauthenticatedPage)
