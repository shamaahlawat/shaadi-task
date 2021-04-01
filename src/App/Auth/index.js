import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import { IMG_AUTH_BG, FULL_LOGO } from '../../data/assets/img'
import { THEME_TYPE } from '../../data/config/constants'

const useStyles = makeStyles((theme) => ({
  authContainer: {
    height: "100vh",
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  authContainerBg: theme.palette.type === THEME_TYPE.DARK ? {} : {
    backgroundImage: `url(${IMG_AUTH_BG})`,
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover"
  },
  authContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "450px",
    minHeight: '350px',
    paddingLeft: '30px',
    paddingRight: '30px',
    [theme.breakpoints.down('xs')]: {
      width: "100%"
    }
  }
}))

const Auth = ({ children }) => {
  const theme = useTheme()
  const classes = useStyles();
  return (
    <Paper
      className={`${classes.authContainer} ${classes.authContainerBg}`}
      elevation={0}
      square
    >
      <Paper
        elevation={1}
        variant={theme.palette.type === THEME_TYPE.DARK ? "outlined" : "elevation"}
        className={classes.authContent}
      >
        <img src={FULL_LOGO} alt="" />
        {children}
      </Paper>
    </Paper>
  )
}

export default Auth
