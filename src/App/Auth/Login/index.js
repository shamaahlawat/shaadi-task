import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import useForm from '../../../data/hooks/useForm'
import { loginUser } from '../../../data/redux/auth/actions'

import { ROUTE_PATH } from '../../../data/config/constants'
import { isEmail } from '../../../data/config/utils'

import Form from '../../../components/Form'
import InputItem from '../../../components/InputItem'

const useStyles = makeStyles((theme) => ({
  loginBtn: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: `linear-gradient(right, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    color: theme.palette.common.white
  },
  signUpLink: {
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    cursor: 'pointer'
  }
}))

const initialValues = {
  email: '',
  password: ''
}

const Login = ({ history, actions }) => {
  const classes = useStyles()

  const validate = fieldValue => {
    let currentErrors = { ...errors }
    let currentValues = fieldValue ? fieldValue : values
    if ('email' in currentValues)
      currentErrors.email = isEmail(currentValues.email) ? "" : "Email is not valid."
    setErrors({ ...currentErrors })
    if (!fieldValue)
      return Object.values(currentErrors).every(x => x === "")
  }

  const { values, errors, setErrors, handleInputChange } = useForm(initialValues, true, validate)

  const handleSubmit = event => {
    event.preventDefault()
    if (validate()) {
      actions.loginUser(values, () => {
        if (history.location.state && history.location.state.from && history.location.state.from.pathname)
          history.push(history.location.state.from.pathname)
        else
          history.push(ROUTE_PATH.HOME)
      })
    }
  }

  return (
    <Fragment>
      <Typography
        variant='h5'
        align='center'
        color='primary'
      >
        Login
      </Typography>
      <Form onSubmit={handleSubmit}>
        <InputItem
          label='Email'
          placeholder='Enter your email'
          name='email'
          value={values.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <InputItem
          type='password'
          label='Password'
          placeholder='Enter your password'
          name='password'
          value={values.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <Button
          type='submit'
          variant='contained'
          className={classes.loginBtn}
          fullWidth
        >
          Login
        </Button>
      </Form>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isInternetConnected: state.pageDetails.isInternetConnected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ loginUser }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
