import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ROUTE_PATH } from '../../data/config/constants'
import { clearAllDataFromLocalStorage } from '../../data/redux/dataUtility'

const PrivateRoute = ({ component: Component, token, adminId, ...rest }) => {
  const checkAuthAndRender = props => {
    if (adminId && token)
      return <Component {...props} />
    else {
      clearAllDataFromLocalStorage()
      return <Redirect to={{ pathname: ROUTE_PATH.LOGIN, state: { from: props.location } }} />
    }
  }

  return <Route {...rest} render={checkAuthAndRender} />
}

const mapStateToProps = state => {
  return {
    adminId: state.authDetails.adminId,
    token: state.authDetails.token
  }
}

PrivateRoute.propTypes = {
  token: PropTypes.string,
  adminId: PropTypes.string
}

export default connect(mapStateToProps)(PrivateRoute)
