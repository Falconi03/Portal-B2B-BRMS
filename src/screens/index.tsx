import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

import { AppContentID } from '@/constants'

import { AppContext } from './context'
import styles from './styles.scss'

type AppProps = {
  children: null | undefined | React.ReactElement | Array<React.ReactElement>
}

type Props = AppProps & RouteComponentProps

export const App = (props: Props): JSX.Element => {
  const { children } = props

  // Add external libraries
  // import { externalLibriaries } from '@/constants'
  // import useScript from '@/helpers/use-script'
  // useScript(externalLibriaries.dummy)

  return (
    <AppContext.Provider value={props}>
      <div id={AppContentID}>
        {children}
      </div>
    </AppContext.Provider>
  )
}

export default withRouter(connect(null, null)(App))
