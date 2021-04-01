import { UPDATE_PAGE_STATE } from './actionTypes'

export const updatePageState = payload => {
  return {
    type: UPDATE_PAGE_STATE,
    payload
  }
}