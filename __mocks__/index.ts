/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, ReactWrapper } from 'enzyme'
import { Component } from 'react'
import { match as Match } from 'react-router'

import history from '../src/helpers/history'

// Instantiate router context
const router = {
  history,
  route: {
    location: {},
    match: {},
  },
}

const createContext = () => ({
  context: { router },
  childContextTypes: { router: {} },
})

export const mountWithContext = (
  node: React.ReactElement,
): ReactWrapper<unknown, Readonly<{}>, Component<{}, {}, unknown>> => mount(node, createContext())

interface LocationType {
  pathname: string
  search: string
  state: {}
  hash: string
}

export const location = ({
  pathname = '',
  search = '',
  state = {},
  hash = '',
}: Partial<LocationType>): LocationType => ({
  pathname,
  search,
  state,
  hash,
})

interface MatchType<P> {
  params: P
  isExact?: boolean
  path?: string
  url?: string
}

export const match = <P>({
  params,
  isExact = false,
  path = '',
  url = '',
}: MatchType<P>): Match<P> => ({
    params,
    isExact,
    path,
    url,
  })

const store = {}

const Mocks = { store }

export const emptyFunction = (): void => {} // eslint-disable-line @typescript-eslint/no-empty-function

export default Mocks
