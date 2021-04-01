import states from './states'
import { UPDATE_AUTH_STATE,USERS_LIST_FETCHED,MORE_USERS_FETCHED ,FETCHING_USERS_LIST} from './actionTypes'

const authDetails = (state = states.authDetails, action) => {
  switch (action.type) {
    case UPDATE_AUTH_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    
    case FETCHING_USERS_LIST : {
      return {
         ...state,
         fetchUserLoading:true
      }
    }

    case USERS_LIST_FETCHED : {
         return {
            ...state,
            userDetails:action.payload.data,
            fetchUserLoading:false
         }
    }

    case MORE_USERS_FETCHED : {
      return {
         ...state,
         userDetails:[...state.userDetails,...action.payload.data],
         fetchUserLoading:false
      }
    }

    default:
      return state
  }
}

export default authDetails
