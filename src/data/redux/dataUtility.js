import axios from 'axios'

import { store } from '../../index'

import { updatePageState } from '../redux/page/actions'
import { resetReduxState } from '../redux/auth/actions'

import { LOCAL_STORAGE, METHOD_TYPES } from '../config/constants'
import { BASE_URL } from '../config/urls'

export const clearAllDataFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE.AWESOLIST_ADMIN)
}

export const getDataFromLocalStorage = (key, undefined_return_value) => {
  const data = localStorage.getItem(key)
  return (data && data !== undefined ? JSON.parse(data) : undefined_return_value)
}

export const setDataInLocalStorage = (key, data) => {
  const json_data = JSON.stringify(data)
  localStorage.setItem(key, json_data)
}

const getHeaders = contentType => {
  const user = getDataFromLocalStorage(LOCAL_STORAGE.ORI_ADMIN, null)
  let headers = { 'Content-Type': contentType }
  if (user && user.token)
    headers.Authorization = `bearer ${user.token}`
  return headers
}

export const fetchDataAndProceed = (
  {
    url,
    method = METHOD_TYPES.GET,
    data = {},
    timeout = 20000,
    modalLoader = false,
    loader = true,
    loaderText = "loading",
    contentType = "application/json"
  } = {},
  callback
) => {
  if (modalLoader)
    store.dispatch(updatePageState({ modalLoading: true }))
  else if (loader)
    store.dispatch(updatePageState({ pageLoading: true, pageLoadingText: loaderText }))
  axios({
    url,
    baseURL: BASE_URL,
    method,
    timeout,
    params: method === METHOD_TYPES.GET ? data : {},
    data: method !== METHOD_TYPES.GET ? data : {},
    headers: getHeaders(contentType),
    validateStatus: status => ((status >= 200 && status < 300) || status === 412),
  }).then(response => {
    callback(false, response.data)
    if (modalLoader)
      store.dispatch(updatePageState({ modalLoading: false }))
    else if (loader)
      store.dispatch(updatePageState({ pageLoading: false, pageLoadingText: "", }))
  }).catch(error => {
    callback(true)
    if (modalLoader)
      store.dispatch(updatePageState({ modalLoading: false }))
    else if (loader)
      store.dispatch(updatePageState({ pageLoading: false, pageLoadingText: "", }))
    if (error && error.response) {
      if (error.response.status === 401) {
        clearAllDataFromLocalStorage()
        store.dispatch(resetReduxState());
      }
    }
  })
}
