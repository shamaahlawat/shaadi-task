import axios from 'axios';
import { RESET_REDUX_STATE, UPDATE_AUTH_STATE,USERS_LIST_FETCHED,MORE_USERS_FETCHED } from './actionTypes'
import { setDataInLocalStorage } from '../dataUtility'
import { LOCAL_STORAGE } from '../../config/constants'
import { uniqueId } from '../../config/utils'
import { BASE_URL } from '../../config/urls';

export const resetReduxState = () => {
  localStorage.removeItem("LOCAL_STORAGE.AWESOLIST_ADMIN")
  return {
    type: RESET_REDUX_STATE
  }
}

export const updateAuthState = payload => {
  return {
    type: UPDATE_AUTH_STATE,
    payload
  }
}

export const loginUser = (data, callback) => {
  // dummy simple logic because no api is avaliable
  if (data.email && data.password) {
    const payload = {
      adminId: data.email,
      token: uniqueId()
    }
    setDataInLocalStorage(LOCAL_STORAGE.AWESOLIST_ADMIN, data)
    callback()
    return {
      type: UPDATE_AUTH_STATE,
      payload
    }
  }
  return {
    type: RESET_REDUX_STATE
  }
}

export const fetchListData = (data) => {
    return function (dispatch) {
      axios({
        method: 'GET',
        url: `https://reqres.in/api/users?page=${data}`,
        validateStatus: status => {
          return ((status >= 200 && status < 300) || status === 412);
        },
      }).then(res => {
          console.log('res',res)
          dispatch({
            type: USERS_LIST_FETCHED,
            payload:res.data
            });
      }).catch(error => {
          console.log('error',error)
    });
  }
}

export const fetchMoreListData = (data) => {
  return function (dispatch) {
    axios({
      method: 'GET',
      url: `${BASE_URL}/api/users?page=${data}`,
      validateStatus: status => {
        return ((status >= 200 && status < 300) || status === 412);
      },
    }).then(res => {
        console.log('res',res)
        dispatch({
          type: MORE_USERS_FETCHED,
          payload:res.data
          });
    }).catch(error => {
        console.log('error',error)
  });
}
}

// export function submitContactDetails(data) {
//   return function (dispatch) {
//       API.submitContactDetails(data, (err, res) => {
//           if (!err) {
//               dispatch({
//                   type: actionTypes.SUBMIT_CONTACT_REQUEST,
//                   payload: res
//               });
//               dispatch({
//                   type: actionTypes.SHOW_POPUP
//               });
//               dispatch({
//                   type: actionTypes.CLOSE_POPUP
//               });
//           }
//           else {
//               dispatch({
//                   type: actionTypes.SUBMIT_CONTACT_REQUEST_ERROR
//               });
//           }
//       });
//   };
// }