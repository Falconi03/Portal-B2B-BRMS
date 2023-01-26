import axios, { AxiosRequestConfig } from 'axios'
import { AnyAction } from 'redux'

import Config from '@/config'
import { IAppSate } from '@/redux'
import {
  accessDenied,
  ACTIONS as API_ACTIONS,
  APIAction,
  APIActionParameter,
  apiEnd,
  apiError,
  apiStart,
} from '@/redux/api'
import { getFailureActionName, getSuccessActionName } from '@/redux/common'
import { ACTIONS as userActions } from '@/redux/user'

const axiosApiInstance = axios.create()

const callApi = (
  config: AxiosRequestConfig,
  payload: APIActionParameter,
  dispatch: (payload: Record<string, unknown>) => AnyAction,
  retry = false,
): void => {
  const { actionName, url, jwtTokens, customOnSuccess, customOnFailure } = payload

  axiosApiInstance
    .request(config)
    .then(response => {
      if (customOnSuccess) dispatch(customOnSuccess(response.data))
      else dispatch({ type: getSuccessActionName(actionName), payload: response.data })
    })
    .catch(error => {
      dispatch(apiError(actionName, error.response?.data?.error ?? error.toString()))
      if (customOnFailure) dispatch(customOnFailure(error))
      else dispatch({ type: getFailureActionName(actionName), payload: error })

      // Refresh the token if it is able
      if (error.response && error.response.status === 403 && jwtTokens?.refresh && !retry) { 
             
        axiosApiInstance
          .request({
            url: `${Config.API_URL}refresh/`,
            method: 'POST',
            data: {
              refresh: jwtTokens?.refresh,
            },
          })
          .then(response => {
            const newConfig = { ...config }
            if (newConfig?.headers?.Authorization !== undefined) {
              newConfig.headers.Authorization = `Bearer ${response.data.access}`
            }
            dispatch({ type: userActions.TOKEN_REFRESH, payload: response.data })
            callApi(newConfig, payload, dispatch, true)
          })
          .catch(() => {
            dispatch(accessDenied(url))
          })
          .finally(() => {
            if (actionName) {
              dispatch(apiEnd(actionName))
            }
          })
      }if(error.response && error.response.status === 401){
        window.location.reload()
      }else {
        dispatch(accessDenied(url))
      }
    })
    .finally(() => {
      if (actionName) {
        dispatch(apiEnd(actionName))
      }
    })
}

const apiMiddleware = ({ dispatch }: IAppSate) => (next: (action: AnyAction) => void) => (
  action: APIAction,
): void => {
  next(action)

  if (action.type !== API_ACTIONS.API) {
    return
  }

  const { actionName, url, method, data, headers, jwtTokens } = action.payload
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data'

  let requestHeaders: Record<string, string> = {}
  requestHeaders['Content-Type'] = 'application/json'
  if (jwtTokens) {
    requestHeaders.Authorization = `Bearer ${jwtTokens.access}`
  }

  if (headers) {
    requestHeaders = { ...requestHeaders, ...headers }
  }

  if (actionName) {
    dispatch(apiStart(actionName))
  }

  callApi(
    {
      url,
      method,
      headers: requestHeaders,
      [dataOrParams]: data,
    },
    action.payload,
    dispatch,
  )
}

export default apiMiddleware
