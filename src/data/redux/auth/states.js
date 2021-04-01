import { getDataFromLocalStorage } from '../dataUtility'
import { LOCAL_STORAGE } from '../../config/constants'

const adminDetails = getDataFromLocalStorage(LOCAL_STORAGE.AWESOLIST_ADMIN, null)

const states = {
  authDetails: {
    adminId: adminDetails && adminDetails.adminId ? adminDetails.adminId : null,
    token: adminDetails && adminDetails.token ? adminDetails.token : null,
    userDetails:[],
    fetchUserLoading:false
  }
}

export default states