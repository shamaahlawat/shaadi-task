import states from './states'
import { UPDATE_PAGE_STATE } from './actionTypes'

const pageDetails = (state = states.pageDetails, action) => {
  switch (action.type) {
    case UPDATE_PAGE_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }

    default:
      return state
  }
}

export default pageDetails
